import './App.css';
import { useState } from 'react';

// CHILD
function Square({ value, onSquareClick }) { //adding onSquareClick funn to the Square component’s props
  // const [value, setValue] = useState(null);//WE LIFT THIS is UP in parent com as 
  // function handleClick(){
  //   setValue("X");
  // }
  return (
    <>
      <button className='square' onClick={onSquareClick}>
        {value}
      </button>
    </>
  )
}

// PARENT
export default function App() {
  const [xisNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));


  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) { //If the square is already filled, you will return
      return;       //before it tries to update the board state.
    }
    // update the squares array holding your board’s state:
    const nextSquares = squares.slice();//nextSquares is shallow copy of squares array[allows us to make changes without modifying the original state]
    if (xisNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    // Update the 'nextSquares' array at index 'i' to "X".
    setSquares(nextSquares);//to update the state of the 'squares' with 'nextSquares'. This triggers a re-render of the component, and the updated state is reflected in the UI.
    setXIsNext(!xisNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is:" + winner;
  }
  else {
    status = "Next Player: " + (xisNext ? "X" : "O");
  }


  return (
    <>
      {winner ? <h1 className='status'>{status}</h1> : <div className='status'>{status}</div>}
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];//destructuring assignment to extract the values at indices a, b, and c from the lines array.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}


