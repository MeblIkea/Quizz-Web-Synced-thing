const question_title = document.getElementById("question");

let name = localStorage.getItem("name");
localStorage.setItem("time", Date.now());
let rights = 0;
let questions_length = null;

if (name === null) {
    name = "Anonyme";
    localStorage.setItem("name", name);
}

async function load_answers() {
    return await (await fetch('questions.json')).json();
}

load_answers().then(function (result) {
    questions_length = Object.entries(result).length;
    next_question(Object.entries(result));
});

question_answered = function() {
}

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
