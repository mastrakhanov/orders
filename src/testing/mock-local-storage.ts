let store: { [name: string]: any } = {};

export const mockLocalStorage: Storage = {
  length: 0,

  key: (index: number): string | null => index in store ? store[index] : null,

  getItem: (key: string): string | null => key in store ? store[key] : null,

  setItem: (key: string, value: string): void => {
    store[key] = `${value}`;
  },

  removeItem: (key: string): void => {
    delete store[key];
  },

  clear: (): void => {
    store = {};
  }
};
