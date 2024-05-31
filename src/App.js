import { useState } from "react";
import Board from "./Board.js";
import "./styles.css";

// creates the default exportable component
// props sent from Board: square, xIsNext, onPlay(nextSquare, id)
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [toggler, setToggler] = useState(0);

  const [currentId, setCurrentId] = useState([Array(9).fill(null)]);

  const currentSquares = history[currentMove];

  const xIsNext = currentMove % 2 === 0;

  // handles the prop passed up from the Board
  function handlePlay(nextSquare, id) {
    // shows the last and current play
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // shows the position on the grid
    let showID = [];
    if (id < 3) {
      showID = [1, id + 1];
    } else if (id < 6) {
      showID = [2, id - 2];
    } else {
      showID = [3, id - 5];
    }
    const idList = [...currentId.slice(0, currentMove + 1), showID];
    setCurrentId(idList);
    console.log(idList);
  }

  // allows you to go to a specific move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // creates a history button for recording moves
  let moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      for (let h = 0; h < 9; h++) {
        let block = document.getElementById(h);
        block.style.background = "#fff";
      }
      description = "Go to move #" + move + " [" + currentId[move] + "]";
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move + 1}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // toggles direction of moves history list, ascending or descending
  function toggleMoves() {
    if (toggler === 0) {
      setToggler(1);
    } else {
      setToggler(0);
    }
  }
  let rMoves = moves;
  if (toggler === 0) {
    rMoves = moves;
  } else {
    rMoves = moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board square={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>You are at move #{currentMove}</ul>
        <ol>{rMoves}</ol>
        <ul>
          <button onClick={() => toggleMoves(toggler)}>
            Change Moves Order
          </button>
        </ul>
      </div>
    </div>
  );
}
