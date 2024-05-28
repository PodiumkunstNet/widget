'use client';
import { HOME_URL } from '../constants/mainConstants';

function useSessionStorageManager() {
  const setHomeUrl = (newHomeUrl: string) => {
    sessionStorage.setItem(HOME_URL, newHomeUrl);
  };

  const setTitle = (uniqueId: string, title: string | undefined | null) => {
    sessionStorage.setItem(uniqueId, title ?? '');
  };

  const getTitle = (url: string) => {
    if (typeof window !== 'undefined') {
      return sessionStorage?.getItem(url) || '';
    }
    return '';
  };

  const removeTitle = (url: string) => {
    sessionStorage?.removeItem(url);
  };

  const getHomeUrl = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(HOME_URL);
    }
    return '/widget';
  };

  const removeHomeUrl = () => {
    sessionStorage.removeItem(HOME_URL);
  };

  const clearAll = () => {
    sessionStorage.clear();
  };

  return {
    getTitle,
    getHomeUrl,
    setTitle,
    setHomeUrl,
    removeTitle,
    removeHomeUrl,
    clearAll,
  };
}

export default useSessionStorageManager;
