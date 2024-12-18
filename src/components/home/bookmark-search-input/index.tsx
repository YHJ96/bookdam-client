import React from 'react';

import { Search } from 'lucide-react';

import { useDebounce } from '@/shared/hooks';

interface BookmarkSearchInputProps extends React.ComponentProps<'input'> {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function BookmarkSearchInput({ search, setSearch, ...rest }: BookmarkSearchInputProps) {
  const { debounce } = useDebounce((value: string) => setSearch(value), 300);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => debounce(e.target.value);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder="제목으로 북마크를 검색합니다."
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        onChange={handleOnChange}
        {...rest}
      />
    </div>
  );
}

export default BookmarkSearchInput;
