const params = new URLSearchParams(window.location.search);
name = params.get("name");

if (name === null) {
    name = "Anonyme";
}
console.log(name);


console.log(fetch("questions.json").then(function (a) {console.log(a)}))
