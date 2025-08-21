// ./scripts/menu.js

let menuHistory = []; // keeps track of navigation history

// ---------------- MAIN MENU ----------------
const mainMenu = [
  { label: "Basic", url: "calculator.html", logo: "🧮" },
  { label: "Scientific", url: "scientific.html", logo: "📐" },
  { label: "Graph", url: "graph.html", logo: "📊" },
  { label: "Convert", url: "convert.html", logo: "🔄" },
  { label: "More Modes >", type: "submenu", submenu: "moreModes", logo: "➕" },
  { type: "sidebar" },
  { label: "Suite", url: "https://www.geogebra.org/calculator", logo: "🌐" },
  { label: "Buisness", url: "https://coda.io/docs/home", logo: "💼" },
  { label: "Terminal", url: "https://labex.io/labs/linux-your-first-linux-lab-270253?course=quick-start-with-linux", logo: "💻" },
  { label: "Task Manager", url: "https://sync.appfluence.com/office365/app/index/app/matrix/3635773/", logo: "📋" },
  { label: "Kit", url: "https://calckit.io/#all_calculators", logo: "🛠️" },
  { label: "Drive", url: "https://www.icloud.com/", logo: "☁️" },
  { label: "Notes", url: "https://numbr.dev/bzbf", logo: "📝" },
  { label: "Write", url: "https://numpad.io/d/2Cds46EaBecNJa2Mv4exv15jQrPe", logo: "✍️" },
  { label: "Paper", url: "https://themathist.com/app", logo: "📄" },
  { label: "Draw", url: "https://webdemo.myscript.com/", logo: "🎨" },
  { label: "Sheet", url: "https://sheet.new/", logo: "📑" },
  { label: "Notepad", url: "https://notepadcalculator.com/", logo: "📓" },
  { type: "sidebar" },
  { label: "Learn >", type: "submenu", submenu: "learn", logo: "📘" },
  { label: "Games", url: "https://www.mathplayground.com/math-games.html", logo: "🎮" },
  { label: "Solve", url: "https://tutorbin.com/statistics-ai-solver", logo: "🧠" },
  { label: "Intelligence Mode >", type: "submenu", submenu: "intelligence", logo: "🤖" },
  { type: "sidebar" },
  { label: "Legacy", url: "https://legacymac.com/", logo: "🕰️" }
];

// ---------------- SUBMENUS ----------------
const submenus = {
  moreModes: [
    { label: "Finance", url: "https://www.finology.in/Calculators/", logo: "💰" },
    { label: "Programmer", url: "https://devtools.calckit.io/programmer-calculator", logo: "💻" },
    { label: "Statistics", url: "https://chatgpt.com/g/g-u5gWskF8h-statistics-solver", logo: "📈" },
    { label: "Matrix & Vector", url: "https://www.meta-calculator.com/matrix-calculator.php?panel-301-matrices", logo: "🔢" },
    { label: "Algorithms & Flowcharts", url: "https://app.diagrams.net/", logo: "🔗" }
  ],
  learn: [
    { label: "Cuemath", url: "https://www.cuemath.com/math-puzzles", logo: "📘" },
    { label: "Wolfram Alpha", url: "https://www.wolframalpha.com/examples/mathematics", logo: "📊" }
  ],
  intelligence: [
    { label: "Main", url: "https://math-gpt.org/", logo: "🤖" },
    { label: "Secondary", url: "https://math-gpt.ai/", logo: "🧠" },
    { label: "Statistics", url: "https://chatgpt.com/g/g-u5gWskF8h-statistics-solver", logo: "📉" }
  ]
};

// ---------------- MENU BUILDER ----------------
function buildMenu(items, showBack = false) {
  const container = document.createElement("div");

  // Back button
  if (showBack) {
    const backBtn = document.createElement("div");
    backBtn.className = "menu-item";
    backBtn.innerHTML = "⬅️ Back";
    backBtn.onclick = () => {
      const prev = menuHistory.pop(); // previous menu
      openMenu(prev.items, prev.showBack);
    };
    container.appendChild(backBtn);
    container.appendChild(Object.assign(document.createElement("div"), { className: "sidebar" }));
  }

  // Menu items
  items.forEach(item => {
    if (item.type === "sidebar") {
      container.appendChild(Object.assign(document.createElement("div"), { className: "sidebar" }));
    } else if (item.type === "submenu") {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `${item.logo} ${item.label}`;
      div.onclick = () => openSubmenu(item.submenu);
      container.appendChild(div);
    } else {
      const div = document.createElement("div");
      div.className = "menu-item";
      div.innerHTML = `${item.logo} ${item.label}`;
      div.onclick = () => window.open(item.url, "_blank");
      container.appendChild(div);
    }
  });

  return container;
}

// ---------------- MENU OPEN/CLOSE ----------------
function openMenu(items = mainMenu, showBack = false) {
  const modal = document.getElementById("menu-modal");
  modal.innerHTML = "";
  modal.appendChild(buildMenu(items, showBack));
  modal.classList.remove("hidden");
}

function openSubmenu(key) {
  // save current state before going deeper
  const currentItems = document.querySelectorAll("#menu-modal .menu-item");
  if (currentItems.length) {
    menuHistory.push({ items: mainMenu, showBack: false });
  }
  openMenu(submenus[key], true);
}

// Close modal on outside click
document.addEventListener("click", (e) => {
  const modal = document.getElementById("menu-modal");
  if (!modal.contains(e.target) && e.target.id !== "calculator-icon") {
    modal.classList.add("hidden");
    menuHistory = []; // reset history
  }
});

// Open menu on icon click
document.getElementById("calculator-icon").addEventListener("click", () => {
  menuHistory = []; // reset history each time
  openMenu();
});
