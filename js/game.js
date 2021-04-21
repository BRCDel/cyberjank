let hp = 50;
let maxhp = 50;
let atk = 10;
let def = 10;
let lifepath = 'none';
let last_func = 'none';
let music = false;
let escaped = false;

var enemy_hp, enemy_atk, enemy_def;
var audio = new Audio('media/aud/theme_stage1.mp3');
audio.volume = 0.15;
audio.loop = true;

function LoadData(){
    if(localStorage.getItem('saved') == 'false' || localStorage.getItem('saved') == null){
        alert("Generating new game data.");
    }else{
        hp = localStorage.getItem('hp');
        maxhp = localStorage.getItem('maxhp');
        atk = localStorage.getItem('atk');
        def = localStorage.getItem('def');
        lifepath = localStorage.getItem('lifepath');
        last_func = localStorage.getItem('lastAction');
        if(last_func != 'none' && last_func != null){
            last_func();
        }
        alert("Data loaded.");}
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
}

function ClearData(){
    if(confirm("Delete ALL save data? This CANNOT be undone, EVER.")){
        localStorage.clear();
        alert("All save data deleted. Reloading page.");
        location.reload();
    }else{
        alert("Save data was NOT deleted.");
    }
}
/* Full names such as Wanderer_a1 imply it's a general action in that lifepath. */
/* Shortened names such as SR1 imply it's a moment unique to that lifepath which holds some form of value to it. */
function Path1(){
    lifepath = 'Wanderer';
    document.getElementById("game-text").innerHTML = "Welcome, Wanderer. The streets may not be friendly, but you're bound to find people who are. Where would you like to go first?";
    document.getElementById("image").setAttribute("src", "media/img/travel.jpg");
    document.getElementById("button1").setAttribute("onClick", "Wanderer_a1();");
    document.getElementById("button1").innerHTML = "Downtown";
    document.getElementById("button2").setAttribute("onClick", "Wanderer_a2();");
    document.getElementById("button2").innerHTML = "Neon District";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a3();");
    document.getElementById("button3").innerHTML = "Corporate District."
    UpdateStatus('Path1');
    ChangeTrack("theme_stage_2");
    if(music){
        EnableMusic();
    }
}

function Path2(){
    lifepath = 'Street Rat';
    document.getElementById("game-text").innerHTML = "You know these streets well. Where are you off to? [WIP]";
    document.getElementById("image").setAttribute("src", "media/img/road_reflection.jpg");
    document.getElementById("button1").setAttribute("onClick", "Alleyway('Path2');");
    document.getElementById("button1").innerHTML = "Down the alleyway to your right.";
    document.getElementById("button2").setAttribute("onClick", "NeonDistrict();");
    document.getElementById("button2").innerHTML = "To the Neon District.";
    document.getElementById("button3").setAttribute("onClick", "CorpoDistrict();");
    document.getElementById("button3").innerHTML = "To the Corporate District.";
    UpdateStatus('Path2');
}

function Path3(){
    lifepath = 'Corpo'
    document.getElementById("game-text").innerHTML = "The meeting is going horribly, dearest Corpo. How about getting out of here? [WIP]";
    document.getElementById("image").setAttribute("src", "media/img/meeting.jpg");
    document.getElementById("button1").setAttribute("onClick", "Corpo_a1();");
    document.getElementById("button1").innerHTML = "cr_a1";
    document.getElementById("button2").setAttribute("onClick", "Corpo_a2();");
    document.getElementById("button2").innerHTML = "cr_a2";
    document.getElementById("button3").setAttribute("onClick", "Corpo_a3();");
    document.getElementById("button3").innerHTML = "cr_a3";
    UpdateStatus('Path3');
}

function Wanderer_a1(){
    document.getElementById("game-text").innerHTML = "Welcome to Downtown Alicante.";
    document.getElementById("image").setAttribute("src", "media/img/low_view2.jpg");
    document.getElementById("button1").setAttribute("onClick", "Shop('Wanderer_a1');");
    document.getElementById("button1").innerHTML = "Enter the nearest shop";
    document.getElementById("button2").setAttribute("onClick", 'last_func = "Wanderer_a1"; Alleyway();');
    document.getElementById("button2").innerHTML = "Turn into the nearest alley";
    document.getElementById("button3").setAttribute("onClick", "Wanderer_a1_c();");
    document.getElementById("button3").innerHTML = "Head to the Neon District";
    UpdateStatus('Wanderer_a1');
}

function Wanderer_a2(){
    document.getElementById("game-text").innerHTML = ""
    document.getElementById("image").setAttribute("src", "media/img/low_vdiew.jpg");
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

/* These function are considered "shared events" between lifepaths and as such will be available to all lifepaths. */
/* Shared events will be moments where one or more lifepaths will have an advantage. */
function Alleyway(){
    document.getElementById("game-text").innerHTML = "As you walk into the alleyway, you come face to face with an armed man. <br/> HP: 25, ATK: 3, DEF: 3";
    document.getElementById("image").setAttribute("src", "media/img/enemy1.jpg");
    document.getElementById("button1").setAttribute("onClick", "Fight(Alleyway_FightWon, 25, 3, 3);");
    document.getElementById("button1").innerHTML = "Attack him";
    if(lifepath == 'Street Rat'){
        document.getElementById("button2").setAttribute("onClick", "SR1();");
        document.getElementById("button2").innerHTML = "[STREET RAT] 'I'm here to see K.'";
    }else{
        document.getElementById("button2").setAttribute("onClick", "Intimidate();");
        document.getElementById("button2").innerHTML = "Intimidate him";
    }
    document.getElementById("button3").setAttribute("onClick", "Run(" + last_func + ");");
    document.getElementById("button3").innerHTML = "Attempt to run away.";
    UpdateStatus('Alleyway');
}

function Alleyway_FightWon(){
    alert("Not implemented yet, check back soon!")
}

function NeonDistrict(){
    if(lifepath == 'Wanderer'){
        document.getElementById("game-text") = "The Neon District is charming, but you can tell something is amiss. You observe the people as time passes."
        document.getElementById("button1").innerHTML = "[WANDERER] Trust your gut and search the area.";
        document.getElementById("button1").setAttribute("onClick", "WR1();");
    }else{
        document.getElementById("game-text") = "The Neon District is charming. You observe the people as time passes."
        document.getElementById("button1").innerHTML = "Wander the district.";
        document.getElementById("button1").setAttribute("onClick", "NeonDistrict_2();")
    }
}

/* These are the lifepath-specific, important moments. */
function SR1(){
    document.getElementById("game-text").innerHTML = "The man lets you through. You duck through the door at the end of the alley, take the elevator inside and meet K on the rooftop. It looks like something's bothering him."
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").innerHTML = "Ask him what's on his mind.";
    document.getElementById("button1").setAttribute("onClick", "SR1_GreetK();");
    document.getElementById("button2").innerHTML = "Ask him if he's got any work for you.";
    document.getElementById("button2").setAttribute("onClick", "SR1_AskKWork();");
    document.getElementById("button3").innerHTML = "Leave him be.";
    document.getElementById("button3").setAttribute("onClick", "SR1_BackOut();");
    UpdateStatus('SR1');
}

function SR1_GreetK(){
    document.getElementById("game-text").innerHTML = '"' + "Yeah, I have an issue. One of my boys wound up shot in the head. I know who did it, but I have to stay low for now." + '"'  ;
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").innerHTML = "Offer to take care of it for him.";
    document.getElementById("button1").setAttribute("onClick", "SR1_QuestA_Start();");
    document.getElementById("button2").innerHTML = "Offer condolences and try to cheer him up.";
    document.getElementById("button2").setAttribute("onClick", "SR1_ComfortK();");
    document.getElementById("button3").innerHTML = "Leave him to his devices."
    document.getElementById("button3").setAttribute("onClick", "SR1_BackOut();");
    UpdateStatus('SR1_GreetK');
}

function SR1_AskKWork(){
    document.getElementById("game-text").innerHTML = ('"' + "Work? Yeah. There's a pretty special chip I have had my eyes on for a while. High-end Avantum tech. I want it in my hands, whether the means are legitimate or not." + '"');
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").innerHTML = "Accept the offer.";
    document.getElementById("button1").setAttribute("onClick", "SR1_QuestB_Start();");
    document.getElementById("button2").innerHTML = "Ask if there's anything else to do.";
    document.getElementById("button2").setAttribute("onClick", "SR1_GreetK();");
    document.getElementById("button3").innerHTML = "Kindly decline and leave.";
    document.getElementById("button3").setAttribute("onClick", "SR1_BackOut();");
    UpdateStatus('SR1_AskKWork');
}

function SR1_BackOut(){
    alert("Not implemented yet, sorry!");
}

/* These are functions used for game systems. */
function Fight(before_fight, en_hp, en_atk, en_def){
    ChangeTrack("combat_theme");
    enemy_hp = en_hp;
    enemy_atk = en_atk;
    enemy_def = en_def;
    document.getElementById("game-text").innerHTML = ("Enemy status<br/>HP:" + en_hp + " ATK:" + en_atk + " DEF:" + en_def);
    document.getElementById("button1").innerHTML = "Attack";
    document.getElementById("button1").setAttribute("onClick", "Combat();");
    document.getElementById("button2").innerHTML = "Brace yourself (-50% incoming damage for one attack)";
    document.getElementById("button2").setAttribute("onClick", "Brace();");
    document.getElementById("button3").innerHTML = "Attempt to escape."
    document.getElementById("button3").setAttribute("onClick", "Run(" + last_func + ");");
    if(music){
        EnableMusic();
    }
    if(en_hp <= 0 || escaped == true){
        escaped=false;
        before_fight();
    }
}

function Combat(){
    let crit  = Math.floor(Math.random() * 100); //Generate a random number (0-99) to serve as a percentage.
    crit++ //Increment to make it a number from 1 to 100 instead
    //15% critical hit chance, exclusive to the player.
    if(crit < 16){
        //|dr| is a damage reduction variable that scales with DEF.
        //The player gets 4% damage reduction per point of DEF. Enemies get 3% damage reduction per point of DEF.
        let dr = def * 0.04;
        hp = hp - (enemy_atk * dr); //Enemies cannot crit.
        dr = enemy_def * 0.03;
        enemy_hp = enemy_hp - (2 * atk * dr); //Double damage for critical hits
    }else{
        let dr = def * 0.04;
        hp = hp - (enemy_atk * dr);
        dr = enemy_def * 0.03;
        enemy_hp = enemy_hp - (atk * dr); //Same thing but without the double damage.
    }
    document.getElementById("game-text").innerHTML = ("Enemy status<br/>HP:" + en_hp + " ATK:" + en_atk + " DEF:" + en_def);
}

function Run(f_name){
    roll = Math.floor(Math.random() * 100); //Generate random number from 0 to 99
    roll++; //Increment to make it 1 to 100
    //50% chance of escape
    if(roll > 50){
        alert("Escape successful!");
        escaped = true;
        //If the roll succeeds, execute the passed function - Should be the one BEFORE you getting into the predicament you're running from
        //This works but feels SO WRONG to use
        //This line activates my fight-or-flight response.
        f_name();
    }else{
        //If the roll fails, alert the player and leave them in the same situation.
        Combat();
        alert("Escape failed!");
    }
}

function UpdateStatus(func){
    document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
    last_func = func;
}

function EnableMusic(){
    music = true;
    audio.play();
    document.getElementById("music").setAttribute("onClick", "DisableMusic();");
    document.getElementById("music").innerHTML = "Disable Music";
}

function DisableMusic(){
    music = false;
    audio.pause();
    audio.currentTime=0;
    document.getElementById("music").setAttribute("onClick", "EnableMusic();");
    document.getElementById("music").innerHTML = "Enable Music";
}

function ChangeTrack(track){
    if(music){
        DisableMusic();
        music = true;
    }else{
        DisableMusic();
    }
    audio.src=("media/aud/" + track + ".mp3");
    audio.load();
}

/* Debug function. Most likely useless. */

function no_action(last_func){
    UpdateStatus(last_func);
}

