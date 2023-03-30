import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    RecaptchaVerifier,


    signInWithPhoneNumber,

    sendPasswordResetEmail

} from "firebase/auth";


import { db, auth } from "./firebase.js";

const signupForm = document.querySelector("#sign-up");
const signinForm = document.querySelector("#sign-in");
const phoneSignupForm = document.querySelector("#phone-signup");
const resetPwForm = document.querySelector("#reset-password");






// sign up user
// send email confirmation
// TODO: add userinfo to database
// redirect to /  (quiz page)
const signUp = async () => {
    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    if (!email || !password || !username) {
        alert("please enter the required fields");
        return;
    }

    try {
        let credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("before verification: ", credential.user);

        await sendEmailVerification(auth.currentUser);

        onAuthStateChanged(auth, (user)=>{

            if(user !== null) {
                //redirect if user is authenticated
                window.location = "/"
            }

        })


        
    } catch (error) {
        alert(error.message);
    }

    // asynchrounous

    console.log("smth");
};

// sign in user
// redirect to /  (quiz page)
const signin = async () => {
    const email = signinForm.email.value;
    const password = signinForm.password.value;

    if (!email || !password) {
        alert("please enter the required fields");
        return;
    }

    try {
        let credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        onAuthStateChanged(auth, (user)=>{

            if(user !== null) {
                //redirect if user is authenticated
                window.location = "/"
            }

        })


    } catch (error) {
        alert(error.message);
    }
};

const signUpWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);


        onAuthStateChanged(auth, (user)=>{

            if(user !== null) {
                //redirect if user is authenticated
                window.location = "/"
            }

        })

        console.log("after google auth: ", auth.currentUser);
    } catch (error) {
        alert(error.message);
    }
};




let captchaConfig = {
    'size': 'invisible'
}

let captchaVerifier = new RecaptchaVerifier("phone-btn", captchaConfig, auth);
let confirmationResult;




const signUpWithPhoneNumber = async () => {
    const number = phoneSignupForm.phone.value;

    if (!number) {
        alert("please enter the required fields");
        return;
    }


    try {
        confirmationResult = await signInWithPhoneNumber(auth, number, captchaVerifier)
    
        phoneSignupForm.code.disabled = false;
        document.getElementById("phone-btn-confirm").disabled = false;
        
    } catch (error) {
        alert(error.message)
    }


};

const confirmVerificationCode = async () => {
    const code = phoneSignupForm.code.value;

    try {
        const result = await confirmationResult.confirm(code);

        
        onAuthStateChanged(auth, (user)=>{

            if(user !== null) {
                //redirect if user is authenticated
                window.location = "/"
            }

        })

        console.log(result.user);
        
    } catch (error) {
        alert(error.message)
    }



};

const resetPassword = async () => {
    const email = resetPwForm.email.value;

    if (!email) {
        alert("please enter the required fields");
        return;
    }


    await sendPasswordResetEmail(auth, email);

    alert("email sent")


};




document.getElementById("signup-btn").addEventListener("click", signUp);

document.getElementById("signin-btn").addEventListener("click", signin);

document.getElementById("google").addEventListener("click", signUpWithGoogle);

document
    .getElementById("phone-btn")
    .addEventListener("click", signUpWithPhoneNumber);
document
    .getElementById("phone-btn-confirm")
    .addEventListener("click", confirmVerificationCode);

document
    .getElementById("reset-pw-btn")
    .addEventListener("click", resetPassword);
