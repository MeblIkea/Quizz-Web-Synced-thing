let score = localStorage.getItem("score");
let time = Math.round((Date.now() - localStorage.getItem("time"))/1000);
let name = localStorage.getItem("name");
document.getElementById("score").innerHTML += score;
document.getElementById("time").innerHTML += time + " secondes.";
document.getElementById("name").innerHTML = name;