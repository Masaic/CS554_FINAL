import firebase from 'firebase';
import fire from '../config/Fire'

const api = {

    registerWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await fire.auth().createUserWithEmailAndPassword(email, password);
            console.log(userCredential);
            return userCredential.user;
        } catch (e) {
            console.log(e);
            return null;
        }
        
    },

    signInWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
            console.log(userCredential);
            return userCredential;
        } catch (e) {
            console.log(e);
            return null;
        }
        
    },
    signInWithGoogleAccount: async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const userCredential = await firebase.auth().signInWithPopup(googleProvider);
            console.log(userCredential.user);
            return userCredential.user;
        } catch (e) {
            console.log(e);
            return null;
        }
        
    },
    signout: async () => {
        console.log('logout');
        await fire.auth().signOut();
    }

    
}

export default api;