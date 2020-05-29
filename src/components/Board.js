import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
    const initialState = Array(9).fill(null);
    const [squares, setSquares] = useState(initialState);
    const [player, setPlayer] = useState("X");
    const [alert, setAlert] = useState({
        type: "",
        message: "",
    });

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    };

    const showAlert = (msg, type) => {
        setAlert({
            type,
            message: msg,
        });
        setTimeout(() => {
            setAlert({ type: "", message: "" });
        }, 5000);
    };

    const checkDraw = () => {
        return squares.every((element) => element);
    };

    const checkWinner = () => {
        const combines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < combines.length; i++) {
            const [a, b, c] = combines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a];
            }
        }
        return null;
    };

    const switchPlayer = (player) => {
        setPlayer(player === "X" ? "O" : "X");
    };

    const handleClickResetGame = () => {
        setSquares(initialState);
        setPlayer("X");
    };

    const handleClick = (i) => {
        if (checkWinner() || checkDraw()) {
            return;
        }

        if (squares[i]) {
            showAlert("Please choose another square!", "danger");
        } else {
            squares[i] = player;
            setSquares([...squares]);
            if (checkWinner()) {
                showAlert(`Player ${player} win!`, "success");
            } else if (checkDraw()) {
                showAlert("Draw!", "primary");
            }
            switchPlayer(player);
        }
    };

    return (
        <>
            {alert && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <h1>Tic Tac Toe</h1>
            <p className="next-player">Next player : {player}</p>
            <div className="board">
                <div className="square-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="square-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="square-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <div className="buttons">
                <button onClick={handleClickResetGame}>Reset</button>
            </div>
        </>
    );
};

export default Board;
