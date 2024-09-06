const sectors = [
  { color: "#FFBC03", text: "#333333", label: "124" , data : "Article 124 of the Indian Constitution pertains to the establishment and composition of the Supreme Court of India" },
  { color: "#FF5A10", text: "#333333", label: "125" , data : "Article 125 of the Indian Constitution pertains to the salaries, allowances, and privileges of the judges of the Supreme Court, including the Chief Justice of India (CJI)." },
  { color: "#FFBC03", text: "#333333", label: "126" , data : "Article 126 of the Indian Constitution deals with the appointment of an Acting Chief Justice of India in certain circumstances." },
  { color: "#FF5A10", text: "#333333", label: "127" , data : "Article 127 of the Indian Constitution pertains to the appointment of ad hoc judges in the Supreme Court." },
  { color: "#FFBC03", text: "#333333", label: "128" , data : "Article 128 of the Indian Constitution deals with the attendance of retired judges at the sittings of the Supreme Court." },
  { color: "#FF5A10", text: "#333333", label: "129" , data : "Article 129 of the Indian Constitution establishes the Supreme Court of India as a Court of Record." },
  { color: "#FFBC03", text: "#333333", label: "130" , data : "It establishes that the Supreme Court of India shall sit in Delhi or any other place as prescribed by Parliament." },
  { color: "#FF5A10", text: "#333333", label: "131" , data : "The Supreme Court has original jurisdiction to resolve disputes between the Government of India and one or more states, or between states themselves. It covers disputes related to the distribution of powers between different levels of government." },
  { color: "#FFBC03", text: "#333333", label: "132" , data : "The Supreme Court has appellate jurisdiction over cases involving substantial questions of law related to the interpretation of the Constitution. It can hear appeals from High Courts if the case involves such constitutional questions." },
  { color: "#FF5A10", text: "#333333", label: "133" , data : "The Supreme Court has appellate jurisdiction in civil cases where the High Court certifies that the case involves a substantial question of law or if there is a dispute on a matter of general public importance." },
  { color: "#FFBC03", text: "#333333", label: "134" , data : "The Supreme Court has appellate jurisdiction in criminal cases if the High Court has sentenced a person to death, life imprisonment, or imprisonment for a term of not less than ten years. It can also hear appeals in other criminal cases where the High Court has made a significant legal decision." },
  { color: "#FF5A10", text: "#333333", label: "135" , data : "This article allows the Supreme Court to review its own judgments and orders. Such a review can be initiated by the court itself or on a petition filed by the parties concerned." },
  { color: "#FFBC03", text: "#333333", label: "136" , data : "The Supreme Court can grant special leave to appeal from any court or tribunal in the country, even if the case does not involve a substantial question of law. This provides the Supreme Court with discretion to hear appeals in cases of exceptional importance." },
  { color: "#FF5A10", text: "#333333", label: "137" , data : "The Supreme Court has the power to review its own judgments or orders. This review is conducted by the same bench or a different bench of the court and can be done on the grounds of error or other significant reasons." },
  { color: "#FFBC03", text: "#333333", label: "138" , data : "Parliament can extend the Supreme Court’s jurisdiction to matters beyond those mentioned in the Constitution. This can include jurisdiction over any other matter of national importance or public interest." },
  { color: "#FF5A10", text: "#333333", label: "139" , data : "Parliament can confer upon High Courts the powers and jurisdiction of the Supreme Court with respect to any matter or class of matters. This ensures that the High Courts can handle specific issues that might otherwise overwhelm the Supreme Court." },
  { color: "#FFBC03", text: "#333333", label: "140" , data : "The Supreme Court has the power to issue directions or orders for the enforcement of fundamental rights or to ensure justice. This includes directing subordinate courts or authorities to act in a particular manner." },
  { color: "#FF5A10", text: "#333333", label: "141" , data : "The law declared by the Supreme Court is binding on all courts and authorities within the territory of India. This principle ensures uniformity and consistency in the application of law." },
  { color: "#FFBC03", text: "#333333", label: "142" , data : "The Supreme Court can pass any order or decree necessary for the enforcement of its own judgments. This includes any directions needed to ensure justice is done, even if such orders are not directly related to the provisions of the Constitution or statutes." },
  { color: "#FF5A10", text: "#333333", label: "143" , data : "The President of India can refer any question of law or fact of public importance to the Supreme Court for its opinion. The Court provides its opinion in such matters, though the opinion is advisory and not binding." },
  { color: "#FFBC03", text: "#333333", label: "144" , data : "All courts and authorities are required to act according to the directions of the Supreme Court. This ensures that the directives and judgments of the Supreme Court are implemented effectively." },
  { color: "#FF5A10", text: "#333333", label: "145" , data : "The Supreme Court has the power to make its own rules of procedure for the conduct of its business. These rules cover the practice and procedure to be followed by the Court in hearing and deciding cases." },
  { color: "#FFBC03", text: "#333333", label: "146" , data : "Parliament is responsible for determining the salaries, allowances, and conditions of service for the officers and staff of the Supreme Court, excluding the judges." },
  { color: "#FF5A10", text: "#333333", label: "147" , data : "This article provides the power to Parliament to determine the conditions under which the Supreme Court's decisions on constitutional matters can be made. It addresses the procedures related to interpreting the Constitution." },
  { color: "#FFBC03", text: "#333333", label: "..." , data : " data of article " },
  { color: "#000", text: "#333333", label: "Prize draw" , data : " data of article " },
];

const events = {
  listeners: {},
  addListener: function (eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  },
  fire: function (eventName, ...args) {
    if (this.listeners[eventName]) {
      for (let fn of this.listeners[eventName]) {
        fn(...args);
      }
    }
  },
};

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

let spinButtonClicked = false;

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();

  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();

  // TEXT
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = sector.text;
  ctx.font = "bold 30px 'Lato', sans-serif";
  ctx.fillText(sector.label, rad - 10, 10);
  //

  ctx.restore();
}

function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

  spinEl.textContent = !angVel ? "SPIN" : sector.label;
  spinEl.style.background = sector.color;
  spinEl.style.color = sector.text;
}

function frame() {
  // Fire an event after the wheel has stopped spinning
  if (!angVel && spinButtonClicked) {
    const finalSector = sectors[getIndex()];
    events.fire("spinEnd", finalSector);
    spinButtonClicked = false; // reset the flag
    return;
  }

  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinEl.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.45);
    spinButtonClicked = true;
  });
}

init();

events.addListener("spinEnd", (sector) => {
  console.log(`Woop! You won ${sector.label}`);
  const resultDiv = document.querySelector("#result");
  const data = document.querySelector("#data");
  resultDiv.textContent = `Article ${sector.label}`;
  data.textContent = `${sector.data}`;
});



