"use client";

import CollectionDialog from "@/components/CollectionDialog";
import LoginDialog from "@/components/LoginDialog";
import { useCollectionStore } from "@/store/useCollectionStore";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { Text } from "@radix-ui/themes";
import { useState } from "react";

interface LyricsDialogClientProps {
  lyricId: number;
}

export default function LyricsDialogClient({
  lyricId,
}: Readonly<LyricsDialogClientProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { accessToken, isInitialized } = useAuthStore();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

  const { currentLyricId, collectionIds } = useCollectionStore();
  return (
    <>
      <div className="sticky bottom-10 z-10 mb-4 flex w-full justify-center">
        <button
          onClick={() => {
            if (!accessToken) {
              setIsLoginDialogOpen(true);
              return;
            }

            setIsOpen(true);
          }}
          disabled={!isInitialized}
          className={`btn-secondary flex max-w-65 cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-base font-medium text-white sm:px-4 sm:py-2 ${!isInitialized && "animate-pulse cursor-not-allowed"}`}
        >
          {currentLyricId === lyricId && collectionIds.length > 0 ? (
            <>
              {" "}
              <i className="bi bi-bookmark-check-fill text-xl text-gray-100"></i>
              <Text className="text-gray-100" size={"4"}>
                Collections
              </Text>
            </>
          ) : (
            <>
              <i className="bi bi-bookmark text-xl text-gray-100"></i>
              <Text className="text-gray-100" size={"4"}>
                Add to Collection
              </Text>
            </>
          )}
        </button>
      </div>
      <CollectionDialog
        lyricId={lyricId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        collectionType="lyric"
      />
      <LoginDialog
        isOpen={isLoginDialogOpen}
        setIsOpen={setIsLoginDialogOpen}
      />
    </>
  );
}
