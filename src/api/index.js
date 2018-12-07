import fire from '../config/Fire'

const api = {
    signInWithEmailAndPassword: async (email, password) => {
        const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
        
    },
    signInWithGoogleAccount: async () => {

    },
    signInWithFacebookAccount: async () => {

    }
}

export default api;