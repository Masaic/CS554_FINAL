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
            return e.code;
        }
        
    },
    signInWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
            return userCredential;
        } catch (e) {
            console.log(e);
            return e.code;
        }
        
    },
    signInWithGoogleAccount: async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const userCredential = await firebase.auth().signInWithPopup(googleProvider);
            return userCredential.user;
        } catch (e) {
            return e.code;
        }
        
    },
    signout: async () => {
        console.log('logout');
        await fire.auth().signOut();
    },
    forgetPassword: async (email) => {
        try {
            return fire.auth().sendPasswordResetEmail(email);
        } catch (e) {
            console.log(e);
            return e.code;
        }
    },
    getCommentsByComicId: async (comicId) => {
        const comicCommentRef = fire.database().ref('comic');
        try {

        } catch (e) {

        }
    }

    
}

export default api;