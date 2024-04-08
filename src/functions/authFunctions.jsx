import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from '../config.jsx'
import { getAuth,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    signInWithPopup,
    GoogleAuthProvider } from "firebase/auth"

// Example for createUserProfile function
export const createUserProfile = async (user) => {
    const userRef = doc(db, "users", user.uid)
    const docSnap = await getDoc(userRef)

    if (!docSnap.exists()) {
        await setDoc(userRef, {
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            email: user.email,
            PRs: [],
        })
    }
}

// Create account
export const authCreateAccountWithEmail = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // User successfully created, now create or verify Firestore document
        await createUserProfile(userCredential.user) // Pass the user object to createUserProfile
        return userCredential.user // Return or handle the user object as needed
    } catch (error) {
        console.error("Error creating account with email and password:", error)
        throw error // Rethrow or handle the error as needed
    }
}

// Sign in
export const authSignInWithEmail = async (email, password) => {
    const auth = getAuth()
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        // Authentication successful, now create or update Firestore user profile
        await createUserProfile(userCredential.user)
        return userCredential.user // You can return the user or handle it as needed
    } catch (error) {
        console.error("Error signing in with email:", error)
        throw error; // Rethrow or handle the error as needed
    }
}

export const authSignInWithGoogle = async () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider)
        // Google sign-in was successful, now create or update Firestore user profile
        await createUserProfile(result.user)
        return result.user// You can return the user or handle it as needed
    } catch (error) {
        console.error("Error signing in with Google:", error)
        throw error; // Rethrow or handle the error as needed
    }
}

// Sign out
export function authSignOut() {
    const auth = getAuth()
    signOut(auth)
    .catch((error) => {
        console.error(error)
    })
}