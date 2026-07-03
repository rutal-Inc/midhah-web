import Language from "@/icons/Language";
import Lyrics from "@/icons/Lyrics";
import Poet from "@/icons/Poet";

export const SidebarLinks = [
  {
    id: 1,
    title: "Lyrics",
    src: Lyrics,
    link: "/lyrics",
    module: "lyrics",
  },
  {
    id: 2,
    title: "Poets",
    src: Poet,
    link: "/poets",
    module: "poets",
  },
  {
    id: 3,
    title: "Languages",
    src: Language,
    link: "/languages",
    module: "languages",
  },
  {
    id: 4,
    title: "Users",
    src: Poet,
    link: "/users",
    module: "users",
  },
  {
    id: 5,
    title: "Deleted Users",
    src: Poet,
    link: "/deleted-users",
    module: "deleted-users",
  },
];

export const ROWS_PER_PAGE_OPTIONS = [25, 50, 75, 100];

export const DATA_TABLE_STYLES = {
  rows: {
    style: {
      minHeight: "50px",
      "&:hover": {
        backgroundColor: "#F6F5F5",
      },
    },
  },
  headCells: {
    style: {
      color: "#000000",
      backgroundColor: "#FFFFFF",
      fontWeight: "600",
      fontSize: "0.8rem",
    },
  },
  cells: {
    style: {
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      color: "#37455c",
    },
  },
};
