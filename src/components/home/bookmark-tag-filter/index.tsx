import { Badge } from '@/shared/ui';

type BookmarkTagFilterProps = {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
};

function BookmarkTagFilter({ tags, selectedTags, toggleTag }: BookmarkTagFilterProps) {
  const handleToggleTag = (tag: string) => () => toggleTag(tag);

  return (
    <div className="flex flex-wrap gap-1 pb-2">
      {tags.map((tag) => (
        <Badge key={tag} variant={selectedTags.includes(tag) ? 'default' : 'selected'} onClick={handleToggleTag(tag)}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default BookmarkTagFilter;
