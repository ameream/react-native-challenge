# Star Wars Code Challenge

This repo contains a complete implementation with:

- `backend/` → Express API (TypeScript) with Star Wars data aggregation
- `mobile/` → React Native app (TypeScript) with Expo

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- For mobile development:
  - Expo CLI (`npm install -g @expo/cli`)
  - iOS Simulator (for iOS development) or Android Studio (for Android development)
- For testing:
  - Maestro CLI (`curl -Ls "https://get.maestro.mobile.dev" | bash`)

## Backend Setup

**Important: The backend must be running before starting the mobile application.**

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:4000`

## Mobile App Setup

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - **iOS Simulator**: `npm run ios`
   - **Android Emulator**: `npm run android`
   - **Web**: `npm run web`

## Testing with Maestro

1. Ensure the mobile app is running on a device or emulator
2. Ensure the backend API is running on localhost:4000
3. Run Maestro tests from the mobile directory:
   ```bash
   maestro test .maestro
   ```

## Development Scripts

### Backend

- `npm run dev` - Start development server
- `npm run build` - Build for production

### Mobile

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator

## Troubleshooting

- **Backend not running**: Ensure the backend is running on localhost:4000 before starting the mobile app
- **Metro bundler issues**: Clear Metro cache with `npx expo start --clear`
- **iOS build issues**: Clean and rebuild with `cd ios && xcodebuild clean`
- **Android build issues**: Clean gradle cache with `cd android && ./gradlew clean`
