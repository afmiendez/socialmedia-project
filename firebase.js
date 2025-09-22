import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyCpOAlnihZxHGzdDFehxfxrro8Zzjq-L-4",
    authDomain: "love-50242.firebaseapp.com",
    databaseURL: "https://love-50242-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "love-50242",
    storageBucket: "love-50242.appspot.com",
    messagingSenderId: "943000094096",
    appId: "1:943000094096:web:5f024cfd0e7481bc875f15",
    measurementId: "G-7FG4V6ZYZZ"
});

const db = getFirestore(firebaseApp);

export default db;