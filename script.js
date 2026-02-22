/* ===============================
   MYSTERY_TO_DO v1.0 ENGINE
================================ */

const STORAGE_KEY = "mystery_v1";

/* ========= STATE ========= */

function getDefaultState() {
  return {
    days: {},
    collection: [],
    graveyard: [],
    stats: {
      streak: 0,
      longestStreak: 0,
      totalSummoned: 0,
      legendaryCount: 0
    },
    settings: {
      theme: "light"
    }
  };
}

function getState() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || getDefaultState();
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ========= DATE HELPERS ========= */

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

function yesterdayKey() {
  return new Date(Date.now() - 86400000).toISOString().split("T")[0];
}

/* ========= SEASON ========= */

function getSeason() {
  const m = new Date().getMonth();
  if (m <= 1 || m === 11) return "winter";
  if (m <= 4) return "spring";
  if (m <= 7) return "summer";
  return "autumn";
}

/* ========= SPIRIT GENERATOR ========= */

function generateSpirit(seed, rarity) {
  const season = getSeason();

  const palettes = {
    spring: "#b8e0d2",
    summer: "#ffd27f",
    autumn: "#ffb38a",
    winter: "#c7d8ff"
  };

  const rarityOpacity = {
    Common: 0.7,
    Rare: 0.85,
    Legendary: 1
  };

  const color = palettes[season];

  return `
  <svg width="140" height="140" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="35"
      fill="${color}"
      opacity="${rarityOpacity[rarity]}">
      <animate attributeName="cy"
        values="50;45;50"
        dur="3s"
        repeatCount="indefinite"/>
    </circle>
    <circle cx="40" cy="45" r="5" fill="#000"/>
    <circle cx="60" cy="45" r="5" fill="#000"/>
  </svg>
  `;
}

/* ========= TASK SYSTEM ========= */

function ensureToday(state) {
  const key = todayKey();
  if (!state.days[key]) {
    state.days[key] = {
      tasks: [],
      revealed: false
    };
  }
}

function renderTasks() {
  const state = getState();
  ensureToday(state);
  saveState(state);

  const key = todayKey();
  const tasks = state.days[key].tasks;

  const ul = document.getElementById("tasks");
  if (!ul) return;

  ul.innerHTML = "";

  const empty = document.getElementById("empty");
  const progress = document.getElementById("progress");

  if (!tasks.length) {
    empty.classList.remove("hidden");
    progress.classList.add("hidden");
    return;
  }

  empty.classList.add("hidden");
  progress.classList.remove("hidden");

  tasks.forEach((t, i) => {
    const li = document.createElement("li");
    li.textContent = t.text;
    if (t.done) li.classList.add("done");
    li.onclick = () => toggleTask(i);
    ul.appendChild(li);
  });

  updateProgress(tasks);
}

function addTask(text) {
  const state = getState();
  ensureToday(state);

  state.days[todayKey()].tasks.push({
    text,
    done: false
  });

  saveState(state);
  renderTasks();
}

function toggleTask(i) {
  const state = getState();
  const tasks = state.days[todayKey()].tasks;

  tasks[i].done = !tasks[i].done;

  saveState(state);
  renderTasks();
}

function updateProgress(tasks) {
  const done = tasks.filter(t => t.done).length;
  const pct = Math.round((done / tasks.length) * 100);

  document.getElementById("bar-fill").style.width = pct + "%";
  document.getElementById("progress-count").textContent =
    `${done}/${tasks.length}`;

  document.getElementById("progress-label").textContent =
    pct === 100 ? "Return tomorrow 🌙" : "Keep going ✦";
}

/* ========= REVEAL ENGINE ========= */

function handleReveal() {
  const state = getState();
  const yKey = yesterdayKey();

  if (!state.days[yKey] || state.days[yKey].revealed) return;

  const tasks = state.days[yKey].tasks;
  if (!tasks.length) return;

  const allDone = tasks.every(t => t.done);

  if (allDone) {
    const rarity =
      tasks.length >= 8 ? "Legendary" :
      tasks.length >= 5 ? "Rare" :
      "Common";

    const seed = tasks.length + yKey.length;

    state.collection.push({
      rarity,
      date: yKey,
      seed
    });

    state.stats.streak++;
    state.stats.totalSummoned++;

    if (rarity === "Legendary") {
      state.stats.legendaryCount++;
    }

    if (state.stats.streak > state.stats.longestStreak) {
      state.stats.longestStreak = state.stats.streak;
    }

    

  } else {
    state.graveyard.push({ date: yKey });
    state.stats.streak = 0;
  }

  state.days[yKey].revealed = true;
  saveState(state);
}

/* ========= SHOW REVEAL ========= */



/* ========= GALLERY ========= */

function renderGallery() {
  const state = getState();
  const colDiv = document.getElementById("collection");
  const graveDiv = document.getElementById("graveyard");

  if (!colDiv) return;

  state.collection.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = generateSpirit(c.seed, c.rarity);
    colDiv.appendChild(div);
  });

  state.graveyard.forEach(() => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = "🌫";
    graveDiv.appendChild(div);
  });
}

/* ========= STATS ========= */

function renderStats() {
  const state = getState();
  const box = document.getElementById("stats-box");
  if (!box) return;

  box.innerHTML = `
    <p>Current Streak: ${state.stats.streak}</p>
    <p>Longest Streak: ${state.stats.longestStreak}</p>
    <p>Total Summoned: ${state.stats.totalSummoned}</p>
    <p>Legendary Spirits: ${state.stats.legendaryCount}</p>
    <p>Total Lost: ${state.graveyard.length}</p>
  `;
}

/* ========= THEME ========= */

function initTheme() {
  const state = getState();
  if (state.settings.theme === "dark") {
    document.body.classList.add("dark");
  }

  const btn = document.getElementById("theme-toggle");
  if (!btn) return;

  btn.onclick = () => {
    document.body.classList.toggle("dark");
    state.settings.theme =
      document.body.classList.contains("dark") ? "dark" : "light";
    saveState(state);
  };
}

/* ========= SHARE ========= */



/* ========= INIT ========= */

function init() {
  renderTasks();

  renderGallery();
  renderStats();
  initTheme();
 

  const input = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");

  if (addBtn) {
    addBtn.onclick = () => {
      if (!input.value.trim()) return;
      addTask(input.value.trim());
      input.value = "";
    };
  }

  if (input) {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") addBtn.click();
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
