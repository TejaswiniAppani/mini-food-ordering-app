// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZZVgNZw8qQZkeg5TsbYXkWlXMeYWQ3BI",
  authDomain: "mini-food-ordering-app-19220.firebaseapp.com",
  projectId: "mini-food-ordering-app-19220",
  storageBucket: "mini-food-ordering-app-19220.firebasestorage.app",
  messagingSenderId: "924627903983",
  appId: "1:924627903983:web:64575ee328a3e0df74421a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
 
