const settings = {
  numCircles: 21,
  duration: 30, // Seconds
  paddingPercentage: 5, // Percent
  initialRadius: 10, // Percent
  ballSize: 7, // Pixels
  lineWidth: 1, // Pixels
  initialStartAngle: Math.PI, // Radians
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

    circleContainer.appendChild(circle);
    container.appendChild(circleContainer);
  }

  for (let i = 0; i < 1; i++) {
    const circle = document.getElementById("circle-1");

    const point = document.createElement("div");
    point.classList.add("point");
    point.setAttribute("id", `point-${i + 1}`);
    point.style.width = `${settings.ballSize}px`;
    point.style.height = `${settings.ballSize}px`;

    drawPoint(circle, point, settings.initialStartAngle);

    circle.appendChild(point);
  }
};

let startTime = new Date().getTime();

const draw = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 1000;

  const circle = document.getElementById("circle-1");
  const point = document.getElementById("point-1");

  const velocity = 1;

  drawPoint(circle, point, settings.initialRadius - elapsedTime * velocity);

  console.log(elapsedTime);

  requestAnimationFrame(draw);
};

init();
draw();
