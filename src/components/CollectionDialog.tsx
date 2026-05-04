import { useAuthStore } from "@/src/store/useAuthStore";
import * as Dialog from "@radix-ui/react-dialog";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CheckIcon,
  Cross1Icon,
  Cross2Icon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  CollectionDialogProps,
  CollectionModalType,
} from "../models/Collection";
import {
  addLyricToUserCollection,
  addNewUserCollection,
  getUserCollections,
  getUserCollectionsLyric,
  removeLyricFromUserCollection,
  removeUserCollection,
  updateUserCollection,
} from "../service/collectionService";
import { useCollectionStore } from "../store/useCollectionStore";
import { useUserStore } from "../store/useUserStore";
import Loader from "./Loader";

export default function CollectionDialog({
  lyricId,
  isOpen = false,
  setIsOpen,
  collectionType = "lyric",
}: Readonly<CollectionDialogProps>) {
  const { authToken } = useAuthStore();
  const { user } = useUserStore();
  const [collections, setCollections] = useState<CollectionModalType[]>([]);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setCurrentLyricId, addCollectionId, removeCollectionId, reset } =
    useCollectionStore();

  useEffect(() => {
    if (!loading && error) {
      toast.error(error);

      setError(null);
    }
  }, [error, loading, setError]);

  const fetchCollections = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setCollections([]);
      setError(null);
      if (collectionType === "lyric" && lyricId) {
        const data = await getUserCollectionsLyric(user.id, lyricId, authToken);

        for (const element of data) {
          if (element.isInCollection) addCollectionId(element.id);
        }

        setCollections(data);
      } else {
        const data = await getUserCollections(user.id, authToken);

        setCollections(data);
      }
      setLoading(false);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, [user, collectionType, lyricId, authToken, addCollectionId]);

  const handleAdd = () => {
    if (user) {
      if (!name.trim()) return;
      addNewCollection(name.trim());
    }
  };

  const handleUpdate = (collectionId: number, name: string) => {
    if (user) {
      if (!newName.trim() || name.trim() === newName.trim()) return;
      updateCollection(newName.trim(), collectionId, user?.id);
      setEditingId(null);
      setNewName("");
    }
  };

  const handleDelete = (collectionId: number) => {
    if (user) {
      removeCollection(collectionId, user?.id);
      setEditingId(null);
      setNewName("");
    }
  };

  const addNewCollection = async (name: string) => {
    if (!authToken) return;
    setLoading(true);
    setError(null);
    try {
      await addNewUserCollection(name, user!.id, authToken);
      fetchCollections();
      setName("");
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const updateCollection = async (
    name: string,
    collectionId: number,
    userId: number,
  ) => {
    if (!authToken) return;
    setLoading(true);
    try {
      await updateUserCollection(name, collectionId, userId, authToken);
      fetchCollections();
      setEditingId(null);
      setNewName("");
      setError(null);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const removeCollection = async (
    collectionLyricId: number,
    userId: number,
  ) => {
    if (!authToken) return;
    setLoading(true);
    try {
      const data = await removeUserCollection(
        collectionLyricId,
        userId,
        authToken,
      );
      removeCollectionId(data.id);
      fetchCollections();
      setError(null);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const addLyricToCollection = async (
    collectionId: string,
    lyricId: number,
  ) => {
    if (!authToken) return;
    setLoading(true);
    setError(null);

    try {
      const data = await addLyricToUserCollection(
        collectionId,
        lyricId,
        authToken,
      );
      addCollectionId(data.collectionId);
      fetchCollections();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const removeLyricFromCollection = async (collectionLyricId: string) => {
    if (!authToken) return;
    setLoading(true);
    setError(null);
    try {
      const data = await removeLyricFromUserCollection(
        collectionLyricId,
        authToken,
      );
      removeCollectionId(Number(data.collectionId));
      fetchCollections();
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (collectionType === "lyric" && lyricId) {
      setCurrentLyricId(lyricId);
      fetchCollections();
    }
  }, [lyricId, authToken, collectionType, setCurrentLyricId, fetchCollections]);

  useEffect(() => {
    if (isOpen && user) {
      fetchCollections();
    }
  }, [fetchCollections, isOpen, user]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(false);
        setEditingId(null);
        setNewName("");
        setName("");
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 max-h-[60vh] w-[94%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-7 shadow-lg focus:outline-none`}
          aria-describedby={undefined}
        >
          <Flex gap="3" justify="between" align={"start"}>
            <Dialog.Title className="text-xl font-bold">
              My Collections
            </Dialog.Title>
            <Dialog.Close>
              <div className="cursor-pointer rounded-md p-1 transition-all hover:bg-gray-100">
                <Cross1Icon className="h-4 w-4 font-bold" />
              </div>
            </Dialog.Close>
          </Flex>

          <div className="mt-6">
            {loading && <Loader />}
            {!loading &&
              (collections && collections.length > 0 ? (
                <ul className="w-full list-none space-y-3">
                  {collections.map((collection) => (
                    <li
                      key={collection.id}
                      className={`flex w-full items-center justify-between rounded-md ${editingId !== Number(collection.id) && "hover:bg-gray-100"}`}
                    >
                      <label
                        className={`flex w-full items-center space-x-2 md:space-x-3`}
                      >
                        {collectionType === "lyric" && (
                          <button
                            className="flex cursor-pointer items-center rounded-md shadow-inner shadow-white/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (loading) return;
                              if (collection.isInCollection) {
                                removeLyricFromCollection(
                                  collection.collectionLyricId!,
                                );
                              } else {
                                addLyricToCollection(collection.id, lyricId!);
                              }
                            }}
                          >
                            {collection.isInCollection ? (
                              <BookmarkFilledIcon className="h-6 w-6 cursor-pointer rounded-md p-[3px] font-medium text-gray-700 shadow-inner shadow-white/10 hover:bg-gray-200" />
                            ) : (
                              <BookmarkIcon className="h-6 w-6 cursor-pointer rounded-md p-[3px] font-medium text-gray-800 shadow-inner shadow-white/10 hover:bg-gray-200" />
                            )}
                          </button>
                        )}

                        {editingId === Number(collection.id) ? (
                          <div className="my-1 flex w-full items-center gap-1">
                            <input
                              ref={inputRef}
                              type="text"
                              onChange={(e) => setNewName(e.target.value)}
                              className="w-full cursor-pointer rounded-lg focus:cursor-text focus:border-none focus:ring-black focus:outline-none"
                              value={newName}
                            />
                            <button
                              className="flex cursor-pointer items-center rounded-md shadow-inner shadow-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleUpdate(
                                  Number(collection.id),
                                  collection.name,
                                );
                                setEditingId(null);
                              }}
                              title="Update"
                            >
                              <CheckIcon className="h-6 w-6 cursor-pointer rounded-md p-0.5 font-semibold text-cyan-600 shadow-inner shadow-white/10 hover:bg-gray-100" />
                            </button>
                            <button
                              className="flex cursor-pointer items-center rounded-md shadow-inner shadow-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setNewName("");
                                setEditingId(null);
                              }}
                              title="Cancel"
                            >
                              <Cross2Icon className="h-6 w-6 cursor-pointer rounded-md p-0.5 font-semibold text-rose-500 shadow-inner shadow-white/10 hover:bg-gray-100" />
                            </button>
                          </div>
                        ) : (
                          <div className="group flex w-full items-center justify-between">
                            {collectionType === "all" ? (
                              <Link
                                href={`/collection/${collection.id}`}
                                className="flex flex-1 cursor-pointer items-center justify-between rounded-md px-4 py-1"
                                onClick={() => setIsOpen(false)}
                                title="Click to View All Lyrics"
                              >
                                <Text size="4" className="text-black">
                                  {collection.name}
                                </Text>
                              </Link>
                            ) : (
                              <Text size="4" className="text-black">
                                {collection.name}
                              </Text>
                            )}

                            <div className="ml-1 flex gap-1 md:hidden md:group-hover:flex">
                              <button
                                className="flex cursor-pointer items-center rounded-md p-0.5 shadow-inner shadow-white/10 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  if (loading) return;
                                  setEditingId(Number(collection.id));
                                  inputRef.current?.focus();
                                  setNewName(collection.name);
                                }}
                                title="Edit"
                              >
                                <Pencil1Icon className="h-6 w-6 cursor-pointer rounded-md p-0.5 font-semibold text-cyan-600 shadow-inner shadow-white/10 hover:bg-gray-200" />
                              </button>

                              <button
                                className="flex cursor-pointer items-center rounded-md p-0.5 shadow-inner shadow-white/10 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (loading) return;
                                  handleDelete(Number(collection.id));
                                }}
                                title="Delete"
                              >
                                <TrashIcon className="h-6 w-6 cursor-pointer rounded-md p-0.5 text-rose-500 shadow-inner shadow-white/10 hover:bg-gray-200" />
                              </button>
                            </div>
                          </div>
                        )}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text size={"4"} className="text-gray-900">
                  Nothing here yet! Add your favorite lyrics to a new
                  collection.
                </Text>
              ))}
            <div className="mt-6 flex items-center gap-2">
              <input
                type="text"
                placeholder="“My fav Midhahs”… name it your way"
                onChange={(e) => setName(e.target.value)}
                className="w-full cursor-pointer rounded-lg focus:cursor-text focus:border-none focus:ring-black focus:outline-none"
                value={name}
              />

              <button
                className="flex cursor-pointer items-center rounded-md shadow-inner shadow-white/10"
                onClick={handleAdd}
                title="Create New Collection"
              >
                <PlusIcon className="h-7 w-7 cursor-pointer rounded-md p-0.5 font-semibold text-cyan-600 shadow-inner shadow-white/10 hover:bg-gray-100" />
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
