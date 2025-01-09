import { StateCreator, StoreApi, create } from 'zustand';

import type { Role } from '@/shared/types';

type CachingRole = Exclude<Role, 'tourist'>;

type TourStore = {
  isTour: boolean;
  cachingRole: CachingRole | null;
  startTour: (cachingRole: CachingRole) => void;
  endTour: () => void;
};

type CreateTourStore = StateCreator<TourStore>;
type Setter = StoreApi<TourStore>['setState'];

const startTour = (set: Setter, cachingRole: CachingRole) => set({ isTour: true, cachingRole });

const endTour = (set: Setter) => set({ isTour: false, cachingRole: null });

const createTourStore: CreateTourStore = (set) => ({
  isTour: false,
  cachingRole: null,
  startTour: (cachingRole) => startTour(set, cachingRole),
  endTour: () => endTour(set),
});

export const useTourStore = create<TourStore>(createTourStore);
