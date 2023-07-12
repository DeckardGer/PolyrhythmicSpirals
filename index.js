const settings = {
  numCircles: 21,
  duration: 30, // Seconds
  paddingPercentage: 5, // Percent
  initialRadius: 10, // Percent
  ballSize: 7, // Pixels
  lineWidth: 1, // Pixels
  initialStartAngle: Math.PI, // Radians
  largestNumberOfLoops: 50,
  timeToReset: 900, // Seconds
};

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

    drawPoint(circleContainer, point, settings.initialStartAngle);
  }
};

let startTime = new Date().getTime();

const draw = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  const fullLoop = 2 * Math.PI;

  for (i = 0; i < settings.numCircles; i++) {
    const circle = document.getElementById(`circle-${i + 1}`);
    const point = document.getElementById(`point-${i + 1}`);

    const numberOfLoops = settings.largestNumberOfLoops - i;
    const velocity = (fullLoop * numberOfLoops) / settings.timeToReset;

    drawPoint(
      circle,
      point,
      settings.initialStartAngle - velocity * elapsedTime
    );
  }

  requestAnimationFrame(draw);
};

init();
draw();
