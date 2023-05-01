# FoodRecipeFrontend

A frontend of the FoodRecipe website using React Native only for android, expo development build and android studio

## **How to run android App:**

### **Requirements:**
- Node js LTS version
- Expo Go from Google play store

### **To run development server:**
1.  Open another terminal on the Frontend directory and use this command
```
npm install
```

2.  Then download the apk from this link and install it on an android phone: https://drive.google.com/file/d/19tP9ulwrjx2KeYRWB-RERWak2BLvUVhy/view?usp=share_link


3.  In the **Frontend\src\ipaddressesports\BackEndIP.js** edit this line 2 to access the local server:
```
const BACKENDIPHOME = "http://<host machine's ip>:8000";
```

4.  Run this command:
```
npm start
```
or
```
npx expo start
```

5.  Then scan the QR code on the terminal using Expo Go to load the app it make take a few minutes.
<br/>

Note: If the QR code on the terminal is malforned press c in the terminal to display the QR code again.

6.  On another terminal with Django server run this command at FoodRecipeApp directory:
```
python manage.py <host machine's ip>:8000
```
