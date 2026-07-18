/* 情绪捕手：无需网络或密钥的首版本地判定引擎。 */
const questions = [
  { scene: "我准备了很久的方案发到群里。\n大家讨论了很久，却没有一个人回应我。\n我反复打开群聊，开始怀疑自己是不是不重要。", target: "失落", accepted: ["失落", "落寞", "沮丧", "落空"], near: ["难过", "孤独", "委屈"], category: "期待落空", explanation: "这份难受来自期待没有得到回应，重点是心里忽然落了一块。" },
  { scene: "会议结束以后，所有人都走了。\n我还坐在那里，一遍遍回想自己说错的那句话。\n我很想让时间倒回去。", target: "懊悔", accepted: ["懊悔", "后悔", "悔恨"], near: ["难过", "内疚", "羞愧"], category: "回想过去", explanation: "这里的痛苦指向已经发生的行为，核心是想把它改掉。" },
  { scene: "朋友们约了饭，照片发到了群里。\n我其实有空，只是没人问我要不要一起去。\n我打了好几次“玩得开心”，最后没有发。", target: "被冷落", accepted: ["被冷落", "被忽视", "受冷落", "失落"], near: ["孤独", "委屈", "嫉妒"], category: "关系距离", explanation: "不只是一个人，而是感到自己没有被放在心上。" },
  { scene: "我答应帮他处理一件事，结果自己忙到很晚。\n他只说了一句“怎么这么慢”。\n我想解释，却突然什么也不想说了。", target: "委屈", accepted: ["委屈", "憋屈", "心酸"], near: ["愤怒", "失望", "难过"], category: "不被理解", explanation: "付出没有被看见，还被误解时，很容易感到委屈。" },
  { scene: "电梯门快要合上时，我看见领导站在里面。\n我突然不知道手该放哪里，也不知道第一句话该说什么。\n明明只是几十秒，心跳却快得很。", target: "局促", accepted: ["局促", "窘迫", "不自在", "拘谨"], near: ["紧张", "尴尬", "害怕"], category: "社交暴露", explanation: "这里有紧张，但更贴近的是在他人面前不知如何安放自己的局促。" },
  { scene: "我听见隔壁传来熟悉的笑声。\n他们聊得正热闹，我却突然不想开门。\n不是不喜欢他们，只是觉得自己好像不属于那里。", target: "孤寂", accepted: ["孤寂", "孤独", "寂寞", "落寞"], near: ["被冷落", "难过", "空虚"], category: "关系距离", explanation: "这是一种与人靠近却仍感到隔着距离的孤寂。" },
  { scene: "他终于回了消息，说刚才在忙。\n我盯着那三个字看了很久，胸口那团气慢慢散开。\n原来我只是一直在等一个解释。", target: "释然", accepted: ["释然", "如释重负", "放下", "轻松"], near: ["开心", "平静", "安心"], category: "压力消散", explanation: "困住自己的疑虑被解开后，紧绷感松下来，就是释然。" },
  { scene: "轮到我介绍自己时，房间里安静了。\n我听见自己的声音有点发抖。\n还没开口，手心已经全是汗。", target: "忐忑", accepted: ["忐忑", "紧张", "不安", "惶恐"], near: ["害怕", "焦虑", "局促"], category: "未知结果", explanation: "面对即将到来的未知结果，心里七上八下，是忐忑。" },
  { scene: "我把门轻轻关上，终于不用再假装自己没事。\n坐到沙发上那一刻，我连叹气都觉得很费力。\n今天发生什么都不想再管了。", target: "疲惫", accepted: ["疲惫", "疲倦", "倦怠", "心累"], near: ["麻木", "烦躁", "空虚"], category: "能量耗尽", explanation: "这是持续消耗之后的无力感，重点不是悲伤，而是能量见底。" },
  { scene: "她说那件外套很适合我，还认真问我在哪里买的。\n我原本以为她只是随口一说。\n走出店门时，我忍不住偷偷笑了。", target: "受宠若惊", accepted: ["受宠若惊", "惊喜", "开心", "受宠"], near: ["得意", "自豪", "满足"], category: "被看见", explanation: "意料之外地被喜欢和重视，会让人有一点受宠若惊。" },
  { scene: "我看见同学拿到了那个我也努力争取过的机会。\n我先替他高兴，下一秒却有点不想继续看。\n我不喜欢这样的自己。", target: "嫉妒", accepted: ["嫉妒", "眼红", "妒忌"], near: ["羡慕", "失落", "自卑"], category: "比较", explanation: "羡慕是想拥有；嫉妒里往往还夹着比较后的刺痛和不甘。" },
  { scene: "我拒绝了他的请求。\n明明知道自己没有做错，回家路上还是一直想：\n“他会不会因此很难过？”", target: "内疚", accepted: ["内疚", "愧疚", "歉疚"], near: ["羞愧", "懊悔", "不安"], category: "伤害他人", explanation: "在意自己的选择可能让别人受伤，产生的是内疚，不是羞愧。" },
  { scene: "消息发出去以后，我立刻后悔了。\n我把手机扣在桌上，又忍不住拿起来。\n每次屏幕亮起，我都吓一跳。", target: "焦灼", accepted: ["焦灼", "焦虑", "焦急", "煎熬"], near: ["紧张", "忐忑", "害怕"], category: "等待", explanation: "等待又无法掌控结果时，心被时间拉扯着，就是焦灼。" },
  { scene: "雨停以后，阳光落在桌角。\n那件挂在心里很久的事还没有解决，\n但我突然觉得：慢一点也没关系。", target: "平和", accepted: ["平和", "平静", "安宁", "安然"], near: ["释然", "放松", "满足"], category: "安定", explanation: "问题仍在，但内在不再和它对抗；这是一种平和。" },
  { scene: "我对着镜子看了很久。\n刚才那些逞强的话，原来连我自己都不信。\n我突然有点不敢和任何人对视。", target: "羞愧", accepted: ["羞愧", "羞耻", "难为情", "惭愧"], near: ["内疚", "尴尬", "懊悔"], category: "自我否定", explanation: "羞愧常常是“我这个人不好”的暴露感，和“我做错了一件事”的内疚不同。" },
  { scene: "我把最后一页合上。\n窗外已经很晚了，但我没有急着睡。\n想到明天终于能把它交出去，心里亮了一下。", target: "期待", accepted: ["期待", "期盼", "盼望", "憧憬"], near: ["兴奋", "紧张", "安心"], category: "面向未来", explanation: "朝着未来伸出去、带着一点明亮的等待，是期待。" },
  { scene: "他说“以后再说吧”。\n我没有追问，只是点点头。\n那一刻我好像已经知道，这件事不会再有以后了。", target: "心灰意冷", accepted: ["心灰意冷", "绝望", "死心", "灰心"], near: ["失望", "难过", "失落"], category: "希望熄灭", explanation: "失望之后不再想继续期待，是心灰意冷。" },
  { scene: "我准备的笑话没人听懂。\n空气停了两秒，有人低头看手机。\n我假装去拿水，耳朵却一直发烫。", target: "尴尬", accepted: ["尴尬", "窘迫", "难堪", "社死"], near: ["羞愧", "局促", "紧张"], category: "社交失误", explanation: "在他人面前的互动突然卡住，暴露感让人尴尬。" },
  { scene: "我原本只是随便投了一份简历。\n电话那头说“我们很想见你”。\n我挂掉以后，在原地站了很久。", target: "惊喜", accepted: ["惊喜", "惊讶", "喜出望外", "意外之喜"], near: ["开心", "兴奋", "受宠若惊"], category: "意外好消息", explanation: "好事突然发生、超出预期时，最先浮现的是惊喜。" },
  { scene: "我答应要去，却一直拖到出门前还没换衣服。\n不是不想见他们，只是一想到路上的人和声音，\n身体就像被什么按在原地。", target: "抗拒", accepted: ["抗拒", "排斥", "抵触", "不情愿"], near: ["焦虑", "疲惫", "害怕"], category: "不想靠近", explanation: "身体和心都在往后退，说明此刻最强的是抗拒。" },
  { scene: "他把我随口提过的小事记住了。\n生日那天递给我时，我忽然说不出话。\n原来真的有人认真听过。", target: "感动", accepted: ["感动", "触动", "动容", "暖心"], near: ["惊喜", "开心", "感激"], category: "被珍视", explanation: "被真诚地看见与在意时，心会变软，这就是感动。" },
  { scene: "灯已经关了，我却还在想明天的事情。\n最坏的画面一遍遍出现。\n我知道现在想也没有用，但就是停不下来。", target: "忧虑", accepted: ["忧虑", "担忧", "焦虑", "忧心"], near: ["恐惧", "忐忑", "焦灼"], category: "未来风险", explanation: "对未来可能发生的坏结果持续挂心，是忧虑。" },
  { scene: "我删掉那段写了很久的话。\n这一次，我不想再证明谁对谁错。\n心里还有一点痛，但已经不想拉着它不放。", target: "放下", accepted: ["放下", "释然", "释怀", "松开"], near: ["平静", "失望", "麻木"], category: "告别", explanation: "并非不痛，而是决定不再抓住那份痛；这是一种放下。" },
  { scene: "台上的人念到我的名字。\n我站起来的时候，朋友在台下朝我比了一个大拇指。\n那一瞬间，我觉得这段日子没有白熬。", target: "自豪", accepted: ["自豪", "骄傲", "欣慰", "有成就感"], near: ["开心", "得意", "感动"], category: "努力被证实", explanation: "付出得到肯定，并由衷认可自己的努力，是自豪。" }
];

const state = { deck: [], index: 0, score: 0, correct: 0, near: 0, streak: 0, bestStreak: 0, timer: null, seconds: 20, feedbackTimer: null, categoryMisses: {} };
const $ = (id) => document.getElementById(id);
const screens = { start: $("start-screen"), game: $("game-screen"), result: $("result-screen") };

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function normalize(value) {
  return value.trim().replace(/[，。！!？?、\s]/g, "").replace(/我感到|我觉得|感觉|觉得|有点|很|非常|太/g, "");
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => element.classList.toggle("is-hidden", key !== name));
}

function startGame() {
  clearInterval(state.timer);
  clearTimeout(state.feedbackTimer);
  Object.assign(state, { deck: shuffle(questions).slice(0, 10), index: 0, score: 0, correct: 0, near: 0, streak: 0, bestStreak: 0, seconds: 20, categoryMisses: {} });
  showScreen("game");
  renderQuestion();
}

function renderQuestion() {
  const question = state.deck[state.index];
  state.seconds = 20;
  $("question-current").textContent = String(state.index + 1).padStart(2, "0");
  $("question-total").textContent = state.deck.length;
  $("progress-bar").style.width = `${((state.index + 1) / state.deck.length) * 100}%`;
  $("scene-text").textContent = question.scene;
  $("npc-status").textContent = "正在回想一件事";
  $("answer-input").value = "";
  $("answer-input").disabled = false;
  $("submit-button").disabled = false;
  $("input-hint").textContent = "例如：委屈、释然、窘迫、忐忑";
  updateTimer();
  clearInterval(state.timer);
  state.timer = setInterval(() => {
    state.seconds -= 1;
    updateTimer();
    if (state.seconds <= 0) resolveAnswer("", true);
  }, 1000);
  setTimeout(() => $("answer-input").focus(), 80);
}

function updateTimer() {
  $("timer-number").textContent = state.seconds;
  $("timer-ring").setAttribute("aria-label", `剩余 ${state.seconds} 秒`);
  $("timer-ring").classList.toggle("urgent", state.seconds <= 5);
}

function gradeAnswer(rawAnswer) {
  const answer = normalize(rawAnswer);
  const question = state.deck[state.index];
  if (!answer) return { kind: "timeout" };
  if (question.accepted.some((word) => answer === normalize(word))) return { kind: "correct" };
  if (question.near.some((word) => answer === normalize(word))) return { kind: "near" };
  if (/觉得|应该|不尊重|讨厌|没用|不好|被背叛|不公平/.test(rawAnswer)) return { kind: "not-feeling" };
  return { kind: "wrong" };
}

function resolveAnswer(rawAnswer, timedOut = false) {
  if ($("answer-input").disabled) return;
  clearInterval(state.timer);
  const verdict = timedOut ? { kind: "timeout" } : gradeAnswer(rawAnswer);
  const question = state.deck[state.index];
  $("answer-input").disabled = true;
  $("submit-button").disabled = true;
  $("feedback-layer").classList.remove("is-hidden");
  $("feedback-card").classList.toggle("is-fail", verdict.kind !== "correct");
  const passed = verdict.kind === "correct";
  const messages = {
    correct: "你接住了这份心事",
    near: "差一点，再贴近一点",
    timeout: "时间到了，这份心事是……",
    "not-feeling": "这更像一个想法，不是感受",
    wrong: "这次没有猜中"
  };
  $("feedback-icon").textContent = passed ? "✓" : "×";
  $("feedback-result").textContent = messages[verdict.kind];
  $("correct-answer").textContent = question.target;
  $("feedback-copy").textContent = verdict.kind === "not-feeling"
    ? `“${rawAnswer.trim()}”更像对事件的判断。${question.explanation}`
    : question.explanation;

  if (passed) {
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correct += 1;
    const points = 100 + Math.max(0, state.seconds * 2) + (state.streak - 1) * 10;
    state.score += points;
    $("score-change").textContent = `+${points} 分 · ${state.streak} 连胜`;
  } else {
    state.streak = 0;
    if (verdict.kind === "near") state.near += 1;
    state.categoryMisses[question.category] = (state.categoryMisses[question.category] || 0) + 1;
    $("score-change").textContent = verdict.kind === "near" ? "已记录：差一点答中" : "已记录：下次再来";
  }
  $("npc-status").textContent = `答案是「${question.target}」`;

  let remaining = 3;
  $("next-countdown").textContent = `${remaining} 秒后下一题`;
  clearInterval(state.feedbackTimer);
  state.feedbackTimer = setInterval(() => {
    remaining -= 1;
    $("next-countdown").textContent = remaining > 0 ? `${remaining} 秒后下一题` : "正在前往下一题";
    if (remaining <= 0) {
      clearInterval(state.feedbackTimer);
      nextQuestion();
    }
  }, 1000);
}

function nextQuestion() {
  $("feedback-layer").classList.add("is-hidden");
  state.index += 1;
  if (state.index >= state.deck.length) showResults();
  else renderQuestion();
}

function showResults() {
  clearInterval(state.timer);
  $("correct-count").textContent = state.correct;
  $("final-score").textContent = state.score;
  $("best-streak").textContent = state.bestStreak;
  $("near-count").textContent = state.near;
  const weakCategory = Object.entries(state.categoryMisses).sort((a, b) => b[1] - a[1])[0]?.[0];
  $("reflection-card").textContent = weakCategory
    ? `这局里，你在「${weakCategory}」类型的感受上容易犹豫。下次试着先分辨：这份难受更指向自己、他人，还是还没有发生的事。`
    : "你对这些细微的心事很敏锐。把这种准确带回生活里，情绪就更容易被理解和表达。";
  showScreen("result");
}

$("start-button").addEventListener("click", startGame);
$("restart-button").addEventListener("click", startGame);
$("home-button").addEventListener("click", () => showScreen("start"));
$("quit-button").addEventListener("click", () => { clearInterval(state.timer); clearInterval(state.feedbackTimer); showScreen("start"); });
$("submit-button").addEventListener("click", () => resolveAnswer($("answer-input").value));
$("answer-input").addEventListener("keydown", (event) => { if (event.key === "Enter") resolveAnswer(event.currentTarget.value); });
