import { api } from '@/shared/libs';

export const getTrashBookmark = async () => {
  const response = await api.get('/trash');
  return response.data;
};

export const redoTrashBookmark = async (id: number) => {
  const response = await api.patch(`/trash/${id}`);
  return response.data;
};

export const undoTrashBookmark = async (id: number) => {
  const response = await api.delete(`/trash/${id}`);
  return response.data;
};
