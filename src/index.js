const dirNames = [
  "小1",
  "小2",
  "小3",
  "小4",
  "小5",
  "小6",
  "中2",
  "中3",
  "高校",
  "常用",
  "準1級",
  "1級",
];

function toggleDarkMode() {
  const html = document.documentElement;
  const newTheme = html.getAttribute("data-bs-theme") === "dark"
    ? "light"
    : "dark";
  html.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("darkMode", newTheme);
}

function changeGrade(event) {
  const dir = dirNames[event.target.selectedIndex];
  location.href = `/graded-idioms-ja/${dir}/`;
}

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("gradeOption").onchange = changeGrade;
