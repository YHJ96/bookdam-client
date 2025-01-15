import React, { useRef } from 'react';

import { Plus } from 'lucide-react';

import { Badge, BadgeDelete, Button, Input, Label } from '@/shared/ui';

type BookmarkTagFormProps = {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
};

function BookmarkTagForm({ tags, addTag, deleteTag }: BookmarkTagFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key !== 'Enter') return;
    if (!e.currentTarget.value) return;
    e.preventDefault();
    addTag(e.currentTarget.value);
    e.currentTarget.value = '';
  };

  const handlePlusButtonOnClick = () => {
    const $input = inputRef.current;
    if ($input === null) return;
    if (!$input.value) return;
    addTag($input.value);
    $input.value = '';
  };

  const handleDeleteButtonOnClick = (tag: string) => () => {
    deleteTag(tag);
  };

  return (
    <div className="space-y-2">
      <Label>태그</Label>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input ref={inputRef} placeholder="태그 추가" onKeyDown={handleInputOnKeyDown} />
          <Button type="button" size="icon" onClick={handlePlusButtonOnClick}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex h-14 flex-wrap items-start gap-1 overflow-y-auto">
          {tags.map((tag) => (
            <Badge key={tag}>
              <React.Fragment>{tag}</React.Fragment>
              <BadgeDelete onDelete={handleDeleteButtonOnClick(tag)} />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookmarkTagForm;
