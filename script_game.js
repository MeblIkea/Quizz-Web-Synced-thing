const question_title = document.getElementById("question");

let name = localStorage.getItem("name");
localStorage.setItem("time", Date.now());
let rights = 0;
let questions_length = null;

if (name === null) {
    name = "Anonyme";
    localStorage.setItem("name", name);
}

const xhr = new XMLHttpRequest();
const url = "http://192.168.1.201:3000/data";

async function load_answers() {
    return await (await fetch('questions.json')).json();
}

function send_data(question, answer) {
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    const data = {
        name: name,
        question: question,
        answer: answer
    };
    xhr.send(JSON.stringify(data));
}

load_answers().then(function (result) {
    questions_length = Object.entries(result).length;
    next_question(Object.entries(result));
});

function next_question(questions) {
    if (questions.length === 0) {
        localStorage.setItem("score", Math.round((rights/questions_length)*100).toString());
        window.location.replace("ended.html");
    }
    question_title.innerText = "Question: \n" + questions[0][0];
    let div, text;
    for (let question in questions[0][1]) {
        div = document.createElement("div");
        div.className = "ans_box";
        div.onclick = function () {
            send_data(questions[0][0], question);
            const elements = Array.from(document.getElementsByClassName("ans_box"));

                for (let element in elements) {
                    elements[element].style.animation = "box_disappear 1s";
                }
            if (questions[0][1][question] === true) {
                rights += 1;
                document.body.style.animation = "correct 1s";
                setTimeout(function () {
                    for (let element in elements) {
                        elements[element].remove();
                    }
                    document.body.style.animation = "background_anim 5s infinite alternate";
                    next_question(questions.slice(1));
                    }, 1000)
            } else {
                document.body.style.animation = "incorrect 1s";
                setTimeout(function () {
                    for (let element in elements) {
                        elements[element].remove();
                    }
                    document.body.style.animation = "background_anim 5s infinite alternate";
                    next_question(questions.slice(1));
                    }, 1000)
            }

        };
        text = document.createElement("h3");
        text.innerText = question;
        div.appendChild(text);
        document.getElementById("questions_place").appendChild(div);
    }
}
