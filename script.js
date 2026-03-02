const questions = [
  {
    text: "Что выведет код: print(type({1, 2, 3}))?",
    options: ["<class 'dict'>", "<class 'set'>", "<class 'list'>", "<class 'tuple'>"],
    correct: 1,
    explanation: "{1, 2, 3} — это множество, тип set.",
  },
  {
    text: "Какой результат у выражения: 'python'[::-1]?",
    options: ["python", "nohtyp", "py", "Ошибка TypeError"],
    correct: 1,
    explanation: "Срез [::-1] переворачивает строку задом наперёд.",
  },
  {
    text: "Какой метод словаря безопасно возвращает значение по ключу без KeyError?",
    options: ["dict.find()", "dict.pop()", "dict.get()", "dict.fetch()"],
    correct: 2,
    explanation: "get() возвращает значение или None/значение по умолчанию.",
  },
  {
    text: "Что из перечисленного является генератором?",
    options: ["[x * 2 for x in range(3)]", "(x * 2 for x in range(3))", "{x * 2 for x in range(3)}", "range(3)"],
    correct: 1,
    explanation: "Круглые скобки в comprehension дают generator expression.",
  },
  {
    text: "Что вернёт функция len('🐍Python')?",
    options: ["6", "7", "8", "Ошибка Unicode"],
    correct: 1,
    explanation: "Emoji '🐍' считается одним символом, итого 7.",
  },
];

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const questionTitle = document.getElementById("question-title");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");
const questionIndexEl = document.getElementById("question-index");

let currentQuestion = 0;
let score = 0;
let active = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  questionIndexEl.textContent = `Вопрос ${currentQuestion + 1} / ${questions.length}`;
  questionTitle.textContent = question.text;
  feedbackEl.textContent = "Выберите один вариант ответа.";
  nextBtn.disabled = true;

  optionsEl.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, index));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(selectedButton, selectedIndex) {
  const question = questions[currentQuestion];
  const allButtons = [...document.querySelectorAll(".option")];

  allButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === question.correct) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === question.correct) {
    score += 1;
    scoreEl.textContent = `Баллы: ${score}`;
    feedbackEl.textContent = `Верно! ${question.explanation}`;
  } else {
    selectedButton.classList.add("wrong");
    feedbackEl.textContent = `Неверно. ${question.explanation}`;
  }

  nextBtn.disabled = false;
}

function showResult() {
  questionTitle.textContent = "Тренировка завершена";
  questionIndexEl.textContent = `Вопрос ${questions.length} / ${questions.length}`;
  optionsEl.innerHTML = "";

  const percent = Math.round((score / questions.length) * 100);
  feedbackEl.textContent = `Ваш результат: ${score} из ${questions.length} (${percent}%).`;

  if (percent >= 80) {
    feedbackEl.textContent += " Отлично! Готовы к более сложным задачам.";
  } else if (percent >= 50) {
    feedbackEl.textContent += " Хорошо! Ещё немного практики и будет супер.";
  } else {
    feedbackEl.textContent += " Стоит повторить базовые темы и попробовать снова.";
  }

  nextBtn.disabled = true;
  resetBtn.disabled = false;
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  active = true;
  scoreEl.textContent = "Баллы: 0";
  resetBtn.disabled = true;
  renderQuestion();
}

startBtn.addEventListener("click", () => {
  if (!active) {
    startQuiz();
  }
});

nextBtn.addEventListener("click", () => {
  currentQuestion += 1;

  if (currentQuestion >= questions.length) {
    showResult();
    active = false;
    return;
  }

  renderQuestion();
});

resetBtn.addEventListener("click", () => {
  startQuiz();
});
