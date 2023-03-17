function start() {
    let name = document.getElementById("name_input").value;
    if (document.getElementById("name_input").value === "") {
        name = "Anonyme";
    }
    localStorage.setItem("name", name);
    window.location.replace("game.html");
}
