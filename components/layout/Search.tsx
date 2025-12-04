"use client";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { useDebounce } from "@/hooks/useDebounce";
import { useScroll } from "@/hooks/useScroll";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

type SearchProps = {
  keyword: string | undefined;
};

/*
 * 검색 기능
 */
function Search({ keyword }: SearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scrollY = useScroll();
  const [value, setValue] = useState(keyword || "");

  const cls = scrollY
    ? `fixed top-0 left-0 right-0 z-10 bg-white p-4 shadow-sm`
    : `absolute top-0 right-0 p-4`;

  const setSearchKeyword = (keyword: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("keyword", keyword);

    // searchParams 변경해 Blog 페이지 재렌더링 발생
    router.replace(`?${params.toString()}`);
  };

  // input의 value만 받아 검색 action 트리거 (debounce)
  const debounce = useDebounce((value: string) => {
    setSearchKeyword(value);
  }, 500);

  const handleClear = () => {
    setValue("");
    debounce("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounce(e.target.value);
  };

  return (
    <div className={cls}>
      <form>
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            name="keyword"
            className="w-full rounded-md border border-gray-300 p-2 pl-10"
            value={value}
            onChange={handleChange}
          />
          <Icon name="search" size={16} className="absolute left-4" />
          <Button
            type="button"
            variant="none"
            className="absolute right-2"
            onClick={handleClear}
          >
            <Icon name="close" size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Search;
