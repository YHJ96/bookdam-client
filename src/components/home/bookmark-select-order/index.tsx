import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';

interface BookmarkSelectOrderProps {
  order: 'asc' | 'desc';
  setOrder: React.Dispatch<React.SetStateAction<'desc' | 'asc'>>;
}

function BookmarkSelectOrder({ order, setOrder }: BookmarkSelectOrderProps) {
  const handleOnChange = (value: 'asc' | 'desc') => setOrder(value);

  return (
    <Select value={order} onValueChange={handleOnChange}>
      <SelectTrigger id="bookmark-select-order" className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">최신순</SelectItem>
        <SelectItem value="desc">오래된순</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default BookmarkSelectOrder;
