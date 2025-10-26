import { useAuthStore } from "@/src/store/useAuthStore";
import { app } from "@/src/utilities/firebase";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LoginDialogProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LoginDialog({
  isOpen = false,
  setIsOpen,
}: Readonly<LoginDialogProps>) {
  const { setAuthToken } = useAuthStore();
  const [auth, setAuth] = useState<Auth | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, []);

  const handleGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth!, provider);
    const body = {
      name: result.user.displayName,
      email: result.user.email,
      displayPicture: result.user.photoURL,
      oauthId: result.user.providerData[0]?.uid,
      oauthProvider: result.user.providerData[0]?.providerId,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/user`,
      body,
    );
    setAuthToken(response.data.data.token);
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 max-h-[60vh] w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-lg focus:outline-none md:w-[100%]`}
        >
          <Flex gap="3" justify="between" align={"start"}>
            <Dialog.Title className="mx-1 w-full text-center text-xl font-bold">
              Log in to the Lyrics World!
            </Dialog.Title>
            <Dialog.Close>
              <div className="cursor-pointer rounded-md p-1 transition-all hover:bg-gray-100">
                <Cross1Icon className="h-4 w-4 font-bold" />
              </div>
            </Dialog.Close>
          </Flex>
          <div className="mt-6">
            <div className="mt-2 flex justify-center">
              <button
                className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-2 text-sm/6 font-semibold text-black shadow hover:shadow-black/20"
                onClick={handleGoogleLogin}
              >
                <Image
                  src="/svgs/google2.svg"
                  alt="Google Logo"
                  className="absolute left-1.5 h-6 w-6 md:h-7 md:w-7"
                  width={500}
                  height={500}
                />
                <p>Continue with Google</p>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
