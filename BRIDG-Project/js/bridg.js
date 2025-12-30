const hamburger = document.querySelector(".hamburger");
const header = document.querySelector(".site-header");

hamburger.addEventListener("click", () => {
    header.classList.toggle("nav-open");
});

const audio = document.getElementById("audioFile");
const playBtn = document.querySelector(".play-btn");
const soundBtn = document.querySelector(".sound-btn");
const progress = document.querySelector(".audio-bar span");
const time = document.querySelector(".time");

let playing = false;

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.src = "./media/pause.png";
        playing = true;
    } else {
        audio.pause();
        playBtn.src = "./media/play.png";
        playing = false;
    }
});

soundBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    soundBtn.src = audio.muted
        ? "./media/volume-mute.png"
        : "./media/sound.png";
});

setInterval(() => {
    if (!playing) return;

    if (audio.currentTime >= 30) {
        resetPlayer();
        return;
    }

    progress.style.width = (audio.currentTime / 30) * 100 + "%";
    time.textContent = formatTime(audio.currentTime);
}, 200);

function resetPlayer() {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
    progress.style.width = "0%";
    time.textContent = "00:00";
    playBtn.src = "./media/play.png";
}

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const topBtn = document.querySelector(".top");

window.addEventListener("scroll", () => {
    if(window.pageYOffset > 100){
        topBtn.classList.add("active");
    }else{
        topBtn.classList.remove("active");
    }
})

topBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const orderForm = document.querySelector(".order-form");
const popup = document.getElementById("order-popup");
const closePopup = document.getElementById("closePopup");

if(orderForm && popup){
    orderForm.addEventListener("submit", (e) => {
        e.preventDefault();
        popup.classList.add("active");
        orderForm.reset();
    });
}

if(closePopup){
    closePopup.addEventListener("click", () =>{
        popup.classList.remove("active");
    });
}

