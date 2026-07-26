import googleLogo from "@midhah/assets/ui/google.svg";
import { auth } from "@midhah/utils/firebase";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DialogShell from "./ui/DialogShell";

type LoginDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginDialog({
  isOpen = false,
  setIsOpen,
}: Readonly<LoginDialogProps>) {
  const { setAccessToken } = useAuthStore();
  const router = useRouter();

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const body = {
        name: result.user.displayName,
        email: result.user.email,
        displayPicture: result.user.photoURL,
        oauthId: result.user.providerData[0]?.uid,
        oauthProvider: result.user.providerData[0]?.providerId,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        body,
        { withCredentials: true },
      );
      setAccessToken(response.data.accessToken);
      setIsOpen(false);
      router.refresh();
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred during login.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(`Login Error: ${errorMessage}`);

      setIsOpen(false);
    }
  };

  return (
    <DialogShell
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
      title="Log in to the Lyrics World!"
      titleCentered
    >
      <div className="mt-6">
        <div className="mt-2 flex flex-col justify-center gap-2">
          <button
            className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm/6 font-semibold text-black shadow hover:shadow-black/20"
            onClick={handleGoogleLogin}
          >
            <Image
              src={googleLogo}
              alt="Google Logo"
              className="absolute left-1.5 h-6 w-6 md:h-7 md:w-7"
              width={500}
              height={500}
            />
            <p>Continue with Google</p>
          </button>
        </div>
      </div>
    </DialogShell>
  );
}
