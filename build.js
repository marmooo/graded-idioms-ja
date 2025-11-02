import { Eta } from "eta";

const fileNames = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
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
const gradeNames = [
  "小学1年生",
  "小学2年生",
  "小学3年生",
  "小学4年生",
  "小学5年生",
  "小学6年生",
  "中学1〜2年生",
  "中学3年生",
  "高校生",
  "常用漢字",
  "漢検準1級",
  "漢検1級",
];

function toContent(words) {
  let html = "";
  html += toSection("二字熟語", words.filter((w) => w.length == 2));
  html += toSection("三字熟語", words.filter((w) => w.length == 3));
  html += toSection("四字熟語", words.filter((w) => w.length == 4));
  html += toSection("五字以上の熟語", words.filter((w) => w.length >= 5));
  return html;
}

function toSection(title, words) {
  if (words.length == 0) {
    return `
      <div class="card">
        <div class="card-header">${title}</div>
        <div class="card-body">
          <p>この年次に習う${title}はありません。</p>
        </div>
      </div>
    `;
  } else {
    const n = 100;
    let section = "";
    for (let i = 0; i < words.length; i += n) {
      const from = i;
      const to = i + n;
      const wordLinks = words.slice(from, to)
        .map((word) => toLink(word)).join("\n");
      let padding = "";
      if (i != 0) padding = 'class="pt-3"';
      section += `
        <h6 ${padding}>${from + 1}〜${to}</h6>
        <div>
          ${wordLinks}
        </div>
      `;
    }
    return `
      <div class="card">
        <div class="card-header">${title}</div>
        <div class="card-body notranslate">
          ${section}
        </div>
      </div>
    `;
  }
}

function toLink(word) {
  let html = "\n";
  const url = "https://www.google.com/search?q=" + word + "とは";
  html += '<a href="' + url +
    '" class="mx-2" target="_blank" rel="noopener noreferer">' +
    word + "</a>\n";
  return html;
}

function selected(grade, index) {
  if (grade == index) {
    return "selected";
  } else {
    return "";
  }
}

const eta = new Eta({ views: ".", cache: true });
const allIdioms = Deno.readTextFileSync(`dist/all.csv`);
const num = allIdioms.trimEnd().split("\n").length;
for (let i = 0; i < dirNames.length; i++) {
  const words = [];
  const text = Deno.readTextFileSync(`dist/${fileNames[i]}.csv`);
  text.trimEnd().split("\n").forEach((line) => {
    words.push(line.split(",")[0]);
  });
  const dir = "src/" + dirNames[i];
  Deno.mkdirSync(dir, { recursive: true });
  const html = eta.render("page.eta", {
    num: num.toLocaleString("ja-JP"),
    grade: fileNames[i],
    gradeName: gradeNames[i],
    content: toContent(words),
    selected: selected,
  });
  Deno.writeTextFileSync(dir + "/index.html", html);
}
