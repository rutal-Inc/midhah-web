"use client";

import { Dialog, Transition } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, Fragment, useState } from "react";

type Props = {
  show: boolean;
  closeModal: (value: boolean) => void;
};

function SearchDialog({ show, closeModal }: Props) {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") as string);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform shadow-xl transition-all">
                <form action="/search" method="get" className="flex">
                  <label htmlFor="search" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="search"
                    name="query"
                    id="query"
                    value={query}
                    onChange={handleQueryChange}
                    required
                    className="mr-2 flex w-full min-w-0 rounded-md px-3.5 py-2 shadow-sm ring-1 ring-inset ring-secondary-light placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    placeholder="Hamd, Naat, Manqbat or Durood-o-Salam"
                  />
                  <button type="submit" className="btn-primary">
                    <i className="bi bi-search"></i>{" "}
                    <span className="hidden md:inline">Search</span>
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SearchDialog;
