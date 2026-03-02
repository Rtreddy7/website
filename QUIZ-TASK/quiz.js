"use strict";

/* ---------------- DOM helpers ---------------- */
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function formatTime(seconds){
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function shuffle(arr){
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function clearEl(el){
  while (el.firstChild) el.removeChild(el.firstChild);
}

function setActiveCard(target){
  startScreen.classList.remove("active");
  examScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  target.classList.add("active");
}

/* ---------------- Elements ---------------- */
var startBtn = $("#startBtn");
var submitBtn = $("#submitBtn");
var restartBtn = $("#restartBtn");

var prevBtn = $("#prevBtn");
var nextBtn = $("#nextBtn");
var markBtn = $("#markBtn");

var categorySelect = $("#categorySelect");
var countSelect = $("#countSelect");
var timeSelect = $("#timeSelect");

var timeText = $("#timeText");
var timeBarFill = $("#timeBarFill");
var bottomHint = $("#bottomHint");
var bankInfo = $("#bankInfo");

var navGrid = $("#navGrid");

var qIndexText = $("#qIndexText");
var qTotalText = $("#qTotalText");
var markedCountEl = $("#markedCount");
var answeredCountEl = $("#answeredCount");
var unansweredCountEl = $("#unansweredCount");

var startScreen = $("#startScreen");
var examScreen = $("#examScreen");
var resultScreen = $("#resultScreen");

var questionText = $("#questionText");
var optionsWrap = $("#options");

var scoreText = $("#scoreText");
var accuracyText = $("#accuracyText");
var timeTakenText = $("#timeTakenText");
var topicBreakdown = $("#topicBreakdown");
var reviewList = $("#reviewList");

/* ---------------- State ---------------- */
var QUESTION_BANK = [];
var questionsLoaded = false;
var loadingPromise = null;

var exam = null;
var timerId = null;

/* ---------------- Load questions.json ---------------- */
function loadQuestionsOnce(){
  if (loadingPromise) return loadingPromise;

  bankInfo.textContent = "Loading questions...";
  loadingPromise = fetch("questions.json")
    .then(function(res){
      if (!res.ok) throw new Error("Failed to load questions.json");
      return res.json();
    })
    .then(function(data){
      QUESTION_BANK = Array.isArray(data) ? data : [];
      questionsLoaded = true;
      bankInfo.textContent = "Question bank: " + QUESTION_BANK.length;
    })
    .catch(function(err){
      questionsLoaded = false;
      bankInfo.textContent = "Could not load questions.json (use Live Server).";
      console.error(err);
    });

  return loadingPromise;
}

/* ---------------- Build Exam ---------------- */
function buildExam(){
  var category = categorySelect.value;
  var requestedCount = Number(countSelect.value);
  var totalTime = Number(timeSelect.value);

  // pool by category
  var pool = QUESTION_BANK.filter(function(q){
    if (category === "mixed") return true;
    return q.topic === category;
  });

  // if not enough questions in chosen category, use full bank (still no repeats)
  if (pool.length < requestedCount) pool = QUESTION_BANK.slice();

  // if still not enough (bank too small), cap and warn
  if (pool.length < requestedCount){
    bottomHint.textContent = "Add more questions to get " + requestedCount + " unique questions.";
    requestedCount = pool.length;
  } else {
    bottomHint.textContent = "Exam started. No feedback until submit.";
  }

  var picked = shuffle(pool).slice(0, requestedCount);

  var questions = picked.map(function(q, idx){
    return {
      id: q.id,
      topic: q.topic,
      q: q.q,
      options: q.options,
      answer: q.answer,
      exp: q.exp,
      index: idx,
      userAnswer: null,
      marked: false
    };
  });

  exam = {
    category: category,
    count: requestedCount,
    totalTime: totalTime,
    timeLeft: totalTime,
    startedAt: Date.now(),
    endedAt: null,
    currentIndex: 0,
    submitted: false,
    questions: questions
  };

  qTotalText.textContent = String(exam.count);
}

/* ---------------- Navigator ---------------- */
function renderNav(){
  clearEl(navGrid);

  for (var i = 0; i < exam.questions.length; i++){
    (function(index){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "navBtn";
      btn.textContent = String(index + 1);
      btn.addEventListener("click", function(){
        goTo(index);
      });
      navGrid.appendChild(btn);
    })(i);
  }
  updateNavStates();
}

function updateNavStates(){
  var btns = Array.from(navGrid.children);
  for (var i = 0; i < btns.length; i++){
    var b = btns[i];
    var q = exam.questions[i];
    b.classList.toggle("active", i === exam.currentIndex);
    b.classList.toggle("answered", q.userAnswer !== null);
    b.classList.toggle("marked", q.marked);
  }
}

/* ---------------- Stats ---------------- */
function updateStats(){
  var answered = 0;
  var marked = 0;

  for (var i = 0; i < exam.questions.length; i++){
    if (exam.questions[i].userAnswer !== null) answered++;
    if (exam.questions[i].marked) marked++;
  }

  var unanswered = exam.count - answered;

  answeredCountEl.textContent = String(answered);
  markedCountEl.textContent = String(marked);
  unansweredCountEl.textContent = String(unanswered);

  qIndexText.textContent = String(exam.currentIndex + 1);

  prevBtn.disabled = (exam.currentIndex === 0);
  nextBtn.disabled = (exam.currentIndex === exam.count - 1);

  submitBtn.disabled = false;

  var cur = exam.questions[exam.currentIndex];
  markBtn.textContent = cur.marked ? "🔖 Unmark" : "🔖 Mark for review";

  updateNavStates();
}

/* ---------------- Question Render (no innerHTML) ---------------- */
function renderCurrentQuestion(){
  var q = exam.questions[exam.currentIndex];
  questionText.textContent = q.q;

  clearEl(optionsWrap);

  var keys = ["A", "B", "C", "D"];

  for (var i = 0; i < q.options.length; i++){
    (function(optIndex){
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "optionBtn";

      var keySpan = document.createElement("span");
      keySpan.className = "optionKey";
      keySpan.textContent = keys[optIndex];

      btn.appendChild(keySpan);
      btn.appendChild(document.createTextNode(q.options[optIndex]));

      if (q.userAnswer === optIndex) btn.classList.add("selected");

      btn.addEventListener("click", function(){
        selectOption(optIndex);
      });

      optionsWrap.appendChild(btn);
    })(i);
  }

  updateStats();
}

function selectOption(optionIndex){
  var q = exam.questions[exam.currentIndex];
  q.userAnswer = optionIndex;

  var children = Array.from(optionsWrap.children);
  for (var i = 0; i < children.length; i++){
    children[i].classList.toggle("selected", i === optionIndex);
  }

  updateStats();
}

function goTo(index){
  exam.currentIndex = clamp(index, 0, exam.count - 1);
  renderCurrentQuestion();
}

function next(){
  if (exam.currentIndex < exam.count - 1){
    exam.currentIndex++;
    renderCurrentQuestion();
  }
}

function prev(){
  if (exam.currentIndex > 0){
    exam.currentIndex--;
    renderCurrentQuestion();
  }
}

function toggleMark(){
  var q = exam.questions[exam.currentIndex];
  q.marked = !q.marked;
  updateStats();
}

/* ---------------- Timer ---------------- */
function startTimer(){
  clearInterval(timerId);

  timeText.textContent = formatTime(exam.timeLeft);
  updateTimeBar();

  timerId = setInterval(function(){
    if (!exam || exam.submitted) return;

    exam.timeLeft = Math.max(0, exam.timeLeft - 1);
    timeText.textContent = formatTime(exam.timeLeft);
    updateTimeBar();

    if (exam.timeLeft === 0){
      bottomHint.textContent = "Time is up. Auto-submitting…";
      submitExam(true);
    }
  }, 1000);
}

function updateTimeBar(){
  var used = exam.totalTime - exam.timeLeft;
  var pctUsed = exam.totalTime ? (used / exam.totalTime) * 100 : 0;
  timeBarFill.style.width = pctUsed.toFixed(2) + "%";

  var pctLeft = exam.totalTime ? (exam.timeLeft / exam.totalTime) * 100 : 0;
  if (pctLeft <= 20) timeBarFill.classList.add("warn");
  else timeBarFill.classList.remove("warn");
}

/* ---------------- Results (no innerHTML) ---------------- */
function submitExam(auto){
  if (!exam || exam.submitted) return;

  exam.submitted = true;
  exam.endedAt = Date.now();
  clearInterval(timerId);

  var correct = 0;
  var byTopic = {};

  for (var i = 0; i < exam.questions.length; i++){
    var q = exam.questions[i];
    var t = q.topic || "mixed";
    if (!byTopic[t]) byTopic[t] = { total: 0, correct: 0 };
    byTopic[t].total++;

    var ok = (q.userAnswer === q.answer);
    if (ok){
      correct++;
      byTopic[t].correct++;
    }
  }

  var accuracy = exam.count ? Math.round((correct / exam.count) * 100) : 0;
  var takenSec = Math.round((exam.endedAt - exam.startedAt) / 1000);

  scoreText.textContent = String(correct) + " / " + String(exam.count);
  accuracyText.textContent = String(accuracy) + "%";
  timeTakenText.textContent = formatTime(takenSec);

  renderBreakdown(byTopic);
  setReviewFilter("all");
  renderReview("all");

  setActiveCard(resultScreen);
  setButtonsEnabled(false);

  bottomHint.textContent = auto ? "Submitted automatically (time ended)." : "Submitted. Review below.";
}

function setButtonsEnabled(enabled){
  prevBtn.disabled = !enabled;
  nextBtn.disabled = !enabled;
  markBtn.disabled = !enabled;
  submitBtn.disabled = !enabled;
}

function renderBreakdown(byTopic){
  clearEl(topicBreakdown);

  var topics = Object.keys(byTopic);
  topics.sort();

  for (var i = 0; i < topics.length; i++){
    var t = topics[i];
    var info = byTopic[t];
    var pct = info.total ? Math.round((info.correct / info.total) * 100) : 0;

    var row = document.createElement("div");
    row.className = "barRow";

    var label = document.createElement("div");
    label.className = "barLabel";
    label.textContent = t.toUpperCase();

    var bar = document.createElement("div");
    bar.className = "bar";

    var fill = document.createElement("div");
    fill.className = "barFill";
    fill.style.width = pct + "%";

    bar.appendChild(fill);

    var pctEl = document.createElement("div");
    pctEl.className = "barPct";
    pctEl.textContent = pct + "%";

    row.appendChild(label);
    row.appendChild(bar);
    row.appendChild(pctEl);

    topicBreakdown.appendChild(row);
  }
}

function renderReview(filter){
  clearEl(reviewList);

  var items = [];
  for (var i = 0; i < exam.questions.length; i++){
    var q = exam.questions[i];
    if (filter === "wrong" && q.userAnswer === q.answer) continue;
    if (filter === "marked" && !q.marked) continue;
    items.push(q);
  }

  if (items.length === 0){
    var empty = document.createElement("div");
    empty.className = "reviewCard";
    empty.appendChild(document.createTextNode("No questions in this filter."));
    reviewList.appendChild(empty);
    return;
  }

  for (var k = 0; k < items.length; k++){
    var q2 = items[k];
    var isCorrect = (q2.userAnswer === q2.answer);

    var card = document.createElement("div");
    card.className = "reviewCard";

    var head = document.createElement("div");
    head.className = "reviewHead";

    var title = document.createElement("div");
    title.className = "reviewTitle";
    title.textContent = "Q" + String(q2.index + 1);

    var tagsWrap = document.createElement("div");

    var tag1 = document.createElement("span");
    tag1.className = "tag " + (isCorrect ? "good" : "bad");
    tag1.textContent = isCorrect ? "✅ Correct" : "❌ Wrong";
    tagsWrap.appendChild(tag1);

    if (q2.marked){
      var tagM = document.createElement("span");
      tagM.className = "tag marked";
      tagM.textContent = "🔖 Marked";
      tagsWrap.appendChild(tagM);
    }

    var tagT = document.createElement("span");
    tagT.className = "tag";
    tagT.textContent = (q2.topic || "mixed").toUpperCase();
    tagsWrap.appendChild(tagT);

    head.appendChild(title);
    head.appendChild(tagsWrap);

    var qText = document.createElement("div");
    qText.className = "reviewQ";
    qText.textContent = q2.q;

    var grid = document.createElement("div");
    grid.className = "reviewGrid";

    var your = document.createElement("div");
    your.className = "reviewOpt yours " + (isCorrect ? "good" : "bad");

    var yourStrong = document.createElement("strong");
    yourStrong.textContent = "Your answer:";
    your.appendChild(yourStrong);

    var yourAns = document.createElement("div");
    yourAns.textContent = (q2.userAnswer === null) ? "Not answered" : q2.options[q2.userAnswer];
    your.appendChild(yourAns);

    var correctBox = document.createElement("div");
    correctBox.className = "reviewOpt correct";

    var cStrong = document.createElement("strong");
    cStrong.textContent = "Correct answer:";
    correctBox.appendChild(cStrong);

    var cAns = document.createElement("div");
    cAns.textContent = q2.options[q2.answer];
    correctBox.appendChild(cAns);

    grid.appendChild(your);
    grid.appendChild(correctBox);

    var exp = document.createElement("div");
    exp.className = "explain";
    exp.textContent = q2.exp;

    card.appendChild(head);
    card.appendChild(qText);
    card.appendChild(grid);
    card.appendChild(exp);

    reviewList.appendChild(card);
  }
}

/* ---------------- Filters ---------------- */
function setReviewFilter(filter){
  var buttons = $all(".chipBtn");
  for (var i = 0; i < buttons.length; i++){
    buttons[i].classList.remove("active");
    if (buttons[i].getAttribute("data-filter") === filter){
      buttons[i].classList.add("active");
    }
  }
}

/* ---------------- Events ---------------- */
startBtn.addEventListener("click", function(){
  loadQuestionsOnce().then(function(){
    if (!questionsLoaded || !QUESTION_BANK.length){
      bottomHint.textContent = "Questions not loaded. Use Live Server.";
      return;
    }

    buildExam();
    renderNav();

    setActiveCard(examScreen);

    prevBtn.disabled = false;
    nextBtn.disabled = false;
    markBtn.disabled = false;
    submitBtn.disabled = false;

    renderCurrentQuestion();
    startTimer();
  });
});

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
markBtn.addEventListener("click", toggleMark);
submitBtn.addEventListener("click", function(){ submitExam(false); });

restartBtn.addEventListener("click", function(){
  clearInterval(timerId);
  exam = null;

  timeText.textContent = "--:--";
  timeBarFill.style.width = "0%";
  timeBarFill.classList.remove("warn");

  bottomHint.textContent = "Ready.";

  clearEl(navGrid);
  qIndexText.textContent = "0";
  qTotalText.textContent = "0";
  markedCountEl.textContent = "0";
  answeredCountEl.textContent = "0";
  unansweredCountEl.textContent = "0";

  setButtonsEnabled(false);
  setActiveCard(startScreen);
});

$all(".chipBtn").forEach(function(btn){
  btn.addEventListener("click", function(){
    var f = btn.getAttribute("data-filter");
    setReviewFilter(f);
    renderReview(f);
  });
});

/* Keyboard shortcuts */
document.addEventListener("keydown", function(e){
  if (!exam || exam.submitted) return;

  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
  if (e.key === "m" || e.key === "M") toggleMark();

  var key = e.key.toLowerCase();
  var map = { a:0, b:1, c:2, d:3 };
  if (map.hasOwnProperty(key)) selectOption(map[key]);
});

/* init */
setButtonsEnabled(false);
loadQuestionsOnce();