"use client";

import parseJwt from "@midhah/utils/decodeJWT";
import { auth } from "@midhah/utils/firebase";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { setAccessToken } = useAuthStore();
  const { setUser } = useUserStore();

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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/`,
        body,
        { withCredentials: true },
      );

      setAccessToken(response.data.accessToken);
      const decodedUser = parseJwt(response.data.accessToken);
      setUser(decodedUser);
      router.push("/");
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
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mt-32 text-center">
        <div className="mb-12 shrink-0">
          <Image
            src="/assets/midhah-lyrics-logo.svg"
            alt="Midhah Lyrics logo"
            width={290}
            height={540}
            className="mx-auto inline-block w-fit"
            priority
          />
        </div>
        <div>
          <button
            onClick={handleGoogleLogin}
            className="mx-auto mb-4 flex w-full max-w-xs cursor-pointer items-center justify-center rounded-md border px-10 py-3 font-semibold transition-colors hover:bg-gray-50"
          >
            <Image
              src="/assets/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-4"
            />
            <span>SignIn with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
