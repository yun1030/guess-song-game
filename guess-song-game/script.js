const questions = [
  {
    src: "audio/1.mp3",
    answers: ["小幸運", "田馥甄"]
  },
  {
    src: "audio/2.mp3",
    answers: ["告白氣球", "周杰倫"]
  },
  {
    src: "audio/3.mp3",
    answers: ["漂向北方", "王力宏", "黃明志"]
  }
];

let current = 0;
let score = 0;
let order = shuffle([...Array(questions.length).keys()]);

const player = document.getElementById("audio-player");
const feedback = document.getElementById("feedback");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  const q = questions[order[current]];
  player.src = q.src;
  player.play();
  document.getElementById("progress").textContent = `第 ${current + 1} / ${questions.length} 題`;
  document.getElementById("answer-input").value = "";
  feedback.textContent = "";
}

function submitAnswer() {
  const input = document.getElementById("answer-input").value.trim();
  if (!input) {
    feedback.textContent = "請輸入答案！";
    feedback.style.color = "gray";
    return;
  }

  const q = questions[order[current]];
  const correct = q.answers.some(ans => input.includes(ans));

  if (correct) {
    score++;
    feedback.textContent = "答對了！";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `答錯了，正確答案包含：「${q.answers.join(" / ")}」`;
    feedback.style.color = "red";
  }

  setTimeout(nextQuestion, 1500);
}

function skipQuestion() {
  feedback.textContent = "已跳過此題。";
  feedback.style.color = "gray";
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById("game-area").style.display = "none";
  document.getElementById("result-area").style.display = "block";
  document.getElementById("final-score").textContent = `你的得分：${score} / ${questions.length}`;
}

function restartGame() {
  current = 0;
  score = 0;
  order = shuffle([...Array(questions.length).keys()]);
  document.getElementById("result-area").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  loadQuestion();
}

window.onload = loadQuestion;
