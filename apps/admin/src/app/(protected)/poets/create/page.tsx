"use client";
import { createPoet } from "@/src/services/poet";
import { logoutUser } from "@/src/utils/logout";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import PoetForm, { PoetFormValues } from "../components/PoetForm";

const Page = () => {
  const router = useRouter();
  const handleSubmit = async (formData: PoetFormValues) => {
    try {
      await createPoet(formData);
      toast.success("Poet added successfully!");
      router.push("/poets");
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        logoutUser();
        return;
      }
      toast.error(`Error adding poet: ${error}`);
    }
  };

  return <PoetForm title="Add New Poet" onSubmit={handleSubmit} />;
};

export default Page;
