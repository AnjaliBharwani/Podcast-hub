
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCWmsNnINnu8mzL0PJQvHR8gUAFkz0epgs",
  authDomain: "podcast-app-c4d51.firebaseapp.com",
  projectId: "podcast-app-c4d51",
  storageBucket: "podcast-app-c4d51.appspot.com",
  messagingSenderId: "48709017395",
  appId: "1:48709017395:web:fb3f153f1d7689467a6846",
  measurementId: "G-E1XGF6B1FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };