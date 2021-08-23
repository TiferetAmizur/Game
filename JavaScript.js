//var screenWidth = screen.width
//var x = document.getElementById("div_game").clientWidth;
//======================================== שינוי תצוגת העכבר ===========================================
//כשהעכבר בשטח המשחק הוא גורר איתו דיב עגול מעוצב
window.addEventListener("mousemove", function f(e) {
    if (e.clientX > 399 && e.clientX < 1099) {
        //לא עובד כיוון שרוחב הדיב מוגדר באחוזים רוחב
    //if (e.clientX > (screenWidth / 2 - x / 2) && e.clientX < (screenWidth / 2+ x / 2 )){
        document.getElementById("catch1").style.display = "unset"
        document.getElementById("catch1").style.top = e.clientY;
        document.getElementById("catch1").style.left = e.clientX;
    }
    else {
        document.getElementById("catch1").style.display = "none"    }
})




//=======================פונקציה שמגרילה מספרים בטווח מינימום ומקסימום===========================
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//מערך תמונות צורות
var arrShapes = ["imgs/triangular.png", "imgs/square.png", "imgs/hexagon.png"];
var i = 0;
var score = 0;
var lives=3;
function startGame() {
    windowShape();
    //======================================== פונקציה שמייצרת צורות ================================
    setInterval(function createImg() {
        
        var img = document.createElement("img");
        
        img.setAttribute("id", "shape" + i)
        img.classList.add("shape");
        var kind = Math.floor(Math.random() * 3);
        img.setAttribute("src", arrShapes[kind]);
        img.style.position = "fixed";
        var h = randomIntFromInterval(35, 70)
        img.style.left =h + "vw";
        //img.setAttribute("width", "100vw");
        //img.setAttribute("height", "100vh");
        img.classList.add("ttbFall");
        img.addEventListener("click", catchShape);
        document.getElementById("div_game").appendChild(img);
        
        i++;
    }, 1000);
}
//======================================== פונקציה שמגרילה צורה לתפיסה ומכניסה לחלון ================================
function windowShape() {
    var kind = Math.floor(Math.random() * 3);
    document.getElementById("theShape").src = arrShapes[kind];
}
//=====================================פונקציה שפועלת כאשר השחקן פוגע בצורה ===========================================

function catchShape(e) {
   
    var check = this;
    if (check.src.indexOf(document.getElementById("theShape").src) != -1) {
        score++;
        document.getElementById("nscore").innerHTML = score;
    }
    else {
        Boom(e.clientY, e.clientX);
        lives--;
        for (j = lives; j >= 0; j--) {
            document.getElementById("heart" + j).classList.add("heartBeat");
        }
        document.getElementById("heart" + lives).remove();
    }
    //================GameOver=================================
    if (lives <= 0) {
        document.getElementById("gameOver").style.display = "unset";
        document.getElementById("totalScore").innerHTML = score;
        
    }
}



//===================================== BOOM ===========================================
function Boom(y, x) {
    var boom = document.createElement("img");
    boom.setAttribute("src", "imgs/boom.png");
    boom.setAttribute("id", "boom");
    boom.style.position = "absolute";
    boom.style.top = y + "px";
    boom.style.left = x + "px";
    boom.classList.add("boom");
    document.getElementById("div_game").appendChild(boom);

}


//==============הזזת התופסן באמצעות מקשי חיצים במקלדת===============

function leftArrowPressed() {
    var element = document.getElementById("catch");
    element.style.left = parseInt(element.style.left) - 20 + 'px';
}

function rightArrowPressed() {
    var element = document.getElementById("catch");
    element.style.left = parseInt(element.style.left) + 20 + 'px';
}

function upArrowPressed() {
    var element = document.getElementById("catch");
    element.style.top = parseInt(element.style.top) - 20 + 'px';
}

function downArrowPressed() {
    var element = document.getElementById("catch");
    element.style.top = parseInt(element.style.top) + 20 + 'px';
}

function moveSelection(event) {
    var disleft = document.getElementById("catch").offsetLeft;
    //var disleft = document.getElementById("catch").style.left;

    switch (event.keyCode) {
        case 37:
            if (disleft>400)
            leftArrowPressed();      
            break;

        case 39:
            if (disleft < (882))
            rightArrowPressed();
            break;

        case 38:
            upArrowPressed();
            break;

        case 40:
            downArrowPressed();
            break;
    }
};
