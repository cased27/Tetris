function addElement () {
    var newDivs = [];
    var currentDiv = document.getElementsByClassName("square");
    newDivs.forEach(newDiv => currentDiv.addElement('<div class="square"></div>'));
}
addElement();


