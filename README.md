# Project Description
This project consists of a mobile app for tracking disc golf throws and finding nearby discgolf store using React Native and Firebase.

## Installation guide

1. Clone the repository to your your local machine with the following command: 
```
git clone <repository_link>
```
You can get the link by pressing the green button that says <>code.

2. Open the project directory in your terminal.
3. To install the project dependencies, run the following command: 
```
npm install
```

## Setting up Expo

1. To use the Expo CLI, you will need to create an account on [Expo](https://expo.dev/signup). and follow the instructions to create your account.
2. After account creation, install the Expo CLI by running the following command in your terminal:
```
npm install -g expo-cli
```
3. Verify that the Expo CLI is installed by running the following command:
```
expo --version
```
4. Log in to your Expo account by running the following command and following the prompts:
```
npx expo login
```

## Running the project

1. Clone or download the repository to your local machine.
2. In the terminal, navigate to the project directory and run 
```
npm install
```
to install the required packages.
5. Run
```
expo start 
```
to start the development server. This will open a new browser window where you can access the Expo DevTools.
4. On your mobile device, download the Expo app from the App Store or Google Play Store.
5. Open the Expo app and scan the QR code displayed in the Expo DevTools in your browser. This will load the app on your device.

#Alternatively, you can also run the app on an emulator or simulator. Here are the steps for running the app on an Android emulator:

1. Install Android Studio and set up an emulator by following the instructions in the official documentation.
2. Open the emulator from the Android Virtual Device Manager in Android Studio.
3. In the terminal, navigate to the project directory and run expo start to start the development server.
4. Run expo android to open the app on the Android emulator.

#Components
#Map
The Map component displays a map view using the MapView component from react-native-maps library.

#Game
Game component allows users to create a new throw object that measures length of the throw. It also allows user to write the disc name down and save it to firebase

#Highscores
The Highscores component displays the user's saved throws and allows them to delete them.

This README.md was partly generated with chat.gpt


