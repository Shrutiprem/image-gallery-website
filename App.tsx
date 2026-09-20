
import React, { useEffect, useState } from 'react';

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ImageDetailsScreen from './src/screens/ImageDetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

import { Photo } from './src/types';

type Screen =
  | 'login'
  | 'register'
  | 'home'
  | 'favorites'
  | 'details'
  | 'profile';

const App = () => {
  const [screen, setScreen] =
    useState<Screen>('login');

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [selectedPhoto, setSelectedPhoto] =
    useState<Photo | null>(null);

  // Check login session
  useEffect(() => {
    const loginStatus =
      localStorage.getItem('isLoggedIn');

    if (loginStatus === 'true') {
      setIsLoggedIn(true);
      setScreen('home');
    }
  }, []);

  // Login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setScreen('home');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');

    setIsLoggedIn(false);
    setScreen('login');
  };

  // Register
  const handleRegister = () => {
    setScreen('register');
  };

  // Open image details
  const handleImagePress = (photo: Photo) => {
    setSelectedPhoto(photo);
    setScreen('details');
  };

  // Login
  if (!isLoggedIn && screen === 'login') {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  // Register
  if (
    !isLoggedIn &&
    screen === 'register'
  ) {
    return (
      <RegisterScreen
        onRegisterSuccess={() =>
          setScreen('login')
        }
        onLogin={() =>
          setScreen('login')
        }
      />
    );
  }

  // Home
  if (
    isLoggedIn &&
    screen === 'home'
  ) {
    return (
      <HomeScreen
        onLogout={handleLogout}
        onFavorites={() =>
          setScreen('favorites')
        }
        onProfile={() =>
          setScreen('profile')
        }
        onImagePress={handleImagePress}
      />
    );
  }

  // Favorites
  if (
    isLoggedIn &&
    screen === 'favorites'
  ) {
    return (
      <FavoritesScreen
        onBack={() =>
          setScreen('home')
        }
        onImagePress={handleImagePress}
      />
    );
  }

  // Image details
  if (
    isLoggedIn &&
    screen === 'details' &&
    selectedPhoto
  ) {
    return (
      <ImageDetailsScreen
        photo={selectedPhoto}
        onBack={() =>
          setScreen('home')
        }
      />
    );
  }

  // Profile
  if (
    isLoggedIn &&
    screen === 'profile'
  ) {
    return (
      <ProfileScreen
        onBack={() =>
          setScreen('home')
        }
        onLogout={handleLogout}
      />
    );
  }

  return null;
};

export default App;