"use client";

import CollectionLyricButton from "@/src/components/CollectionLyricDialog";

interface LyricsDialogClientProps {
  lyricId: number;
}

export default function LyricsDialogClient({
  lyricId,
}: Readonly<LyricsDialogClientProps>) {
  return <CollectionLyricButton lyricId={lyricId} />;
}
