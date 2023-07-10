const settings = {
  numCircles: 21,
  duration: 30, // In seconds
  initialRadius: 5, // In percentage
};

const largestCircleSize = 200;

const init = () => {
  const container = document.getElementById("circles-container");
  const radius = container.offsetWidth / 2;

  for (let i = 0; i < settings.numCircles; i++) {
    const circle = document.createElement("div");
    const diameterPercentage =
      settings.initialRadius +
      i * ((100 - settings.initialRadius) / settings.numCircles);

    console.log(diameterPercentage);
    circle.classList.add("circle");
    circle.style.width = `${diameterPercentage}%`;
    circle.style.height = `${diameterPercentage}%`;

    container.appendChild(circle);
  }
};

init();
