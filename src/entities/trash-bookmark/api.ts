import { api } from '@/shared/libs';

export const getTrashBookmarksApi = async () => {
  const response = await api.get('/trash');
  return response.data;
};

export const redoTrashBookmarkApi = async (id: number) => {
  const response = await api.patch(`/trash/${id}`);
  return response.data;
};

export const undoTrashBookmarkApi = async (id: number) => {
  const response = await api.delete(`/trash/${id}`);
  return response.data;
};
