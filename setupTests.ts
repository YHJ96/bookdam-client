import '@testing-library/jest-dom';
import { afterAll, afterEach, vi } from 'vitest';

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
});
