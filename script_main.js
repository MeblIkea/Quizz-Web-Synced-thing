function start() {
    let name = document.getElementById("name_input").value;
    if (document.getElementById("name_input").value === "") {
        name = "Anonyme";
    }
    window.location.replace("game.html?name=" + name);
}