import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db, auth } from "./firebase.js";



// check if we are authorized
onAuthStateChanged(auth, (user)=>{
    if(user === null) {     // if there is no logged in user
        window.location = "/auth.html"
    }
})




let questions = "";
let originalcolor = "linear-gradient(to right, #2257e6, #477af5)";


const btnSubmit = document.querySelector(".button-answer");


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





// TODO: implement signout
const signoutBtn = document.querySelector(".signout-btn")
signoutBtn.addEventListener("click", async ()=>{
    //sign out

    await signOut(auth);


})




// TODO: get questions list and display them
let questionsList = []

// fetch questions from the database and display them
const getQuestionsFromFirestore = async () => {
    // get quizes collection reference
    const quizesColRef = collection(db, "quizes");

    // get the quizes docs
    const snapshot = await getDocs(quizesColRef);

    snapshot.docs.forEach(doc => {
        questionsList.push(doc.data())
    })


}


getQuestionsFromFirestore().then(()=>{
    console.log(questionsList)

    displayQuestions(questionsList)
})




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



        // TODO: update the user's score

        // get users collection reference



        // setup query



        // get results snapshot



        // extract doc reference from result



        // update the document
        


        window.scroll(0, 0);

       
    } else {
        alert("Please answer all the questions");
    }
});
