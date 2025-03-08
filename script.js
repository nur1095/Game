const puzzle = document.getElementById("puzzle");
const resetButton = document.getElementById("resetButton");
const size = 4; // 4x4 puzzle
let tiles = [];

// Initialize the puzzle
function initPuzzle() {
    tiles = Array.from({ length: size * size }, (_, i) => i);
    shuffle(tiles);
    renderPuzzle();
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function renderPuzzle() {
    puzzle.innerHTML = '';
    tiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");
        tileElement.classList.add("tile");
        if (tile === 0) {
            tileElement.classList.add("empty");
        } else {
            tileElement.innerText = tile;
            tileElement.addEventListener("click", () => handleTileClick(index));
        }
        puzzle.appendChild(tileElement);
    });
}


function handleTileClick(index) {
    const emptyIndex = tiles.indexOf(0);
    const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - size, emptyIndex + size];

    if (validMoves.includes(index)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        renderPuzzle();
    }
}

// Reset the puzzle
resetButton.addEventListener("click", initPuzzle);

// Initialize the puzzle on page load
initPuzzle();