


const signupForm = document.querySelector("#sign-up");
const signinForm = document.querySelector("#sign-in");
const phoneSignupForm = document.querySelector("#phone-signup");
const resetPwForm = document.querySelector("#reset-password");





// sign up user
// send email confirmation email
// add userinfo to database
// redirect to /  (quiz page)
const signUp = async () => {
    const username = signupForm.username.value
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    if(!email || !password || !username) {
        alert("please enter the required fields");
        return;
    }



}


// sign in user
// redirect to /  (quiz page)
const signin =  async () => {
    const email = signinForm.email.value;
    const password = signinForm.password.value;

    if(!email || !password) {
        alert("please enter the required fields");
        return;
    }



}



const signUpWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();


}


const signUpWithPhoneNumber = async () => {
    const number = phoneSignupForm.phone.value;

    if(!number) {
        alert("please enter the required fields");
        return;
    }



}


const confirmVerificationCode = async () => {
    const code = phoneSignupForm.code.value;




}


const resetPassword = async () => {
    const email = resetPwForm.email.value;

    if(!email) {
        alert("please enter the required fields");
        return;
    }



    
}



document.getElementById("signup-btn").addEventListener("click", signUp);

document.getElementById("signin-btn").addEventListener("click", signin);

document.getElementById("google").addEventListener("click", signUpWithGoogle);

document.getElementById("phone-btn").addEventListener("click", signUpWithPhoneNumber);
document.getElementById("phone-btn-confirm").addEventListener("click", confirmVerificationCode);

document.getElementById("reset-pw-btn").addEventListener("click", resetPassword);