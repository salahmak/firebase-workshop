import { db } from "./firebase";
import { addDoc, collection, getDoc, getDocs, query, where,  } from "firebase/firestore";

import data from "./data";

let addBtn = document.querySelector("#addBtn");


// add the questions from data.js to the firestore
// ONLY RUN ONCE
const addQuestionsToFirestore = async () => {

}


addBtn.addEventListener("click", async () => {


    // getting input data

    let choices = []

    const form = document.querySelector("#add-form")

    const title = form.title.value;
    
    choices[0] = form.choice1.value;
    choices[1] = form.choice2.value;
    choices[2] = form.choice3.value;
    choices[3] = form.choice4.value;

    const correctAnswer = form.correctAnswer.value;


    if(choices.includes(correctAnswer) === false) {
        alert("please make sure the correct answer is one of the choices")

        return;
    }

    if(title === "" || correctAnswer === "null" || choices.includes("")) {
        alert("please make sure all fields are filled")

        return;
    }





    // TODO: add the question to the database



    alert("question has been added")



    // clearing the fields of the form
    form.reset();


})