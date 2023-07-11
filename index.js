const settings = {
  numCircles: 21,
  duration: 30, // Seconds
  paddingPercentage: 5, // Percent
  initialRadius: 5, // Percent
};

const init = () => {
  const container = document.getElementById("circles-container");
  // const radius = container.offsetWidth / 2;

  const line = document.createElement("div");

  line.classList.add("line");
  line.style.width = `${100 - settings.paddingPercentage}%`;

  container.appendChild(line);

  for (let i = 0; i < settings.numCircles; i++) {
    const circle = document.createElement("div");
    const diameterPercentage =
      settings.initialRadius +
      i *
        ((100 - settings.initialRadius - settings.paddingPercentage) /
          settings.numCircles);

    circle.classList.add("circle");
    circle.style.width = `${diameterPercentage}%`;
    circle.style.height = `${diameterPercentage}%`;

    container.appendChild(circle);
  }
};

init();
