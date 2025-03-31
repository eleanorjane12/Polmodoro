
var workTime = 0;
var breakTime = 0;
var largeBreakTime = 45;
var rest = false;
var bigRest = false;
counter = 0;




function reset() {
    document.getElementById("time-q").textContent="how long do you want to work for?";
    document.getElementById("time-q").style.display="block";
    document.getElementById("timer-inlay").style.display="none";
    breakTime = 0;
    workTime = 0;


}


function startTimer() {
    console.log("on break?: " + rest);
    console.log("time for big break? " + bigRest);

    if (rest) {
        document.getElementById("activity-msg").style.display="block";
        
        time = breakTime * 60;
        //time = 2;
    }
    if (bigRest) {
        time = largeBreakTime * 60;
        //time = 10;
    }
    if (!rest) {
        time = workTime * 60;
        //time = 3;
    }
    var timer = setInterval(function(){
        updateTimerDisplay(time);
        time--;

        if (time < 0) {
            clearInterval(timer);
            document.getElementById("next-btn").style.display="inline-block";
            document.getElementById("activity-msg").style.display="none";
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    let chime = new Audio("media/BlipBleep.mp3");
                    chime.play();
                }, i * 1000);
            }
        }
    }, 1000);
       

}

function updateTimerDisplay(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// sets user chosen work period
function setWorkTime(time) {
    workTime = time;
    document.getElementById("time-q").textContent="how long do you want to break for?";
    document.getElementById("worktime-btns").style.display="none";
    document.getElementById("breaktime-btns").style.display="flex";
}

// sets user-chosen break period
function setBreakTime(time) {
    breakTime = time;
    document.getElementById("time-q").style.display="none";
    document.getElementById("start-btn").style.display="block";
    document.getElementById("breaktime-btns").style.display="none";

}

// switches between work and break timer;
function flipFlop() {
    if (!rest) {
        rest = !rest;
        console.log("Rest: "+ rest);
       counter++;
       document.getElementById("activity-msg").textContent="Take a Break!";
       console.log("iteration num: "+ counter);
       if (counter < 4) {
        startTimer();
       } else if (counter >= 4) {
        // show big break message
        bigRest = true;
        document.getElementById("activity-msg").textContent="Take a Longer Break!";
        console.log("time for big break! " + bigRest);
        startTimer();
        bigRest = false; 
        console.log("big break reset! " + bigRest);
       }
    } else {
        rest = !rest;
        document.getElementById("activity-msg").textContent="Time for Work!";
        startTimer();   
    }
    document.getElementById("activity-msg").style.display="block";
    document.getElementById("next-btn").style.display="none";
}


function start() {
    document.getElementById("start-btn").style.display="none";
    document.getElementById("activity-msg").style.display="block";
    document.getElementById("breaktime-btns").style.display="none";
    document.getElementById("timer-inlay").style.display="block";
    document.getElementById("timer").style.display="block";

    startTimer();
}

