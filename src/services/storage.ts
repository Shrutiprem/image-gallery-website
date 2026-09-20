// import { User } from '../types';

// const USER_KEY = 'registeredUser';

// export const saveUser = (user: User): void => {
//   localStorage.setItem(USER_KEY, JSON.stringify(user));
// };

// export const getUser = (): User | null => {
//   const user = localStorage.getItem(USER_KEY);

//   if (!user) {
//     return null;
//   }

//   return JSON.parse(user);
// };
import { User, Photo } from '../types';

const USER_KEY = 'registeredUser';
const FAVORITES_KEY = 'favoritePhotos';

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

// Save favorite photos
export const saveFavorites = (photos: Photo[]): void => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(photos));
};

// Get favorite photos
export const getFavorites = (): Photo[] => {
  const favorites = localStorage.getItem(FAVORITES_KEY);

  if (!favorites) {
    return [];
  }

  return JSON.parse(favorites);
};

// Clear favorites
export const clearFavorites = (): void => {
  localStorage.removeItem(FAVORITES_KEY);
};