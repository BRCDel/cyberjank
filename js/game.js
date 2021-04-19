let hp = 50;
let maxhp = 50;
let atk = 10;
let def = 10;
var lifepath;

function Path1(){
    lifepath = document.getElementById("button1").innerHTML;
    alert(lifepath);
    document.getElementById("button1").setAttribute("onClick", "Choice1();")
    document.getElementById("button2").setAttribute("onClick", "Choice2();")
    document.getElementById("button3").setAttribute("onClick", "Choice3();")
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}

function Path2(){
    lifepath = document.getElementById("button2").innerHTML;
    alert(lifepath);
    document.getElementById("button1").setAttribute("onClick", "Choice1();")
    document.getElementById("button2").setAttribute("onClick", "Choice2();")
    document.getElementById("button3").setAttribute("onClick", "Choice3();")
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}

function Path3(){
    lifepath = document.getElementById("button3").innerHTML;
    alert(lifepath);
    document.getElementById("button1").setAttribute("onClick", "Choice1();")
    document.getElementById("button2").setAttribute("onClick", "Choice2();")
    document.getElementById("button3").setAttribute("onClick", "Choice3();")
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}
function Choice1(){
    alert('Choice 1 performed')
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}

function Choice2(){
    alert('Choice 2 performed')
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}

function Choice3(){
    alert('Choice 3 performed')
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
}