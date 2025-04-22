import {WINNING_COMBINATIONS} from "../constants.js"

export const checkWinnerFrom = (boardToCheck)=>{
    for(const combo of WINNING_COMBINATIONS){
        const [a,b,c] = combo
        if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
            return boardToCheck[a]
        }
    }
    return null
}

export const checkEndGame = (newBoard)=>{
    //Esto devuelve true si todos los items son diferentes de null o sea se lleno el tablero y nadie gano
    return newBoard.every((item)=>item!==null)
}
