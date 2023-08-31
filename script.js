const table = document.querySelector(".table");
const body = document.querySelector("body");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const finalScore = document.querySelector(".final-score");
const startScreen = document.querySelector(".start-screen");
const restartBtn = document.querySelector(".restart-btn");

const newGameHandler = () => {};

const eatHandler = () => {
  if (currentPosition === randomFoodPos) {
    console.log(showArr);
    setTimeout(() => {
      const newCell = showArr[showArr.length - 1];
      showArr.push(newCell);
    }, speed * (showArr.length - 3));

    const randomFood = document.getElementById(`${randomFoodPos}`);
    randomFood.classList.remove("food");
    randomFoodPos = Math.floor(Math.random() * 400 + 1);
    const randomFoodNew = document.getElementById(`${randomFoodPos}`);
    randomFoodNew.classList.add("food");
  }
};

const directionHandler = (e) => {
  const button = e.key.replace("Arrow", "").toLowerCase();

  if (
    (button === "down" && lastDirection === "up") ||
    (button === "down" && lastDirection === "down")
  ) {
    return;
  } else if (button === "down") {
    direction = "down";
  }
  if (
    (button === "right" && lastDirection === "left") ||
    (button === "right" && lastDirection === "right")
  ) {
    return;
  } else if (button === "right") {
    direction = "right";
  }
  if (
    (button === "left" && lastDirection === "right") ||
    (button === "left" && lastDirection === "left")
  ) {
    return;
  } else if (button === "left") {
    direction = "left";
  }
  if (
    (button === "up" && lastDirection === "down") ||
    (button === "up" && lastDirection === "up")
  ) {
    return;
  } else if (button === "up") {
    direction = "up";
  }
};

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    table.appendChild(cell);
    cell.id = `${i * 20 + j + 1}`;
  }
}

let randomFoodPos = Math.floor(Math.random() * 400 + 1);
const randomFood = document.getElementById(`${randomFoodPos}`);
randomFood.classList.add("food");
let currentPosition = 184;
let showArr = [currentPosition - 2, currentPosition - 1, currentPosition];
let oldArr = [currentPosition - 3, currentPosition - 2, currentPosition - 1];

let direction;
let lastDirection;
let start = false;
let end = false;
let speed = 150;
showArr.forEach((item, index) => {
  const startCell = document.getElementById(`${currentPosition - index}`);
  startCell.classList.add("show");
});

restartBtn.addEventListener("click", () => {
  randomFoodPos = Math.floor(Math.random() * 400 + 1);

  currentPosition = 184;
  showArr = [currentPosition - 2, currentPosition - 1, currentPosition];
  oldArr = [currentPosition - 3, currentPosition - 2, currentPosition - 1];

  direction;
  lastDirection;
  start = false;
  end = false;
  const shows = document.querySelectorAll(".show");
  shows.forEach((cell) => cell.classList.remove("show"));
  const foods = document.querySelector(".food");
  foods.classList.remove("food");
  showArr.forEach((item, index) => {
    const startCell = document.getElementById(`${currentPosition - index}`);
    startCell.classList.add("show");
  });

  console.log(start);
  score.innerHTML = `Score : 0`;
  time.innerHTML = "00 : 00";
  const randomFood = document.getElementById(`${randomFoodPos}`);
  randomFood.classList.add("food");
});

body.addEventListener("keydown", function (e) {
  startScreen.classList.remove("show");
  const startTime = new Date().getTime();
  if (!start) {
    direction = "right";
    const interval = setInterval(() => {
      console.log(start);
      console.log("aaaaa");
      oldArr.map((cell) => {
        const nextCell = document.getElementById(`${cell}`);
        nextCell.classList.remove("show");
      });
      oldArr = showArr;
      lastDirection = direction;
      moveFunction();
      showArr.map((cell) => {
        const nextCell = document.getElementById(`${cell}`);
        nextCell.classList.add("show");
      });
      eatHandler();
      lastDirection = direction;
      if (end) {
        clearInterval(interval);
      }
      score.innerHTML = `Score : ${(showArr.length - 3) * 100}`;
      const pastTime = new Date().getTime() - startTime;
      time.innerHTML = `${
        Math.floor(pastTime / 60000) < 10
          ? `0${Math.floor(pastTime / 60000)}`
          : `${Math.floor(pastTime / 60000)}`
      } : ${
        Math.floor((pastTime / 1000) % 60) < 10
          ? `0${Math.floor((pastTime / 1000) % 60)}`
          : `${Math.floor((pastTime / 1000) % 60)}`
      } `;
      if (Math.floor(pastTime / 1000) / 15 > 1) {
        speed = speed * 0.8;
      }
    }, speed);
  } else {
    directionHandler(e);
  }

  start = true;
});

const leftHandler = (id) => {
  const newCell = id - 1;
  showArr.splice(0, 1);
  showArr.push(newCell);
};

const rightHandler = (id) => {
  const newCell = id + 1;
  showArr.splice(0, 1);
  showArr.push(newCell);
};

const upHandler = (id) => {
  const newCell = id - 20;
  showArr.splice(0, 1);
  showArr.push(newCell);
};

const downHandler = (id) => {
  const newCell = id + 20;
  showArr.splice(0, 1);
  showArr.push(newCell);
};

const moveFunction = (interval) => {
  if (direction === "up") {
    if (Math.floor(currentPosition / 20) === 0) {
      finalScore.classList.add("show");
      end = true;
      return;
    }
    const oldPos = oldArr.slice(0, oldArr.length - 1);
    upHandler(currentPosition);
    const newPos = showArr[showArr.length - 1];
    if (oldPos.includes(newPos)) {
      end = true;
      finalScore.classList.add("show");
    }
    currentPosition = currentPosition - 20;
  } else if (direction === "down") {
    if (Math.floor(currentPosition / 20) === 19) {
      finalScore.classList.add("show");
      clearInterval(interval);
      end = true;
      return;
    }
    const oldPos = oldArr.slice(0, oldArr.length - 1);
    downHandler(currentPosition);
    const newPos = showArr[showArr.length - 1];
    if (oldPos.includes(newPos)) {
      end = true;
      finalScore.classList.add("show");
    }
    currentPosition = currentPosition + 20;
  } else if (direction === "left") {
    if (currentPosition % 20 === 1) {
      finalScore.classList.add("show");
      clearInterval(interval);
      end = true;
      return;
    }
    const oldPos = oldArr.slice(0, oldArr.length - 1);
    leftHandler(currentPosition);
    const newPos = showArr[showArr.length - 1];
    if (oldPos.includes(newPos)) {
      end = true;
      finalScore.classList.add("show");
    }
    currentPosition--;
  } else if (direction === "right") {
    if (currentPosition % 20 === 0) {
      finalScore.classList.add("show");
      clearInterval(interval);
      end = true;
      return;
    } else {
      const oldPos = oldArr.slice(0, oldArr.length - 1);
      rightHandler(currentPosition);
      const newPos = showArr[showArr.length - 1];
      if (oldPos.includes(newPos)) {
        end = true;
        finalScore.classList.add("show");
      }
      currentPosition++;
    }
  }
};
