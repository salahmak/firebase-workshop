// import data from "./data.js";
import { auth, db } from "./firebase.js";

import { collection, addDoc, getDocs, query, where, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, signInWithCustomToken, signOut } from "firebase/auth";



// eck if user is signed in or not
onAuthStateChanged(auth, async (user) => {

    // if used is not signed in, redirect to login page
    if(user === null) {   
        window.location = "/auth.html"
    }
    
});



let questions = "";
let originalcolor = "linear-gradient(to right, #2257e6, #477af5)";


const btnSubmit = document.querySelector(".button-answer");

// a function that displays the quiz's questions
const displayQuestions = (data) => {
    data.forEach((element, i) => {
        let options = "";
        for (let index = 0; index < element.choices.length; index++) {
            options += `<option value="${element.choices[index]}">${element.choices[index]}</option>\n`;
        }

        questions += `<div class="card">
            <div class="card-head">
              <span class="normal">Question n°${i+1}</span>
              <span class="question"> ${element.title_question} </span>
            </div>
            <hr />
            <div class="card-body">
              <select class="select-answer" order="${i}">
                <option value="" selected disabled>
                 Choose an answer
                </option>
                ${options}
              </select>
            </div>
          </div>`;
    });
    
    if(data.length > 0) {
        btnSubmit.style.display = "block";
    }

    const Qcontainer = document.querySelector(".questions");
    Qcontainer.innerHTML = `${questions}\n`;

}



// handling sign out 
const signoutBtn = document.querySelector(".signout-btn")
signoutBtn.addEventListener("click", async ()=>{
    await signOut(auth);
})




let questionsList = []

// fetch questions from the database and store them in the questionsList array
const getQuestionsFromFirestore = async () => {

    // getting a ref to the quizes collection
    let quizColRef = collection(db, "quizes");

    // getting the all the docs inside the quizes collection
    let quizDocs = await getDocs(quizColRef);

    // getting the data of each doc and putting it in the array
    quizDocs.docs.forEach(doc => {
        questionsList.push(doc.data())
    })
}

// executing the previous function
getQuestionsFromFirestore().then(()=>{
    console.log(questionsList)
    displayQuestions(questionsList)
})







// handling clicking the submit button

btnSubmit.addEventListener("click", async (e) => {
    const answers = document.querySelectorAll("div.card-body > select");
    const main = document.querySelector(".main");


    e.preventDefault();
    let allAnswered = true;
    answers.forEach((answer) => {
        answer.value == "" ? (allAnswered = false) : null;
    });

    if (allAnswered) {
        let note = 0;
        const maxnote = questionsList.length;
        answers.forEach((answer, index) => {
            answer.value == questionsList[index].answer ? (note += 1) : null;
        });

        let grade = (note / maxnote) * 100;

        if (grade < 33){
            main.style.background = "red";
        } else if (grade >= 33 && grade < 66) {
            main.style.background = "orange";
        } else {
            main.style.background = "green";
        }


        // updating the score of the user

        let userColRef = collection(db, "users");

        // constructing a query (select * from users where email = auth.currentUser.email)
        let q = query(userColRef, where("email" , "==", auth.currentUser.email));


        // running the query and storing its results in resultSnapshot
        let resultSnapshot = await getDocs(q);

        // getting the reference of the first doc (corresponds to the current user document)
        let userDocRef = resultSnapshot.docs[0].ref

        // updating the user's doc with the new score value
        await updateDoc(userDocRef, {
            score: note
        })


        window.scroll(0, 0);

       
    } else {
        alert("Please answer all the questions");
    }
});


// Assignment: try to show the user's score somewhere on the page 