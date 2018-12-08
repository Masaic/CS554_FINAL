import firebase from 'firebase';
import fire from '../config/Fire'

const api = {

    registerWithEmailAndPassword: async (email, password) => {
        const userCredential = await fire.auth().createUserWithEmailAndPassword(email, password);
        console.log(userCredential);
        return userCredential;
    },

    signInWithEmailAndPassword: async (email, password) => {
        const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
        console.log(userCredential);
        
        return userCredential;
    },
    signInWithGoogleAccount: async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const userCredential = await firebase.auth().signInWithPopup(googleProvider);
        console.log(userCredential.user);
        return userCredential.user;
    },
    signInWithFacebookAccount: async () => {

    },

    signout: async () => {
        await fire.auth().signOut();
    }

    
}

export default api;