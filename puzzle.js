// Color Swap Puzzle
function createColorSwapPuzzle() {
  const puzzleContainer = document.getElementById("puzzle-container");
  const resetButtonSwap = document.getElementById("reset-button-swap");
  puzzleContainer.innerHTML = "";

  const gridSize = 11;

  let pieces = Array.from({ length: gridSize }, (_, i) => {
    if (i < 5) return "FireBrick";
    if (i > 5) return "#ffcc00";
    return "placeholder"; //
  });

  function createPuzzleElements() {
    puzzleContainer.innerHTML = "";

    pieces.forEach((color, index) => {
      const cell = document.createElement("div");
      cell.className = "puzzle-cell";
      cell.style.width = "45px";
      cell.style.height = "60px";
      cell.style.borderRadius = "10px";
      cell.style.backgroundColor = color === "placeholder" ? "#e8e8e8" : "#4a4a4a";
      cell.style.display = "flex";
      cell.style.flexDirection = "column";
      cell.style.justifyContent = "flex-start";
      cell.style.alignItems = "center";
      cell.style.cursor = color === "placeholder" ? "default" : "pointer";
      cell.style.margin = "5px";

      const topSection = document.createElement("div");
      topSection.style.width = "100%";
      topSection.style.height = "25%"; // 上部1/4
      topSection.style.borderTopLeftRadius = "10px";
      topSection.style.borderTopRightRadius = "10px";
      topSection.style.backgroundColor = color === "placeholder" ? "transparent" : color;

      cell.appendChild(topSection);
      cell.dataset.index = index;
      cell.dataset.color = color || "placeholder";
      cell.addEventListener("click", () => movePiece(index));
      puzzleContainer.appendChild(cell);

      cell.addEventListener("click", () => movePiece(index));
    });
  }

  function movePiece(index) {
    const emptyCellIndex = pieces.indexOf("placeholder");
    const direction = index < emptyCellIndex ? 1 : -1;

    if (Math.abs(index - emptyCellIndex) === 1 || Math.abs(index - emptyCellIndex) === 2) {
      const color = pieces[index];
      if ((color === "FireBrick" && direction === 1) || (color === "#ffcc00" && direction === -1)) {
        pieces[emptyCellIndex] = color;
        pieces[index] = "placeholder";
        render();
        checkCompletion();
      }
    }
  }

  function render() {
    Array.from(puzzleContainer.children).forEach((cell, index) => {
      const color = pieces[index];
      const topSection = cell.querySelector("div");

      if (color === "placeholder") {
        cell.style.backgroundColor = "#e8e8e8";
        topSection.style.backgroundColor = "transparent";
      } else {
        cell.style.backgroundColor = "#4a4a4a";
        topSection.style.backgroundColor = color;
      }
      cell.style.cursor = color === "placeholder" ? "default" : "pointer";
    });
  }

  function checkCompletion() {
    const leftColors = pieces.slice(0, 5);
    const rightColors = pieces.slice(6);
    if (leftColors.every((c) => c === "#ffcc00") && rightColors.every((c) => c === "FireBrick")) {
      startConfetti(); // 成功時に紙吹雪を表示
    }
  }

  resetButtonSwap.addEventListener("click", () => {
    console.log("reset button swap");
    pieces = Array.from({ length: gridSize }, (_, i) => {
      if (i < 5) return "FireBrick";
      if (i > 5) return "#ffcc00";
      return "placeholder";
    });
    console.log('reset button clicked');

    createPuzzleElements(); // 初期描画
  });

  createPuzzleElements(); // 初期描画

}
// ---------------------------------------------------------------
function startConfetti() {

  const confettiContainer = document.getElementById("confetti-container");
  confettiContainer.innerHTML = "";
  confettiContainer.style.display = "block";

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.position = "absolute";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `${Math.random() * -100}px`;
    confetti.style.opacity = "0.8";
    confetti.style.animation = `fall ${3 + Math.random() * 2}s linear infinite`;
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.innerHTML = "";
    confettiContainer.style.display = "none";
  }, 5000);
}

function getRandomColor() {
  const colors = ["#ffcc00", "FireBrick", "#4a4a4a", "#e8e8e8"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ---------------------------------------------------------------

const style = document.createElement("style");
style.innerHTML = `
    @keyframes fall {
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
document.head.appendChild(style);

// ---------------------------------------------------------------

