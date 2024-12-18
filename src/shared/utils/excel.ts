import * as XLSX from 'xlsx';

import { Bookmark } from '@/entities/bookmark';

export const excel = (bookmarks: Bookmark[]) => {
  const result = bookmarks.map((bookmark) => ({
    제목: bookmark.title,
    내용: bookmark.description,
    주소: bookmark.url,
  }));

  const ws = XLSX.utils.json_to_sheet(result);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet');

  const csv = XLSX.utils.sheet_to_csv(ws);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const mac = navigator.userAgent.includes('Mac');
  const ios = navigator.userAgent.includes('iOS');

  link.download = '북마크.xlsx';
  if (mac || ios) link.download = '북마크.csv';
  link.href = URL.createObjectURL(blob);
  link.click();

  return result;
};
