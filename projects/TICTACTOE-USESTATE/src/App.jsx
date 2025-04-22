import {useState} from "react";
import confetti from 'canvas-confetti'
import {Square} from "./components/Square.jsx"
import {TURNS} from "./constants.js"
import {checkWinnerFrom,checkEndGame} from "./logic/board.js"
import {WinnerModal} from "./components/WinnerModal.jsx"

//la actualizacion del estado es asincrona

function App() {

    const [board,setBoard]= useState(()=>{
        const savedBoard = window.localStorage.getItem('board')

        return savedBoard ? JSON.parse(savedBoard) :
        Array(9).fill(null)
    })

    const [turn,setTurn]= useState(()=>{
        const savedTurn = window.localStorage.getItem('turn')
        return savedTurn ? savedTurn : TURNS.X
    })
    const [winner,setWinner]= useState(null)//null no hay ganador,false empate






    const updateBoard = (index)=>{

        //que no se sobreescriba
        if(board[index] || winner) return;

        //No se debe modificar nunca el estado ni las props
        //actualizar el tablero
        const newBoard = [...board] //spread operator
        newBoard[index]= turn
        setBoard(newBoard)

        //Cambiar turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)

        //guardar partida
        window.localStorage.setItem('board',JSON.stringify(newBoard))
        window.localStorage.setItem('turn',newTurn)

        //comprobar ganador
        const newWinner = checkWinnerFrom(newBoard)
        if(newWinner){
            confetti({particleCount: 100})
            setWinner(newWinner)
        }else if(checkEndGame(newBoard)){
            setWinner(false)
        }
    }

    const resetGame = ()=>{
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }

  return (
      
      <main className="board">
          <h1>Tic tac toe</h1>
          <button onClick={resetGame}>Start Again</button>
          <section className="game">
              {
                board.map((_,index)=>{
                    return(
                      <Square key={index}
                      index={index}
                      updateBoard={updateBoard}>
                          {board[index]}
                      </Square>
                    )
                })
              }
          </section>

          <section className="turn">
              <Square isSelected={turn===TURNS.X}>{TURNS.X}</Square>
              <Square isSelected={turn===TURNS.O}>{TURNS.O}</Square>
          </section>
          <WinnerModal winner={winner} resetGame={resetGame}/>

      </main>
  )
}

export default App
