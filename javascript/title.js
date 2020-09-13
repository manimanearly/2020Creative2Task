var random_button = document.getElementById("random-match");

random_button.addEventListener("click", function(){
    fetch("../php/create_id.php")
});