// Firebase Auth
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth,
  GoogleAuthProvider } from "firebase/auth"

// Firebase Firestore
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAgCPUoe9DyIhBeHrHwWjAsSgVqdt2qZRY",
  authDomain: "sterk-1cc56.firebaseapp.com",
  projectId: "sterk-1cc56",
  storageBucket: "sterk-1cc56.appspot.com",
  messagingSenderId: "1053630322021",
  appId: "1:1053630322021:web:5779880d99cfd1d230bd8c"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)