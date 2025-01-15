import { TagService } from './index';

export const useTouristTagStrategy = (): TagService => {
  const tags: string[] = ['IT', '쇼핑'];

  return { tags };
};
