"use client";

import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Spinner from "./Spinner";

interface Props {
  searchInput: RefObject<HTMLInputElement>;
  isFocused: boolean;
  setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export default function SearchInput({
  searchInput,
  isFocused,
  setIsFocused,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams && searchParams.get("query");
  const [inputValue, setInputValue] = useState(query ?? "");
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const query = e.target.value;

    if (!query) {
      router.replace("/");
      setIsFocused(false);
      searchInput.current?.blur();
    } else {
      current.set("query", query);
      const search = current.toString();
      startTransition(() => {
        router.push(`/search?${search}`);
      });
    }
  };

  useEffect(() => {
    if (!query) {
      setInputValue("");
    }
  }, [query]);

  return (
    <>
      <input
        ref={searchInput}
        name="query"
        id="query"
        type="text"
        placeholder="Search by title"
        className={`pl-9 py-1 text-sm rounded-sm focus-visible:outline-none w-0 transition-[width] duration-700 ${
          isFocused ? "w-60 bg-[#0f0e17]" : "bg-transparent"
        }`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleInputChange(e);
        }}
      />
      <label
        onClick={() => searchInput.current?.focus()}
        className="grid place-content-center pl-1 absolute left-0 bottom-0 top-0"
      >
        <Search size={18} className=" cursor-pointer" />
      </label>
      {isPending && <Spinner />}
    </>
  );
}
