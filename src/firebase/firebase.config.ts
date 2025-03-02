import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA5T5en5kCzk5fcUmZheGrAlTptk_xzI8k",
    authDomain: "reactchat-4e208.firebaseapp.com",
    projectId: "reactchat-4e208",
    storageBucket: "reactchat-4e208.firebasestorage.app",
    messagingSenderId: "981101589750",
    appId: "1:981101589750:web:c18c2aa7634422264f68d7"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth

