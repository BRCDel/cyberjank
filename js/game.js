let hp = 50;
let maxhp = 50;
let atk = 5;
let def = 5;
let lifepath = 'none';
let last_func = 'none';
let music = false;
let escaped = false;
let alley_win = false;
let QuestA = false;
let QuestB = false;

var enemy_hp, enemy_atk, enemy_def, fight_won, fight_escaped;
var audio = new Audio('media/aud/theme_stage1.mp3');
audio.volume = 0.15;
audio.loop = true;

function LoadData(option){
    if(localStorage.getItem('saved') != 'true'){
        alert("Generating new game data. Don't forget to save often!");
    }else{
        //Restore player HP upon loading data.
        //This "fixes" the bug of it not being restored if you reload during combat.
        //Additionally, this can be considered a form of "resting".
        maxhp = localStorage.getItem('maxhp');
        hp = localStorage.getItem('maxhp');
        atk = localStorage.getItem('atk');
        def = localStorage.getItem('def');
        lifepath = localStorage.getItem('lifepath');
        last_func = localStorage.getItem('lastAction');
        if(last_func != 'none' && last_func != null){
            window[last_func]();
        }
    }
    if(option = 'alert' && option != null){
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
    localStorage.setItem('saved', 'true');
    localStorage.setItem('lastAction', last_func);
    localStorage.setItem('alleyWin', false);
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

/* These are the game-start functions which let the user choose their lifepath. */
function Path1(){
    lifepath = 'Wanderer';
    document.getElementById("game-text").innerHTML = "Welcome, Wanderer. The streets may not be friendly, but you're bound to find people who are. Where would you like to go first?";
    document.getElementById("image").setAttribute("src", "media/img/travel.jpg");
    document.getElementById("button1").setAttribute("onClick", "Downtown();");
    document.getElementById("button1").innerHTML = "Downtown";
    document.getElementById("button2").setAttribute("onClick", "NeonDistrict();");
    document.getElementById("button2").innerHTML = "Neon District";
    document.getElementById("button3").setAttribute("onClick", "WIP();");
    document.getElementById("button3").innerHTML = "Corporate District."
    UpdateStatus('Path1');
    ChangeTrack('theme_stage_2');
    if(music){
        EnableMusic();
    }
}

function Path2(){
    lifepath = 'Street Rat';
    document.getElementById("game-text").innerHTML = "You know these streets well. Where are you off to?";
    document.getElementById("image").setAttribute("src", "media/img/road_reflection.jpg");
    document.getElementById("button1").setAttribute("onClick", "Alleyway();");
    document.getElementById("button1").innerHTML = "Down the alleyway to your right.";
    document.getElementById("button2").setAttribute("onClick", "NeonDistrict();");
    document.getElementById("button2").innerHTML = "To the Neon District.";
    document.getElementById("button3").setAttribute("onClick", "WIP();");
    document.getElementById("button3").innerHTML = "[WIP]To the Corporate District.";
    UpdateStatus('Path2');
}

function Path3(){
    lifepath = 'Corpo'
    document.getElementById("game-text").innerHTML = "[WIP] The meeting is going horribly, dearest Corpo. How about getting out of here?";
    document.getElementById("image").setAttribute("src", "media/img/meeting.jpg");
    document.getElementById("button1").setAttribute("onClick", "WIP();");
    document.getElementById("button1").innerHTML = "corp_a1";
    document.getElementById("button2").setAttribute("onClick", "WIP();");
    document.getElementById("button2").innerHTML = "corp_a2";
    document.getElementById("button3").setAttribute("onClick", "WIP();");
    document.getElementById("button3").innerHTML = "corp_a3";
    UpdateStatus('Path3');
}

function Downtown(){
    document.getElementById("game-text").innerHTML = "Alicante is quiet tonight. What's on your mind?";
    document.getElementById("image").setAttribute("src", "media/img/low_view2.jpg");
    document.getElementById("button1").setAttribute("onClick", "Shop('Downtown');");
    document.getElementById("button1").innerHTML = "Enter the Downtown shop";
    document.getElementById("button2").setAttribute("onClick", 'last_func = "Downtown"; Alleyway();');
    document.getElementById("button2").innerHTML = "Turn into the nearest alley";
    document.getElementById("button3").setAttribute("onClick", "NeonDistrict();");
    document.getElementById("button3").innerHTML = "Head to the Neon District";
    UpdateStatus('Downtown');
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
    //If the player has already defeated the guard here, just skip this entirely and go to the correct function.
    if(alley_win){
        Alleyway_Won();
    }else{
        document.getElementById("game-text").innerHTML = "An armed man guards a door at the end of the alleyway.<br/> HP: 25, ATK: 3, DEF: 3";
        document.getElementById("image").setAttribute("src", "media/img/enemy1.jpg");
        document.getElementById("button1").setAttribute("onClick", "Fight(Alleyway_Won, Alleyway, 25, 3, 3);");
        document.getElementById("button1").innerHTML = "Attack him";
        if(lifepath == 'Street Rat'){
          document.getElementById("button2").setAttribute("onClick", "SR1();");
          document.getElementById("button2").innerHTML = "[STREET RAT] 'I'm here to see K.'";
        }else{
           document.getElementById("button2").setAttribute("onClick", "Intimidate(atk, 3, Alleyway_Won, 'button2');");
           document.getElementById("button2").innerHTML = "Attempt to intimidate him";
        }
        document.getElementById("button3").setAttribute("onClick", "Run(" + last_func + ");");
        document.getElementById("button3").innerHTML = "Attempt to run away.";
        UpdateStatus('Alleyway');
    }
}

function Alleyway_Won(){
    document.getElementById("game-text").innerHTML = "With the guard subdued, the door is clear."
    document.getElementById("image").setAttribute("src", "media/img/alley_door.jpg");
    document.getElementById("button1").innerHTML = "Go inside";
    if (lifepath = "Street Rat"){
        document.getElementById("button1").setAttribute("onClick", "SR1()");
    }else{
        document.getElementById("button1").setAttribute("onClick", "WIP();");
    }
    document.getElementById("button2").innerHTML = "Interrogate the guard";
    document.getElementById("button2").setAttribute("onClick", "WIP();");
    document.getElementById("button3").innerHTML = "Head back Downtown";
    document.getElementById("button3").setAttribute("onClick", "Downtown();");
    alley_win = true;
    ChangeTrack('theme_stage_1');
    localStorage.setItem('alleyWin', true);
    UpdateStatus('Alleyway_Won')
}

function NeonDistrict(){
    document.getElementById("image").setAttribute("src", "media/img/neon_corner.jpg");
    if(lifepath == 'Wanderer'){
        document.getElementById("game-text").innerHTML = "The Neon District is charming, but you can tell something is amiss. You observe the people as time passes."
        document.getElementById("button1").innerHTML = "[WANDERER] Trust your gut and search the area";
        document.getElementById("button1").setAttribute("onClick", "WIP();");
    }else{
        document.getElementById("game-text").innerHTML = "The Neon District is charming. You observe the people as time passes.";
        document.getElementById("button1").innerHTML = "Wander the district";
        document.getElementById("button1").setAttribute("onClick", "WIP();");
    }
    document.getElementById("button2").innerHTML = "Enter the Neon District shop";
    document.getElementById("button2").setAttribute("onClick", "Shop('NeonDistrict');");
    document.getElementById("button3").innerHTML = "Head back Downtown";
    document.getElementById("button3").setAttribute("onClick", "Downtown();");
    UpdateStatus('NeonDistrict');
}

/* These are the lifepath-specific, important moments. */
/* For example, "SR1" means "Street Rat life event 1" */
function SR1(){
    document.getElementById("game-text").innerHTML = (" You duck through the door, take the elevator inside and meet K on the rooftop. It looks like something's bothering him.");
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
    document.getElementById("button2").setAttribute("onClick", "WIP();");
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

function SR1_AskKWork_2(){
    document.getElementById("game-text").innerHTML = ('"' + "Different work? Yeah. There's a pretty special chip I have had my eyes on for a while. High-end Avantum tech. I want it in my hands, whether the means are legitimate or not." + '"');
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").innerHTML = "Accept the offer and set out.";
    document.getElementById("button1").setAttribute("onClick", "SR1_QuestB_Start();");
    document.getElementById("button2").innerHTML = "Say you'd rather take the previous job.";
    document.getElementById("button2").setAttribute("onClick", "SR1_QuestA_Start();");
    document.getElementById("button3").innerHTML = "Kindly decline and leave.";
    document.getElementById("button3").setAttribute("onClick", "SR1_BackOut();");
    UpdateStatus('SR1_AskKWork');
}

function SR1_QuestA_Start(){
    document.getElementById("game-text").innerHTML = ('"' + "Very well. You're looking for Alexander Tarvin. He's a Joytech Corp bigwig who thought he could take on the streets. I don't care if you kill him - I just want him out of the equation." + '"');
    document.getElementById("image").setAttribute("src", "media/img/overlook.jpg");
    document.getElementById("button1").innerHTML = "Confirm you'll do it and set out.";
    document.getElementById("button1").setAttribute("onClick", "SR1_QA_Trigger();");
    document.getElementById("button2").innerHTML = "Backpedal and ask for different work.";
    document.getElementById("button2").setAttribute("onClick", "SR1_AskKWork_2();");
    document.getElementById("button3").innerHTML = "Backpedal and leave.";
    document.getElementById("button3").setAttribute("onClick", "SR1_BackOut();");
    UpdateStatus('SR1_QuestA_Start');
}

function SR1_QuestB_Start(){
    QuestB = true;
    SR1_BackOut();
}

function SR1_QA_Trigger(){
    QuestA = true;
    SR1_BackOut();
}

function SR1_BackOut(){
    document.getElementById("game-text").innerHTML = ("After seeing K, you return outside your home. What's your next move?");
    document.getElementById("image").setAttribute("src", "media/img/road_reflection.jpg");
    if(QuestA == true){
        document.getElementById("button1").innerHTML = "Look for info on Alexander Tarvin";
        document.getElementById("button1").setAttribute("onClick", "WIP();");
    }else if(QuestB == true){
        document.getElementById("button1").innerHTML = "Look for info on the Avantum chip";
        document.getElementById("button1").setAttribute("onClick", "WIP();");
    }else{
        document.getElementById("button1").innerHTML = "Head Downtown for a stroll";
        document.getElementById("button1").setAttribute("onClick", "Downtown();");
    }
    document.getElementById("button2").innerHTML = "Go to the Neon District to kill time";
    document.getElementById("button2").setAttribute("onClick", "NeonDistrict();");
    document.getElementById("button3").innerHTML = "Call it a night";
    document.getElementById("button3").setAttribute("onClick", "WIP();");
}

/* These are functions used for game systems. */
function Fight(fightwon, fightescaped, health, attack, defence){
    ChangeTrack("combat_theme");
    enemy_hp = health;
    enemy_atk = attack;
    enemy_def = defence;
    fight_won = fightwon;
    fight_escaped = fightescaped;
    document.getElementById("game-text").innerHTML = ("Enemy status<br/>HP:" + health + " ATK:" + attack + " DEF:" + defence);
    document.getElementById("button1").innerHTML = "Attack";
    document.getElementById("button1").setAttribute("onClick", "Combat(fight_won, fight_escaped);");
    document.getElementById("button2").innerHTML = "Guard Up(50% damage reduction but 50% chance for your attack to fail)";
    document.getElementById("button2").setAttribute("onClick", "WIP();");
    document.getElementById("button3").innerHTML = "Attempt to escape."
    document.getElementById("button3").setAttribute("onClick", "Run(" + last_func + ");");
    if(music){
        EnableMusic();
    }
    if(enemy_hp <= 0){
        escaped=false;
        fightwon();
    }else if(escaped == true){
        fightescaped();
    }
}

function Combat(win, escape){
    let crit  = Math.floor(Math.random() * 100);                //Generate a random number (0-99) to serve as a percentage.
    crit++                                                      //Increment to make it a number from 1 to 100 instead
                                                                //15% critical hit chance, exclusive to the player.
    if(crit < 16){
        //|dr| is a damage reduction variable that scales with DEF.
        //The player gets 4% damage reduction per point of DEF. Enemies get 3% damage reduction per point of DEF.
        let dr = def * 0.04;
        hp = hp - (enemy_atk - (enemy_atk * dr));               //Enemies cannot crit.
        hp = Math.round(hp);                                    //Round to nearest integer.
        dr = enemy_def * 0.03;
        enemy_hp = enemy_hp - (2 * (atk - (atk * dr)));          //Double damage for critical hits
        enemy_hp = Math.round(enemy_hp);                         //Round to nearest integer.
        document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
    }else{
        let dr = def * 0.04;
        hp = hp - (enemy_atk - (enemy_atk * dr));
        hp = Math.round(hp);                                     //Round to nearest integer
        dr = enemy_def * 0.03;
        enemy_hp = enemy_hp - (atk - (atk * dr));                //Same thing but without the double damage.
        enemy_hp = Math.round(enemy_hp);                         //Round to nearest integer
        document.getElementById("status-paragraph").innerHTML = ('HP: ' + hp + '/' + maxhp + '<br/>ATK: ' + atk + '<br/>DEF: ' + def);
    }
    document.getElementById("game-text").innerHTML = ("Enemy status<br/>HP:" + enemy_hp + " ATK:" + enemy_atk + " DEF:" + enemy_def);
    if(enemy_hp <= 0){
        Fight(win, escape, enemy_hp, enemy_atk, enemy_def);
    }else if(hp <= 0){
        alert("You have died! Loading last save.");
        //Restore player health upon them dying.
        localStorage.setItem('hp', maxhp);
        LoadData('no_alert');
        location.reload();
    }
}

function Intimidate(plr_atk, enm_def, win, trigger){
    // Roll for Intimidation (haha) with a 25% success chance, growing in accordance to the player's Attack against the opponent's Defence.
    let roll = (Math.floor(Math.random() * 100));
    roll++;
    let disparity = plr_atk - enm_def;
    //If the difference in Attack vs Defence is two digits or bigger, double its effect. Being all scary and stuff.
    if(disparity < 10 || disparity > -10){
        roll = roll + ((disparity) * 0.8);
    }else{
        roll = roll + ((disparity) * 1.6);
    }
    if(roll >= 75){
        alert("Intimidation successful.");
        win();
    }else{
        alert("Intimidation failed.");
        Disable(trigger);
    }
}

function Run(f_name){
    let roll = Math.floor(Math.random() * 100);                 //Generate random number from 0 to 99
    roll++;                                                     //Increment to make it 1 to 100
    //50% chance of escape
    if(roll > 50){
        alert("Escape successful!");
        escaped = true;
        //If the roll succeeds, execute the passed function - Should be the one BEFORE you getting into the predicament you're running from
        f_name();
    }else{
        //If the roll fails, alert the player and leave them in the same situation.
        Combat();
        alert("Escape failed!");
    }
}

function Disable(name){
    document.getElementById(name).setAttribute("onClick", "");
    document.getElementById(name).innerHTML = "Not available.";
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

function WIP(){
    alert("Implementation missing for now, stay tuned for updates!");
}