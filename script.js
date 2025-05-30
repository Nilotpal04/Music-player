let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlicon = document.getElementById("ctrlicon");

let currentTimeEl = document.getElementById("current-time");
let totalDurationEl = document.getElementById("total-duration");

 let updateProgress;

song.onloadeddata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (song.paused) {
        song.play();
        ctrlicon.src = "images/heart.png";

         updateProgress = setInterval(() => {
            progress.value = song.currentTime;
            updateProgressBarColor();
        }, 500);

    } else {
        song.pause();
        ctrlicon.src = "images/play.png";
        
        clearInterval(updateProgress);
    }
}

progress.onchange = function () {
    song.currentTime = progress.value;
 updateProgressBarColor();
    if (song.paused) {
        song.play();
        ctrlicon.src = "images/heart.png";

        updateProgress = setInterval(() => {
            progress.value = song.currentTime;
             updateProgressBarColor();
        }, 500);
    }
};

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

song.onloadedmetadata = function () {
  totalDurationEl.textContent = formatTime(song.duration);
};

song.ontimeupdate = function () {
  currentTimeEl.textContent = formatTime(song.currentTime);
   updateProgressBarColor();
};

function updateProgressBarColor() {
    const value = (progress.value / progress.max) * 100;
    progress.style.background = `linear-gradient(to right, #a287f4 ${value}%, #d9bfff ${value}%)`;
}
