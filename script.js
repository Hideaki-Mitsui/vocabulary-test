// 効果音
const seCorrect = document.getElementById("se-correct");
const seWrong = document.getElementById("se-wrong");

// 音を安全に再生（スマホ対策）
function playSE(audioElem) {
  if (!audioElem) return;
  audioElem.currentTime = 0;
  audioElem.play().catch(() => {});
}

// ==== 設定値 ====
const QUESTION_TIME_LIMIT = 5; // 秒
const LEVELS = [
  "A1",
  "A1+",
  "A2",
  "A2+",
  "B1",
  "B1+",
  "B2",
  "B2+",
  "C1",
  "C1+",
];

// レベル → 数値（難易度）のマッピング
const LEVEL_DIFFICULTY_INDEX = {
  A1: 1,
  "A1+": 2,
  A2: 3,
  "A2+": 4,
  B1: 5,
  "B1+": 6,
  B2: 7,
  "B2+": 8,
  C1: 9,
  "C1+": 10,
};

// ==== 問題データ ====
/**
 * 各問題:
 * - id: 一意のID（任意）
 * - level: "A1" 〜 "C1+"
 * - word: 英単語
 * - options: 日本語4択
 * - correctIndex: 正解のインデックス (0〜3)
 */
const QUESTION_BANK = [
  // ===== A1 (10 words) =====
  { id: "A1_1", level: "A1", word: "apple", options: ["りんご", "机", "猫", "雨"], correctIndex: 0 },
  { id: "A1_2", level: "A1", word: "book", options: ["本", "靴", "川", "魚"], correctIndex: 0 },
  { id: "A1_3", level: "A1", word: "water", options: ["水", "木", "電気", "風"], correctIndex: 0 },
  { id: "A1_4", level: "A1", word: "dog", options: ["犬", "鳥", "花", "雲"], correctIndex: 0 },
  { id: "A1_5", level: "A1", word: "school", options: ["学校", "橋", "山", "道路"], correctIndex: 0 },
  { id: "A1_6", level: "A1", word: "chair", options: ["いす", "川", "海", "森"], correctIndex: 0 },
  { id: "A1_7", level: "A1", word: "milk", options: ["牛乳", "油", "果汁", "土"], correctIndex: 0 },
  { id: "A1_8", level: "A1", word: "family", options: ["家族", "国", "会社", "雪"], correctIndex: 0 },
  { id: "A1_9", level: "A1", word: "house", options: ["家", "箱", "池", "森"], correctIndex: 0 },
  { id: "A1_10", level: "A1", word: "friend", options: ["友達", "先生", "警察", "医者"], correctIndex: 0 },

  // ===== A1+ (10 words) =====
  { id: "A1+_1", level: "A1+", word: "hospital", options: ["病院", "郵便局", "図書館", "会社"], correctIndex: 0 },
  { id: "A1+_2", level: "A1+", word: "always", options: ["いつも", "たまに", "決して〜ない", "もちろん"], correctIndex: 0 },
  { id: "A1+_3", level: "A1+", word: "sometimes", options: ["時々", "必ず", "全くない", "頻繁に"], correctIndex: 0 },
  { id: "A1+_4", level: "A1+", word: "usually", options: ["たいてい", "突然", "静かに", "すぐに"], correctIndex: 0 },
  { id: "A1+_5", level: "A1+", word: "address", options: ["住所", "年齢", "温度", "問題"], correctIndex: 0 },
  { id: "A1+_6", level: "A1+", word: "message", options: ["メッセージ", "荷物", "問題", "機械"], correctIndex: 0 },
  { id: "A1+_7", level: "A1+", word: "travel", options: ["旅行する", "働く", "歌う", "寝る"], correctIndex: 0 },
  { id: "A1+_8", level: "A1+", word: "change", options: ["変える", "借りる", "投げる", "洗う"], correctIndex: 0 },
  { id: "A1+_9", level: "A1+", word: "afraid", options: ["怖がっている", "退屈している", "怒っている", "元気な"], correctIndex: 0 },
  { id: "A1+_10", level: "A1+", word: "comfortable", options: ["快適な", "危険な", "退屈な", "硬い"], correctIndex: 0 },

  // ===== A2 (10 words) =====
  { id: "A2_1", level: "A2", word: "village", options: ["村", "都市", "国", "市場"], correctIndex: 0 },
  { id: "A2_2", level: "A2", word: "mistake", options: ["間違い", "約束", "計画", "お願い"], correctIndex: 0 },
  { id: "A2_3", level: "A2", word: "prepare", options: ["準備する", "飲む", "壊す", "書く"], correctIndex: 0 },
  { id: "A2_4", level: "A2", word: "mail", options: ["郵便物", "車", "部屋", "家族"], correctIndex: 0 },
  { id: "A2_5", level: "A2", word: "visitor", options: ["訪問者", "先生", "警察", "医者"], correctIndex: 0 },
  { id: "A2_6", level: "A2", word: "receive", options: ["受け取る", "落とす", "逃げる", "集める"], correctIndex: 0 },
  { id: "A2_7", level: "A2", word: "excited", options: ["わくわくした", "悲しい", "眠い", "怒った"], correctIndex: 0 },
  { id: "A2_8", level: "A2", word: "improve", options: ["改善する", "壊す", "避ける", "減らす"], correctIndex: 0 },
  { id: "A2_9", level: "A2", word: "comfortable", options: ["快適な", "危険な", "退屈な", "硬い"], correctIndex: 0 },
  { id: "A2_10", level: "A2", word: "opinion", options: ["意見", "解決策", "計画", "歴史"], correctIndex: 0 },

  // ===== A2+ (10 words) =====
  { id: "A2+_1", level: "A2+", word: "celebrate", options: ["祝う", "掃除する", "借りる", "諦める"], correctIndex: 0 },
  { id: "A2+_2", level: "A2+", word: "borrow", options: ["借りる", "返す", "隠す", "選ぶ"], correctIndex: 0 },
  { id: "A2+_3", level: "A2+", word: "cancel", options: ["中止する", "売る", "教える", "掃く"], correctIndex: 0 },
  { id: "A2+_4", level: "A2+", word: "relax", options: ["くつろぐ", "働く", "叫ぶ", "走る"], correctIndex: 0 },
  { id: "A2+_5", level: "A2+", word: "impossible", options: ["不可能な", "重要な", "正しい", "簡単な"], correctIndex: 0 },
  { id: "A2+_6", level: "A2+", word: "promise", options: ["約束", "発表", "宿題", "注意"], correctIndex: 0 },
  { id: "A2+_7", level: "A2+", word: "describe", options: ["説明する", "隠す", "呼ぶ", "変える"], correctIndex: 0 },
  { id: "A2+_8", level: "A2+", word: "challenge", options: ["挑戦", "問題", "事件", "習慣"], correctIndex: 0 },
  { id: "A2+_9", level: "A2+", word: "appointment", options: ["予約", "計画", "会議", "取引"], correctIndex: 0 },
  { id: "A2+_10", level: "A2+", word: "crowded", options: ["混雑した", "空いている", "静かな", "暗い"], correctIndex: 0 },

  // ===== B1 (10 words) =====
  { id: "B1_1", level: "B1", word: "confident", options: ["自信がある", "退屈している", "疲れている", "心配している"], correctIndex: 0 },
  { id: "B1_2", level: "B1", word: "decrease", options: ["減る", "増える", "集める", "比べる"], correctIndex: 0 },
  { id: "B1_3", level: "B1", word: "efficient", options: ["効率的な", "危険な", "不公平な", "退屈な"], correctIndex: 0 },
  { id: "B1_4", level: "B1", word: "formal", options: ["正式な", "古い", "暗い", "楽しい"], correctIndex: 0 },
  { id: "B1_5", level: "B1", word: "neighbor", options: ["隣人", "上司", "部下", "客"], correctIndex: 0 },
  { id: "B1_6", level: "B1", word: "protect", options: ["守る", "壊す", "調べる", "逃げる"], correctIndex: 0 },
  { id: "B1_7", level: "B1", word: "attend", options: ["出席する", "準備する", "改善する", "片付ける"], correctIndex: 0 },
  { id: "B1_8", level: "B1", word: "discuss", options: ["議論する", "笑う", "泣く", "逃げる"], correctIndex: 0 },
  { id: "B1_9", level: "B1", word: "variety", options: ["多様性", "集団", "影響", "欠点"], correctIndex: 0 },
  { id: "B1_10", level: "B1", word: "limit", options: ["制限", "機会", "結果", "計画"], correctIndex: 0 },

  // ===== B1+ (10 words) =====
  { id: "B1+_1", level: "B1+", word: "advertise", options: ["宣伝する", "保存する", "翻訳する", "許可する"], correctIndex: 0 },
  { id: "B1+_2", level: "B1+", word: "delay", options: ["遅らせる", "設計する", "出発する", "修理する"], correctIndex: 0 },
  { id: "B1+_3", level: "B1+", word: "establish", options: ["設立する", "破壊する", "調整する", "反対する"], correctIndex: 0 },
  { id: "B1+_4", level: "B1+", word: "influence", options: ["影響を与える", "助ける", "拒否する", "分析する"], correctIndex: 0 },
  { id: "B1+_5", level: "B1+", word: "require", options: ["必要とする", "減らす", "比較する", "避ける"], correctIndex: 0 },
  { id: "B1+_6", level: "B1+", word: "persuade", options: ["説得する", "辞める", "話しかける", "断る"], correctIndex: 0 },
  { id: "B1+_7", level: "B1+", word: "responsible", options: ["責任がある", "自由な", "不十分な", "簡単な"], correctIndex: 0 },
  { id: "B1+_8", level: "B1+", word: "avoid", options: ["避ける", "探す", "頼む", "攻撃する"], correctIndex: 0 },
  { id: "B1+_9", level: "B1+", word: "benefit", options: ["利益", "問題", "候補", "結果"], correctIndex: 0 },
  { id: "B1+_10", level: "B1+", word: "ability", options: ["能力", "場所", "伝統", "事件"], correctIndex: 0 },

  // ===== B2 (10 words) =====
  { id: "B2_1", level: "B2", word: "evidence", options: ["証拠", "習慣", "能力", "結果"], correctIndex: 0 },
  { id: "B2_2", level: "B2", word: "maintain", options: ["維持する", "予測する", "拒否する", "発明する"], correctIndex: 0 },
  { id: "B2_3", level: "B2", word: "complex", options: ["複雑な", "単純な", "危険な", "柔らかい"], correctIndex: 0 },
  { id: "B2_4", level: "B2", word: "accurate", options: ["正確な", "危険な", "柔軟な", "高価な"], correctIndex: 0 },
  { id: "B2_5", level: "B2", word: "negotiate", options: ["交渉する", "笑う", "破壊する", "信じる"], correctIndex: 0 },
  { id: "B2_6", level: "B2", word: "approach", options: ["接近する", "逃げる", "手伝う", "比較する"], correctIndex: 0 },
  { id: "B2_7", level: "B2", word: "majority", options: ["大多数", "例外", "問題", "解決策"], correctIndex: 0 },
  { id: "B2_8", level: "B2", word: "alternative", options: ["代替案", "問題点", "努力", "理論"], correctIndex: 0 },
  { id: "B2_9", level: "B2", word: "objective", options: ["目的", "反応", "事実", "影響"], correctIndex: 0 },
  { id: "B2_10", level: "B2", word: "significant", options: ["重要な", "古い", "安い", "珍しい"], correctIndex: 0 },

  // ===== B2+ (10 words) =====
  { id: "B2+_1", level: "B2+", word: "income", options: ["収入", "費用", "投資", "負債"], correctIndex: 0 },
  { id: "B2+_2", level: "B2+", word: "efficient", options: ["効率的な", "不公平な", "退屈な", "危険な"], correctIndex: 0 },
  { id: "B2+_3", level: "B2+", word: "assume", options: ["仮定する", "解決する", "選ぶ", "反対する"], correctIndex: 0 },
  { id: "B2+_4", level: "B2+", word: "literally", options: ["文字通り", "簡単に", "適当に", "歴史的に"], correctIndex: 0 },
  { id: "B2+_5", level: "B2+", word: "acquire", options: ["習得する", "忘れる", "逃げる", "破壊する"], correctIndex: 0 },
  { id: "B2+_6", level: "B2+", word: "interpret", options: ["解釈する", "防ぐ", "計算する", "攻撃する"], correctIndex: 0 },
  { id: "B2+_7", level: "B2+", word: "mechanism", options: ["仕組み", "武器", "習慣", "会議"], correctIndex: 0 },
  { id: "B2+_8", level: "B2+", word: "complicated", options: ["複雑な", "高価な", "遅い", "狭い"], correctIndex: 0 },
  { id: "B2+_9", level: "B2+", word: "investment", options: ["投資", "返済", "割引", "手数料"], correctIndex: 0 },
  { id: "B2+_10", level: "B2+", word: "perspective", options: ["視点", "問題", "許可", "注意"], correctIndex: 0 },

  // ===== C1 (10 words) =====
  { id: "C1_1", level: "C1", word: "allocate", options: ["割り当てる", "悩ませる", "無視する", "軽視する"], correctIndex: 0 },
  { id: "C1_2", level: "C1", word: "inevitable", options: ["避けられない", "予測できない", "信頼できない", "重要でない"], correctIndex: 0 },
  { id: "C1_3", level: "C1", word: "abandon", options: ["捨てる", "支える", "作る", "修理する"], correctIndex: 0 },
  { id: "C1_4", level: "C1", word: "accelerate", options: ["加速する", "遅くする", "計画する", "停止する"], correctIndex: 0 },
  { id: "C1_5", level: "C1", word: "competent", options: ["有能な", "怠惰な", "無関係な", "弱い"], correctIndex: 0 },
  { id: "C1_6", level: "C1", word: "consequently", options: ["その結果", "突然", "必ず", "偶然に"], correctIndex: 0 },
  { id: "C1_7", level: "C1", word: "crucial", options: ["極めて重要な", "不十分な", "曖昧な", "危険な"], correctIndex: 0 },
  { id: "C1_8", level: "C1", word: "deprive", options: ["奪う", "助ける", "増やす", "隠す"], correctIndex: 0 },
  { id: "C1_9", level: "C1", word: "emphasize", options: ["強調する", "控える", "交換する", "攻撃する"], correctIndex: 0 },
  { id: "C1_10", level: "C1", word: "fundamental", options: ["基本的な", "高価な", "柔軟な", "偶然の"], correctIndex: 0 },

  // ===== C1+ (10 words) =====
  { id: "C1+_1", level: "C1+", word: "controversial", options: ["議論を呼ぶ", "穏やかな", "単純な", "退屈な"], correctIndex: 0 },
  { id: "C1+_2", level: "C1+", word: "sustainable", options: ["持続可能な", "実現不可能な", "不安定な", "短期的な"], correctIndex: 0 },
  { id: "C1+_3", level: "C1+", word: "allocate", options: ["割り当てる", "無視する", "軽視する", "解消する"], correctIndex: 0 },
  { id: "C1+_4", level: "C1+", word: "hypothesis", options: ["仮説", "例外", "反応", "証拠"], correctIndex: 0 },
  { id: "C1+_5", level: "C1+", word: "contradict", options: ["矛盾する", "説明する", "同意する", "解決する"], correctIndex: 0 },
  { id: "C1+_6", level: "C1+", word: "implicit", options: ["暗黙の", "不必要な", "複雑な", "正確な"], correctIndex: 0 },
  { id: "C1+_7", level: "C1+", word: "feasible", options: ["実現可能な", "危険な", "遅い", "疑わしい"], correctIndex: 0 },
  { id: "C1+_8", level: "C1+", word: "preliminary", options: ["予備的な", "有名な", "柔軟な", "理論的な"], correctIndex: 0 },
  { id: "C1+_9", level: "C1+", word: "spectacular", options: ["壮観な", "退屈な", "不十分な", "単純な"], correctIndex: 0 },
  { id: "C1+_10", level: "C1+", word: "subsequent", options: ["後の", "以前の", "同じ", "重要な"], correctIndex: 0 },
];

// ==== DOM参照 ====
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");

const currentQuestionNumberEl = document.getElementById(
  "current-question-number"
);
const totalQuestionsEl = document.getElementById("total-questions");
const timerValueEl = document.getElementById("timer-value");
const questionWordEl = document.getElementById("question-word");
const questionLevelTagEl = document.getElementById("question-level-tag");
const optionsContainer = document.getElementById("options-container");

const estimatedLevelEl = document.getElementById("estimated-level");
const correctCountEl = document.getElementById("correct-count");
const resultTotalQuestionsEl = document.getElementById(
  "result-total-questions"
);
const levelBreakdownContainer = document.getElementById("level-breakdown");

// ==== 状態 ====
let quizQuestions = []; // 実際に出題する20問
let currentQuestionIndex = 0;
let timerId = null;
let timeRemaining = QUESTION_TIME_LIMIT;
let isAnswered = false;

let correctCount = 0;
let perLevelStats = {}; // level: { correct, total }

// ==== ユーティリティ ====

function shuffleArray(arr) {
  const array = arr.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// レベルごとに2問ずつ選び、全体をシャッフルする
function buildQuizQuestions() {
  const questionsByLevel = {};
  LEVELS.forEach((level) => {
    questionsByLevel[level] = [];
  });

  QUESTION_BANK.forEach((q) => {
    if (questionsByLevel[q.level]) {
      questionsByLevel[q.level].push(q);
    }
  });

  const selected = [];
  perLevelStats = {};

  LEVELS.forEach((level) => {
    const list = questionsByLevel[level] || [];
    if (list.length === 0) return;

    // レベル別に2問（足りなければあるだけ）
    const shuffled = shuffleArray(list);
    const need = Math.min(2, shuffled.length);
    for (let i = 0; i < need; i++) {
      selected.push(shuffled[i]);
    }

    perLevelStats[level] = {
      correct: 0,
      total: need,
    };
  });

  quizQuestions = shuffleArray(selected);
}

// ==== 画面切り替え ====
function showScreen(targetScreen) {
  [startScreen, quizScreen, resultScreen].forEach((screen) => {
    if (screen === targetScreen) {
      screen.classList.add("active");
    } else {
      screen.classList.remove("active");
    }
  });
}

// ==== タイマー ====
function startTimer() {
  clearTimer();
  timeRemaining = QUESTION_TIME_LIMIT;
  timerValueEl.textContent = timeRemaining;

  timerId = setInterval(() => {
    timeRemaining -= 1;
    timerValueEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      handleTimeUp();
    }
  }, 1000);
}

function clearTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

// ==== クイズロジック ====

function renderQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  isAnswered = false;

  currentQuestionNumberEl.textContent = currentQuestionIndex + 1;
  totalQuestionsEl.textContent = quizQuestions.length;

  questionWordEl.textContent = q.word;
  questionLevelTagEl.textContent = q.level;

  optionsContainer.innerHTML = "";
  nextBtn.disabled = true;

  // 元の options と correctIndex から、正誤付きの配列を作る
  const optionObjects = q.options.map((text, index) => ({
    text,
    isCorrect: index === q.correctIndex,
  }));

  // 選択肢をランダムにシャッフル
  const shuffledOptions = shuffleArray(optionObjects);

  // ボタン生成（data-correct に正誤フラグを保持）
  shuffledOptions.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = opt.text;
    btn.dataset.correct = opt.isCorrect ? "1" : "0"; // 👈 ここがポイント
    btn.addEventListener("click", () => handleOptionClick(index));
    optionsContainer.appendChild(btn);
  });

  startTimer();
}



function handleOptionClick(selectedIndex) {
  if (isAnswered) return;
  isAnswered = true;
  clearTimer();

  const q = quizQuestions[currentQuestionIndex];
  const optionButtons = optionsContainer.querySelectorAll(".option-btn");
  const clickedBtn = optionButtons[selectedIndex];

  const isCorrect = clickedBtn.dataset.correct === "1";

  // 全ボタンの見た目更新
  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "1") {
      btn.classList.add("correct");
    }
  });

  if (!isCorrect) {
    clickedBtn.classList.add("incorrect");
  }

  if (isCorrect) {
    playSE(seCorrect);
    correctCount += 1;
    if (perLevelStats[q.level]) {
      perLevelStats[q.level].correct += 1;
    }
  } else {
    playSE(seWrong);
  }

  // ⬇ ここだけでOK（自動で次に行かない）
  nextBtn.disabled = false;
}

function handleTimeUp() {
  if (isAnswered) return;
  isAnswered = true;
  clearTimer();

  playSE(seWrong);

  const optionButtons = optionsContainer.querySelectorAll(".option-btn");

  optionButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "1") {
      btn.classList.add("correct"); // 正解だけ見せる
    }
  });

  // ユーザーが自分で「次の問題へ」を押す
  nextBtn.disabled = false;
}


function goToNextQuestion() {
  if (currentQuestionIndex + 1 >= quizQuestions.length) {
    finishQuiz();
  } else {
    currentQuestionIndex += 1;
    renderQuestion();
  }
}

// ==== 結果計算 ====

const LEVEL_DESCRIPTIONS = {
  "A1":  "超初級：ごく基本的な単語・表現を理解できるレベル。",
  "A1+": "超初級~初級：身近なことについて簡単な語彙を理解できるレベル。",
  "A2":  "初級：日常生活でよく使う語彙を理解できるレベル。",
  "A2+": "初中級：身近な話題の語彙を幅広く理解できるレベル。",
  "B1":  "中級：仕事や日常の多くの場面で使う語彙を理解できる。",
  "B1+": "中級~中上級：少し抽象的な内容や職場での説明にも対応できる。",
  "B2":  "中上級：業務上の複雑な内容も語彙的に理解できる。",
  "B2+": "中上級~上級：専門分野の話題でも概ね理解できる。",
  "C1":  "上級：専門的・抽象的な内容でも語彙を正確に理解できる。",
  "C1+": "超上級：高度な学術・専門語彙も理解できる語彙レベル。",
};

function estimateLevel() {
  const total = quizQuestions.length || 20; // 念のため
  const n = correctCount;

  // 20問前提の段階分け
  // 必要なら後でここだけ調整すればOK
  if (n <= 0) return "A1";
  if (n <= 2) return "A1+";
  if (n <= 4) return "A2";
  if (n <= 6) return "A2+";
  if (n <= 8) return "B1";
  if (n <= 10) return "B1+";
  if (n <= 12) return "B2";
  if (n <= 14) return "B2+";
  if (n <= 17) return "C1";
  return "C1+";
}

function renderResultScreen() {
  const level = estimateLevel();
  estimatedLevelEl.textContent = level;

  // 説明文の表示
  const desc = LEVEL_DESCRIPTIONS[level] || "";
  document.getElementById("level-description").textContent = desc;

  correctCountEl.textContent = correctCount;
  resultTotalQuestionsEl.textContent = quizQuestions.length;
  // レベル別の表を生成
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["レベル", "正答数", "出題数"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  LEVELS.forEach((level) => {
    const stats = perLevelStats[level];
    if (!stats) return;
    const tr = document.createElement("tr");

    const tdLevel = document.createElement("td");
    tdLevel.textContent = level;
    tr.appendChild(tdLevel);

    const tdCorrect = document.createElement("td");
    tdCorrect.textContent = stats.correct || 0;
    tr.appendChild(tdCorrect);

    const tdTotal = document.createElement("td");
    tdTotal.textContent = stats.total || 0;
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  levelBreakdownContainer.innerHTML = "";
  levelBreakdownContainer.appendChild(table);
}

// GA4などを後で入れたい場合のフック
function sendAnalyticsForResult() {
  const estimated = estimatedLevelEl.textContent;
  const score = correctCount;

  // ここに GA4 のイベント送信処理を追加すればOK
  // 例:
  // gtag('event', 'cefr_vocab_test_result', {
  //   estimated_level: estimated,
  //   score: score,
  //   total_questions: quizQuestions.length,
  // });
}

// ==== フロー ====

function startQuiz() {
  buildQuizQuestions();
  currentQuestionIndex = 0;
  correctCount = 0;

  LEVELS.forEach((level) => {
    if (!perLevelStats[level]) return;
    // total は buildQuizQuestions でセット済み
    perLevelStats[level].correct = 0;
  });

  showScreen(quizScreen);
  renderQuestion();
}

function finishQuiz() {
  clearTimer();
  showScreen(resultScreen);
  renderResultScreen();
  sendAnalyticsForResult(); // 将来のためのフック
}

function resetToStart() {
  clearTimer();
  quizQuestions = [];
  currentQuestionIndex = 0;
  correctCount = 0;
  showScreen(startScreen);
}

// ==== イベントバインド ====
startBtn.addEventListener("click", () => {
  startQuiz();
});

nextBtn.addEventListener("click", () => {
  if (!isAnswered) {
    // 未回答で「次へ」を押された場合はタイムアップ扱いにしてもよいが、
    // ここでは単にスキップとして扱う。
    handleTimeUp();
  } else {
    goToNextQuestion();
  }
});

retryBtn.addEventListener("click", () => {
  resetToStart();
});
