import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    //iterate over the winningLines array (all possible win combinations)
    for (let i = 0; i < winningLines.length; i++) {

        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    
    return null;
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.color !== nextProps.color) {
            return true;
        }
        if (this.state.squares !== nextState.squares) {
            return true;
        }
        return false;
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            // if there was a winner return out of handleClick()
            return;
        }

        // update the squares array
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const winner = calculateWinner(squares);

        if(winner) {
            console.log(winner);
        }
        
        // update the application state
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });

        console.log(squares);
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    }
  
    render() {
        // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        const winner = calculateWinner(this.state.squares);
        
        let status;
        if (!this.state.squares.includes(null)){
            status = 'Game Over - No More Moves';
        }else if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
  
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);