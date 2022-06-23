var running = false;

function start() {
    running = true;
    $("#startingpage").hide();
}

var r = document.getElementsByClassName("choicepage");
var v = document.createElement("button");
r.appendChild(v);