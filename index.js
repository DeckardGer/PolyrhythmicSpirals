// 48 - numCircles
// 120 - timeToReset

const settings = {
  numCircles: 21,
  paddingPercentage: 5, // Percent
  initialRadius: 10, // Percent
  ballSize: 7, // Pixels
  lineWidth: 1, // Pixels
  initialStartAngle: Math.PI, // Radians
  largestNumberOfLoops: 50,
  timeToReset: 900, // Seconds
  logoScale: 2.5, // Percent
};

let timesCrossed;
let audioFiles;

const drawPoint = (circle, point, angle) => {
  const arcRaidus = (circle.clientWidth - settings.lineWidth) / 2;

  const x = arcRaidus * Math.cos(angle);
  const y = -(arcRaidus * Math.sin(angle));

  point.style.left = `${
    ((circle.clientWidth / 2 + x) / circle.clientWidth) * 100
  }%`;
  point.style.top = `${
    ((circle.clientWidth / 2 + y) / circle.clientWidth) * 100
  }%`;
};

const init = () => {
  const container = document.getElementById("circles-container");

  for (let i = 0; i < settings.numCircles; i++) {
    const circleContainer = document.createElement("div");
    circleContainer.classList.add("circle-container");
    circleContainer.setAttribute("id", `circle-${i + 1}`);

    const circle = document.createElement("div");
    const diameterPercentage =
      settings.initialRadius +
      i *
        ((100 - settings.initialRadius - settings.paddingPercentage) /
          settings.numCircles);

    circle.classList.add("circle");
    circle.setAttribute("id", `circle-arc-${i + 1}`);
    circleContainer.style.width = `${diameterPercentage}%`;
    circleContainer.style.height = `${diameterPercentage}%`;
    circleContainer.style.setProperty(
      "--line-thickness",
      `${settings.lineWidth}px`
    );

    const point = document.createElement("div");
    point.classList.add("point");
    point.setAttribute("id", `point-${i + 1}`);

    point.style.width = `${settings.ballSize}px`;
    point.style.height = `${settings.ballSize}px`;

    const musicPointLeft = document.createElement("div");
    const musicPointRight = document.createElement("div");
    musicPointLeft.classList.add("musicPoint");
    musicPointRight.classList.add("musicPoint");
    musicPointLeft.setAttribute("id", `musicPoint-${i + 1}`);
    musicPointRight.setAttribute("id", `musicPoint-${i + 1}`);

    musicPointLeft.style.width = `${(settings.ballSize * 3) / 4}px`;
    musicPointRight.style.width = `${(settings.ballSize * 3) / 4}px`;
    musicPointLeft.style.height = `${(settings.ballSize * 3) / 4}px`;
    musicPointRight.style.height = `${(settings.ballSize * 3) / 4}px`;
    musicPointLeft.style.transform = "translate(-50%, 0)";
    musicPointRight.style.transform = "translate(50%, 0)";
    musicPointLeft.style.left = `${0}px`;
    musicPointRight.style.right = `${0}px`;

    circleContainer.appendChild(circle);
    circleContainer.appendChild(point);
    circleContainer.appendChild(musicPointLeft);
    circleContainer.appendChild(musicPointRight);
    container.appendChild(circleContainer);

    timesCrossed = new Array(parseInt(numCirclesSlider.max)).fill(1);

    drawPoint(circleContainer, point, settings.initialStartAngle);
  }

  if (settings.numCircles <= 21) {
    audioFiles = new Array(settings.numCircles);

    for (i = 0; i < settings.numCircles; i++) {
      const audio = new Audio(`/audio/${i + 1}.mp3`);
      audio.volume = 0.5;

      audioFiles[i] = audio;
    }
  }
};

let startTime = new Date().getTime();
let drawReq;

const draw = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  const fullLoop = 2 * Math.PI;

  for (i = 0; i < settings.numCircles; i++) {
    const circle = document.getElementById(`circle-${i + 1}`);
    const point = document.getElementById(`point-${i + 1}`);

    const numberOfLoops = settings.largestNumberOfLoops - i;
    const velocity = (fullLoop * numberOfLoops) / settings.timeToReset;

    const time = Math.PI / velocity;

    if (elapsedTime >= Math.abs(timesCrossed[i] * time)) {
      timesCrossed[i] += 1;

      if (settings.numCircles >= 21) {
        // audioFiles[i].play();
      }

      const circleArc = document.getElementById(`circle-arc-${i + 1}`);
      const musicPoints = document.querySelectorAll(`#musicPoint-${i + 1}`);

      circleArc.classList.add("noteHit");
      musicPoints.forEach((musicPoint) => musicPoint.classList.add("noteHit"));

      setTimeout(() => {
        circleArc.classList.remove("noteHit");
        musicPoints.forEach((musicPoint) =>
          musicPoint.classList.remove("noteHit")
        );
      }, 1);
    }

    drawPoint(
      circle,
      point,
      settings.initialStartAngle - velocity * elapsedTime
    );
  }

  drawReq = requestAnimationFrame(draw);
};

const setFontSize = () => {
  const circleContainer = document.getElementById("circles-container");
  const developerLogo = document.getElementById("developer-logo");

  const fontSize = (circleContainer.clientWidth * settings.logoScale) / 100;

  developerLogo.style.fontSize = fontSize + "px";
};

window.addEventListener("resize", setFontSize);

const settingsBtn = document.querySelector(".settings");
const settingsContainer = document.querySelector(".settings-container");

settingsBtn.addEventListener("click", () => {
  settingsBtn.classList.toggle("active");
  settingsContainer.classList.toggle("active");
});

window.addEventListener("click", (event) => {
  if (
    !(
      settingsContainer.contains(event.target) ||
      settingsBtn.contains(event.target)
    )
  ) {
    settingsBtn.classList.remove("active");
    settingsContainer.classList.remove("active");
  }
});

const numCirclesSlider = document.getElementById("numCircles");
const largestNumberOfLoopsSlider = document.getElementById(
  "largestNumberOfLoops"
);
const timeToResetSlider = document.getElementById("timeToReset");

numCirclesSlider.oninput = function () {
  window.cancelAnimationFrame(drawReq);
  settings.numCircles = this.value;

  document
    .querySelectorAll(".circle-container")
    .forEach((circle) => circle.remove());
  init();
  draw();
};

largestNumberOfLoopsSlider.oninput = function () {
  window.cancelAnimationFrame(drawReq);
  settings.largestNumberOfLoops = this.value;

  document
    .querySelectorAll(".circle-container")
    .forEach((circle) => circle.remove());
  init();
  draw();
};

timeToResetSlider.oninput = function () {
  window.cancelAnimationFrame(drawReq);
  settings.timeToReset = this.value;

  document
    .querySelectorAll(".circle-container")
    .forEach((circle) => circle.remove());
  init();
  draw();
};

init();
draw();
setFontSize();
