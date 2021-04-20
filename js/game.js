let hp = 50;
let maxhp = 50;
let atk = 10;
let def = 10;
let lifepath = 'none';
let last_func = 'none';

var audio = new Audio('media/aud/theme_stage1.mp3');
audio.volume = 0.15;
audio.loop = true;

function LoadData(){
    if(localStorage.getItem('lifepath') == 'true'){
        hp = localStorage.getItem('hp');
        maxhp = localStorage.getItem('maxhp');
        atk = localStorage.getItem('atk');
        def = localStorage.getItem('def');
        lifepath = localStorage.getItem('lifepath');
        last_func = localStorage.getItem('lastAction');
        if(last_func != 'none'){
            window[last_func]();
        }
        alert("Data loaded.");
    }
}

function SaveData(){
    localStorage.setItem('track', audio.src);
    localStorage.setItem('hp', hp);
    localStorage.setItem('maxhp', maxhp);
    localStorage.setItem('atk', atk);
    localStorage.setItem('def', def);
    localStorage.setItem('lifepath', lifepath);
    localStorage.setItem('saved','true');
    localStorage.setItem('lastAction', last_func);
    alert('Saved Data')
}

function ClearData(){
    if(confirm("Delete ALL save data? This CANNOT be undone, EVER.")){
        localStorage.clear();
        last_func='none';
        alert("All save data deleted. Reloading page.");
        window.location.reload();
    }else{
        alert("Save data was NOT deleted.");
    }
}
function UpdateStatus(func){
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
    last_func = func;
}
function Path1(){
    lifepath = document.getElementById("button1").innerHTML;
    document.getElementById("game-text").innerHTML = "Welcome, Wanderer. The streets may not be friendly, but you're bound to find people who are. Where would you like to go first?";
    document.getElementById("image").setAttribute("src", "media/img/travel.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a1();");
    document.getElementById("button1").innerHTML = "Downtown";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a2();");
    document.getElementById("button2").innerHTML = "Neon District";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a3();");
    document.getElementById("button3").innerHTML = "City's Edge"
    UpdateStatus('Path1');
    ChangeTrack("theme_stage_2");
}

function Path2(){
    lifepath = document.getElementById("button2").innerHTML;
    document.getElementById("game-text").innerHTML = "You already know the city like the back of your hand, Street Rat. Where to for tonight? [WIP]";
    document.getElementById("image").setAttribute("src", "media/img/road_reflection.jpg");
    document.getElementById("button1").setAttribute("onClick", "StreetRat_a1();");
    document.getElementById("button1").innerHTML = "sr_a1";
    document.getElementById("button2").setAttribute("onClick", "StreetRat_a2();");
    document.getElementById("button2").innerHTML = "sr_a2";
    document.getElementById("button3").setAttribute("onClick", "StreetRat_a3();");
    document.getElementById("button3").innerHTML = "sr_a3";
    UpdateStatus('Path2');
}

function Path3(){
    lifepath = document.getElementById("button3").innerHTML;;
    document.getElementById("game-text").innerHTML = "The meeting is going horribly, dearest Corpo. How about getting out of here? [WIP]";
    document.getElementById("button1").setAttribute("onClick", "Corpo_a1();");
    document.getElementById("button2").setAttribute("onClick", "Corpo_a2();");
    document.getElementById("button3").setAttribute("onClick", "Corpo_a3();");
    UpdateStatus('Path3');
}
function Wanderer_a1(){
    document.getElementById("game-text").innerHTML = "Welcome to Downtown Alicante.";
    document.getElementById("image").setAttribute("src", "media/img/low_view2.jpg");
    document.getElementById("button1").setAttribute("onClick", "Shop('Wanderer_a1');");
    document.getElementById("button1").innerHTML = "Enter the nearest shop";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a1_b();");
    document.getElementById("button2").innerHTML = "Turn into the nearest alley";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a1_c();");
    document.getElementById("button3").innerHTML = "Head to the Neon District";
    UpdateStatus('Wanderer_a1');
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
    UpdateStatus('Wanderer_a2');
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
    UpdateStatus('Wanderer_a3');
}

function Shop(last_func){
    document.getElementById("game-text").innerHTML = "It doesn't look like the shop has anything interesting."
    document.getElementById("image").setAttribute("src", "media/img/shop.jpg");
    document.getElementById("button1").setAttribute("onClick", last_func+"();");
    document.getElementById("button1").innerHTML = "";
    document.getElementById("button2").setAttribute("onClick", last_func+"();");
    document.getElementById("button2").innerHTML = "Go back outside";
    document.getElementById("button3").setAttribute("onClick", last_func+"();");
    document.getElementById("button3").innerHTML = "";
    UpdateStatus('Shop');
}


function EnableMusic(){
    audio.play();
    document.getElementById("music").setAttribute("onClick", "DisableMusic();");
    document.getElementById("music").innerHTML = "Disable Music";
}

function DisableMusic(){
    audio.pause();
    audio.currentTime=0;
    document.getElementById("music").setAttribute("onClick", "EnableMusic();");
    document.getElementById("music").innerHTML = "Enable Music";
}

function ChangeTrack(track){
    DisableMusic();
    audio.src=("media/aud/" + track + ".mp3");
    EnableMusic();
}
function no_action(last_func){
    UpdateStatus(last_func);
}

