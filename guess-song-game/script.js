const songs = [
  { audio: "audio/song1.mp3", answers: ["歌名1", "歌一"] },
  { audio: "audio/song2.mp3", answers: ["歌名2", "歌二"] },
];
let current = 0, score = 0;
const audioEl = document.getElementById("audio");
const startBtn = document.getElementById("start-btn");
const gameArea = document.getElementById("game-area");
const result = document.getElementById("result");
const questionNumber = document.getElementById("question-number");
const answerInput = document.getElementById("answer");
const scoreEl = document.getElementById("score");

startBtn.onclick = () => {
  startBtn.style.display = "none";
  gameArea.classList.remove("hidden");
  loadQuestion();
};

function loadQuestion() {
  questionNumber.textContent = `${current + 1} / ${songs.length}`;
  audioEl.src = songs[current].audio;
  answerInput.value = "";
}

document.getElementById("submit").onclick = () => {
  const answer = answerInput.value.trim();
  if (songs[current].answers.includes(answer)) score++;
  next();
};

document.getElementById("skip").onclick = next;

function next() {
  current++;
  if (current < songs.length) {
    loadQuestion();
  } else {
    gameArea.classList.add("hidden");
    result.classList.remove("hidden");
    scoreEl.textContent = `你的得分：${score} / ${songs.length}`;
  }
}
