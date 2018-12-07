import fire from '../config/Fire'

const api = {
    signInWithEmailAndPassword: async (email, password) => {
        const userCredential = await fire.auth().signInWithEmailAndPassword(email, password);
        console.log(userCredential);
        
        return userCredential;
    },
    signInWithGoogleAccount: async () => {

    },
    signInWithFacebookAccount: async () => {

    },
    
}

export default api;