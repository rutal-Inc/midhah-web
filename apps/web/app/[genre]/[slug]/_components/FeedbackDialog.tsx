"use client";

import LoginDialog from "@/components/LoginDialog";
import api from "@midhah/utils/axios";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import { MessageSquareMore } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type FeedbackDialogProps = {
  lyricId: number;
  lyricTitle: string;
};

const FeedbackDialog = ({ lyricId, lyricTitle }: FeedbackDialogProps) => {
  const { accessToken } = useAuthStore();
  const { user } = useUserStore();

  const [visible, setVisible] = useState<boolean>(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    type: "INCORRECT_LYRICS",
    message: "",
  });

  const handleOpenChange = () => {
    if (!accessToken) {
      setIsLoginDialogOpen(true);
      return;
    }

    setVisible(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.post("/report", {
        lyricId,
        type: formData.type,
        message: formData.message,
      });

      toast.success("Report submitted successfully. Thank you!");
    } catch {
      toast.error("Failed to submit report. Please try again later.");
    }

    setFormData({
      type: "INCORRECT_LYRICS",
      message: "",
    });

    setVisible(false);
  };

  return (
    <>
      <div className="my-1 flex justify-end">
        <button
          type="button"
          onClick={handleOpenChange}
          className="my-1.5 flex cursor-pointer items-center justify-center gap-1"
        >
          <MessageSquareMore className="h-5 w-5 text-black" />{" "}
          <span className="text-base">Report an Issue</span>
        </button>
      </div>
      <Dialog.Root
        open={visible}
        onOpenChange={() => {
          setVisible(false);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content
            className={`fixed top-1/2 left-1/2 w-9/10 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-lg focus:outline-none sm:w-8/10 md:max-h-[80vh] md:w-full md:max-w-3xl md:p-6`}
          >
            <Flex gap="3" justify="between" align={"start"}>
              <Dialog.Title className="mx-1 w-full text-start text-xl font-bold">
                Report an Issue
              </Dialog.Title>
              <Dialog.Close>
                <div className="cursor-pointer rounded-md p-1 transition-all hover:bg-gray-100">
                  <Cross1Icon className="h-4 w-4 font-bold" />
                </div>
              </Dialog.Close>
            </Flex>
            <div className="mt-4 px-5 md:px-8">
              <form
                className="my-2 flex flex-col gap-4"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="email"
                    className="block text-base font-medium text-gray-700"
                  >
                    Email:
                  </label>
                  <input
                    type="text"
                    required
                    id="email"
                    value={user?.email}
                    readOnly
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-teal-700 focus:outline-none focus:ring-inset sm:text-base sm:leading-6"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="lyricTitle"
                    className="block text-base font-medium text-gray-700"
                  >
                    Lyric Title:
                  </label>
                  <input
                    type="text"
                    required
                    id="lyricTitle"
                    value={lyricTitle}
                    readOnly
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-teal-700 focus:outline-none focus:ring-inset sm:text-base sm:leading-6"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="feedbackType"
                    className="block text-base font-medium text-gray-700"
                  >
                    Issue Type:
                  </label>
                  <select
                    name="feedbackType"
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    id="feedbackType"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-teal-700 focus:outline-none focus:ring-inset sm:text-base sm:leading-6"
                  >
                    <option value="INCORRECT_LYRICS">Incorrect Lyrics</option>
                    <option value="INCORRECT_POET">Incorrect Poet</option>
                    <option value="SPELLING_ERROR">Spelling Error</option>
                    <option value="PUNCTUATION_ERROR">Punctuation Error</option>
                    <option value="TRANSLITERATION_ERROR">
                      Transliteration Error
                    </option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="message"
                    className="block text-base font-medium text-gray-700"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={4}
                    maxLength={500}
                    placeholder="Message here..."
                    className="block w-full resize-none! rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-teal-700 focus:outline-none focus:ring-inset sm:text-base sm:leading-6"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Dialog.Close>
                    <button
                      type="reset"
                      className="cursor-pointer rounded-md bg-gray-700 px-4 py-2 text-white"
                    >
                      Close
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="cursor-pointer rounded-md bg-teal-700 px-4 py-2 text-white"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <LoginDialog
        isOpen={isLoginDialogOpen}
        setIsOpen={setIsLoginDialogOpen}
      />
    </>
  );
};

export default FeedbackDialog;
