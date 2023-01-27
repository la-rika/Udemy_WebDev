
var numberOfButtons = document.querySelectorAll(".drum");

for (var i = 0; i <= numberOfButtons.length; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", cliickHandle);

    function cliickHandle() {
        alert("hello");
    }
}
