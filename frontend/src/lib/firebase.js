
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDPyzyJkFecgqnQJDR-cdN4P04pL7gedmg",
  authDomain: "aichatbot-b581b.firebaseapp.com",
  projectId: "aichatbot-b581b",
  storageBucket: "aichatbot-b581b.firebasestorage.app",
  messagingSenderId: "913919760455",
  appId: "1:913919760455:web:eab49ef269052222087962",
  measurementId: "G-K203ZSZWFZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);
export {auth,provider}


