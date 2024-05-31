import "./styles.css";
import Square from "./Square.js";

// creates Board component to tract the plays
// props send from Square: id, value, onSquareClick
export default function Board({ square, xIsNext, onPlay }) {
  // finds next player and id of clicked square
  function handleClick(i, id) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    onPlay(nextSquare, id);
  }

  // status for game
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + square[winner[0]];
    for (let h in winner) {
      let block = document.getElementById(winner[h]);
      block.style.background = "#11ee33";
    }
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
    let place = [];
    let h = 0;
    if (h < square.length) {
      for (h in square) {
        if (square[h] === null) {
          place.pop(1);
        } else {
          place.push(1);
        }
      }
    }
    if (place.length > 8) {
      status = "This is a draw";
    }
  }

  //creates the grid for the board
  let box = [];
  let n = 3;
  let i = 0;
  let x = 0;
  for (i; i < 3; i++) {
    for (x; x < n; x++) {
      let f = x;
      box.push(
        <Square
          id={f}
          value={square[f]}
          onSquareClick={() => handleClick(f, f)}
        />
      );
    }
    box.push(<br />);
    n += 3;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{box}</div>
    </>
  );
}

// finds the winner of the game
function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      let boxes = lines[i];
      return boxes;
    }
  }
  return null;
}
