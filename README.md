# BankPick App

## Overview

- This document will overview about estimation for [React Native Expo Practice](https://docs.google.com/document/d/1e2Ursbi10z3GtW0IfbPkFE7E4yj5Z2db/edit?usp=sharing&ouid=103083083655563138202&rtpof=true&sd=true). This practice will build a bank app.

### Design

- [BankPick App](https://www.figma.com/design/fFBytUv4cqoWR8ZeEQAJ4a/Free-Banking-Mobile-App-Ui-Kit-With-light---Dark-Mode-High-Quality-Ui-43--Screen-template--Community-?node-id=1-2940&m=dev&t=s9yvt9LmHaflsfCc-1)

### Editor

- Visual Studio Code

### Technical stack

- React Native
- Typescript
- React Query
- Storybook
- Jest
- Testing-library/react-native

## Target

- Handle platform differences between Android, iOS
- Unit test coverage should be greater than 80%
- Configure the app icon and splash screen that match the Expo app.
- Must have a form with multiple inputs
- Must have a Home screen with a list greater than 1000 items
- Must have a screen using Camera and Image Picker (We can use a free API to upload Photos or use a local URI)
- Apply Linking and Deep Linking
- Push Notifications: Alert users when tasks are near.

## App Features

Build a Mobile application of banking app with features below:

- Splash screen
  - Displays a branded splash screen while the app is loading.
- Authentication
  - Sign In: Log in to your account with email and password.
  - Sign Up: Create a new account with required information.
- Home screen
  - Overview Section: Displays a summary of the user's balance and account overview.
  - Quick Action Buttons: Perform frequent actions like "Send Money", "View History", etc.
  - Recent Transactions: Displays the 10 most recent transactions for quick access.
  - Transaction History: Navigate to a full transaction history screen.
  - Search Transactions: Search for transactions by recipient's name.
- Send money
  - Send to Existing Recipient: Select from a list of saved recipients.
  - Send to New Recipient: Add a new recipient and transfer funds.
- Settings
  - Settings Screen: View and configure app preferences.
  - Profile Screen: View user profile details.
  - Edit Profile: Update profile information such as name, email, and avatar.

## Getting Started

To get started with this boilerplate, follow the instructions below.

### Prerequisites

Ensure sure you have completed the [Expo - Environment Setup](https://docs.expo.dev/tutorial/create-your-first-app/) instructions till "Creating a new application" step, before proceeding.

- Node: v20.19.4
- npm: v10.8.2

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@gitlab.asoft-python.com:ngoc.ngo/react-native-training.git
   ```

2. **Checkout branch**

   ```bash
   git checkout feat/bankpick
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the application:**

   ```bash
   npx expo start
   ```

- Then:
  - Press “a” to open on Android emulator
  - Press “i” to open on iOS simulator
  - Press “w” to open on web browser
  - Or scan the QR code with the Expo Go app on your mobile device.

## Technical Features

- **Linting & Formatting:** ESLint and Prettier for code quality.
- **Testing:** Setup with Jest and React Native Testing Library.
- **Storybook:** Storybook configured.

### Unit Tests

- Run tests:

```bash
npm run test
```

- Run tests coverage:

```bash
npm run test:coverage
```

### Open Storybook

```bash
npm run storybook
```

### Environment

- Create an `.env` file in the root directory with environment values.
