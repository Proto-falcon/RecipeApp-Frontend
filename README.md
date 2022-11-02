# FoodRecipeFrontend

A frontend of the FoodRecipe website using React Native only for android, expo development build and android studio

Requirements:
Android Studio - https://developer.android.com/studio
FoodWebsite Backend - TBA

1. To make a development build:

eas build:configure

If you have not installed EAS CLI yet, you can do so by running:

npm install -g eas-cli

An eas.json will be created and it should cotain:
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    }
  }
}

2. To create and share a development build with your team or develop wirelessly on your android device,
   you can run the following:

   eas build --profile development --platform android
   
3. To build and run on an emulator:

   npm android
   
   To build and run wirelessly on your android device:
   
   npm start
   
   To build and run on a connected device:
   
   npm android-d
