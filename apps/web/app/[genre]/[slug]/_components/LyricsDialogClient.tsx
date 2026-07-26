"use client";

import CollectionDialog from "@/components/CollectionDialog";
import LoginDialog from "@/components/LoginDialog";
import { useCollectionStore } from "@/store/useCollectionStore";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { Bookmark, BookmarkCheck } from "lucide-react";
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
          className={`btn-secondary flex max-w-65 cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-base font-medium text-white sm:px-4 sm:py-2 ${!isInitialized ? "cursor-not-allowed opacity-70" : ""}`}
        >
          {currentLyricId === lyricId && collectionIds.length > 0 ? (
            <>
              {" "}
              <BookmarkCheck className="h-5 w-5 text-gray-100" />
              <span className="text-lg text-gray-100">Collections</span>
            </>
          ) : (
            <>
              <Bookmark className="h-5 w-5 text-gray-100" />
              <span className="text-lg text-gray-100">Add to Collection</span>
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
