import { Badge } from '@/shared/ui';

type BookmarkTagFilterProps = {
  tags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
};

function BookmarkTagFilter({ tags, selectedTags, toggleTag }: BookmarkTagFilterProps) {
  const handleToggleTag = (tag: string) => () => toggleTag(tag);

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Badge key={tag} variant={selectedTags.includes(tag) ? 'selected' : 'default'} onClick={handleToggleTag(tag)}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}

export default BookmarkTagFilter;
