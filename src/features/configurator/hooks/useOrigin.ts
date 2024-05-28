export const useOrigin = (path: string) => {
  if (typeof window === 'undefined') {
    return '';
  }
  return `${window.location.origin}/${path}`;
};
