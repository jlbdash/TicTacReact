import "./styles.css";

// creates a clickable square for the board
export default function Square({ id, value, onSquareClick }) {
    return (
      <button id={id} className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  