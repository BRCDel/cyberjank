let hp = 50;
let maxhp = 50;
let atk = 10;
let def = 10;
var lifepath;

function UpdateStatus(){
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}
function Path1(){
    lifepath = document.getElementById("button1").innerHTML;
    document.getElementById("game-text").innerHTML = "Welcome, Wanderer. The streets may not be friendly, but you're bound to find people who are. Where would you like to go first?"
    document.getElementById("image").setAttribute("src", "media/img/travel.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a1();");
    document.getElementById("button1").innerHTML = "Downtown";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a2();");
    document.getElementById("button2").innerHTML = "Neon District";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a3();");
    document.getElementById("button3").innerHTML = "City's Edge";
    UpdateStatus();
}

function Path2(){
    lifepath = document.getElementById("button2").innerHTML;
    document.getElementById("button1").setAttribute("onClick", "StreetRat_a1();");
    document.getElementById("button2").setAttribute("onClick", "StreetRat_a2();");
    document.getElementById("button3").setAttribute("onClick", "StreetRat_a3();");
    UpdateStatus();
}

function Path3(){
    lifepath = document.getElementById("button3").innerHTML;
    document.getElementById("button1").setAttribute("onClick", "Corpo_a1();");
    document.getElementById("button2").setAttribute("onClick", "Corpo_a2();");
    document.getElementById("button3").setAttribute("onClick", "Corpo_a3();");
    UpdateStatus();
}
function Wanderer_a1(){
    document.getElementById("game-text").innerHTML = "";

    document.getElementById("image").setAttribute("src", "media/img/low_view2.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a1_a();");
    document.getElementById("button1").innerHTML = "a1_a";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a1_b();");
    document.getElementById("button2").innerHTML = "a1_b";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a1_c();");
    document.getElementById("button3").innerHTML = "a1_c";
    alert("Not implemented yet, check back soon!");
    UpdateStatus();
}
function Wanderer_a2(){
    document.getElementById("game-text").innerHTML = ""
    document.getElementById("image").setAttribute("src", "media/img/low_view.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a2_a();");
    document.getElementById("button1").innerHTML = "a2_a";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a2_b();");
    document.getElementById("button2").innerHTML = "a2_b";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a2_c();");
    document.getElementById("button3").innerHTML = "a2_c";
    alert("Not implemented yet, check back soon!");
    UpdateStatus();
}
function Wanderer_a3(){
    document.getElementById("game-text").innerHTML = ""
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a3_a();");
    document.getElementById("button1").innerHTML = "a3_a";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a3_b();");
    document.getElementById("button2").innerHTML = "a3_b";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a3_c();");
    document.getElementById("button3").innerHTML = "a3_c";
    alert("Not implemented yet, check back soon!");
    UpdateStatus();
}



