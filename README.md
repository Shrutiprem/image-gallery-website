# Image Gallery Website

A responsive Image Gallery Website built using React Native Web, TypeScript, and Expo. The application allows users to register, log in, browse images from the Picsum Photos API, search and filter images, manage favorites, view image details, download images, and manage their profile.

## Features

### User Authentication
- User registration with form validation
- Email and mobile number validation
- Password and confirm password validation
- Login using registered credentials
- Session persistence using browser localStorage
- Logout functionality

### Image Gallery
- Fetches images from the Picsum Photos API
- Displays images in a gallery layout
- Search images by author name
- Case-insensitive search
- Filter images using A-M and N-Z categories
- Load more images using pagination
- Refresh image gallery

### Favorites
- Add images to favorites
- Remove images from favorites
- Favorites are persisted using browser localStorage
- Dedicated Favorites screen
- Search favorite images by author

### Image Details
- View selected image in a larger view
- Display image author
- Display image ID
- Display image dimensions
- Add or remove image from favorites
- Download image

### Profile
- View registered user information
- Edit profile information
- Update name, gender, mobile number, address, and city
- Save profile changes
- Logout from profile

## Technologies Used

- React
- React Native Web
- TypeScript
- Expo
- JavaScript
- HTML/CSS through React Native Web
- Browser LocalStorage
- Picsum Photos API

## API

This project uses the Picsum Photos API to retrieve images.

API endpoint:

https://picsum.photos/v2/list?page=1&limit=50

## Project Structure

```text
ImageGalleryApp
│
├── src
│   ├── components
│   │   ├── ImageCard.tsx
│   │   ├── InputField.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── context
│   │   ├── AuthContext.tsx
│   │   └── FavoritesContext.tsx
│   │
│   ├── screens
│   │   ├── EditProfileScreen.tsx
│   │   ├── FavoritesScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── ImageDetailsScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── RegisterScreen.tsx
│   │
│   ├── services
│   │   ├── api.ts
│   │   └── storage.ts
│   │
│   ├── types
│   │   └── index.ts
│   │
│   └── utils
│       └── validation.ts
│
├── App.tsx
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
