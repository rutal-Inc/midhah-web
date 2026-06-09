import Lyrics from "./Lyrics";

export type CollectionModalType = {
  id: string;
  name: string;
  isInCollection?: boolean;
  collectionLyricId?: string;
};

export type CollectionDialogProps = {
  lyricId?: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collectionType: "all" | "lyric";
};

export type CollectionType = {
  id: string;
  name: string;
  lyrics: Lyrics[];
};
