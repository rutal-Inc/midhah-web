export type Lyric = {
  id: number;
  title: string;
  preview?: string;
  content?: string;
  genre: string;
  slug: string;
  isPublished: boolean;
  poetID?: number;
  languages?: {
    id: number;
    name: string;
  }[];
};
export type LyricSlugs = {
  id: number;
  slug: string;
}[];

export type LyricFormData = {
  title: string;
  slug: string;
  content: string;
  transliteratedContent?: string;
  genre: string;
  poetID?: number;
  isPublished?: boolean;
  languageIDs: number[];
};

export type Poet = {
  id: number;
  name: string;
  slug: string;
  createdByID?: number | null;
  updatedByID?: number | null;
  isPublished: boolean;
  createdAt: Date;
  lyricsCount: number;
  updatedAt?: Date;
};

export type PoetIdName = Pick<Poet, "name">;

export interface PoetFormData {
  name: string;
  isPublished?: boolean;
}

export type Language = {
  id: number;
  name: string;
  createdAt: Date;
};

export interface LanguageFormData {
  name: string;
}

export type Pagination = {
  pagination: {
    page: number;
    size: number;
    total?: number;
  };
};

export type APIResponse<T> = {
  data: T;
  meta: Pagination;
};

export const genreOptions = ["hamd", "naat", "manqbat", "durood-o-salam"];

export interface Filters {
  slugs?: string[];
  isPublished?: boolean[];
  genre?: string[];
  poet?: string[];
  sortBy?: string;
  orderBy?: "asc" | "desc";
  page?: string;
  size?: string;
}

export type UserRole = "USER" | "ADMIN" | "SUPERADMIN";

export interface UserFilters {
  roles?: UserRole[];
  name?: string;
  sortBy?: "id" | "name" | "createdAt";
  orderBy?: "asc" | "desc";
  page?: string;
  size?: string;
}

export type User = {
  id: number;
  name: string;
  email: string;
  displayPicture: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
};

export type DeletedUser = {
  userId: number;
  name: string;
  email: string;
  displayPicture: string;
  reason: string;
  adminId: number;
  createdAt: Date;
  scheduledDeleteAt: Date;
  status: DeletedUserStatus;
};

export type DeleteUserFormData = {
  userId: number;
  reason: string;
  scheduledDeleteAt: string;
};

export type DeletedUserStatus = "PENDING" | "DELETED" | "FAILED";

export interface DeletedUserFilters {
  sortBy?: "id" | "name" | "createdAt";
  orderBy?: "asc" | "desc";
  page?: string;
  size?: string;
  statuses?: DeletedUserStatus[];
}
