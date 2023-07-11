const settings = {
  numCircles: 21,
  duration: 30, // Seconds
  paddingPercentage: 5, // Percent
  initialRadius: 10, // Percent
  ballSize: 6, // Pixels
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

    circleContainer.appendChild(circle);
    container.appendChild(circleContainer);
  }
};

const draw = () => {
  const container = document.getElementById("points-container");

  const point = document.createElement("div");
  point.classList.add("point");
  point.style.width = `${settings.ballSize}px`;
  point.style.height = `${settings.ballSize}px`;

  const arcRaidus =
    document.getElementById("circles-container").children[2].offsetWidth;

  const x = arcRaidus * Math.cos(Math.PI);
  const y = arcRaidus * Math.sin(Math.PI);

  // point.style.left = `${x}px`;
  // point.style.top = `${y}px`;

  console.log(x, y);
  console.log(Math.cos(Math.PI), Math.sin(Math.PI));

  container.appendChild(point);
};

init();
draw();
