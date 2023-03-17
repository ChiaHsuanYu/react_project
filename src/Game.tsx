import React from 'react';
import Clock from './Clock';
import './index.css';
// 井字遊戲
// 定義類別
// class Square extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     );
//   }
// }
// 繪製正方形區塊(改為功能function)
function Square(props:any) {
  return (
    <div className="square" style={props.style} onClick={props.onClick}>
      { props.value}
    </div>
  );
}

// 顯示區塊處理
type BoardProps = {
  squares: Array<string>,
  position: number | null,
  onClick: (i: number) => void,
}

class Board extends React.Component<any,BoardProps> {
  renderSquare(i:number) {
    // 若為當前動作位置,則添加文字顏色顯示
    let current_style = '';
    const checkWinner = calculateWinner(this.props.squares)
    current_style = checkWinner && checkWinner.includes(i) ? 'red' : '';
    if(current_style === '' && i === this.props.position){
      current_style = 'rgb(81, 177, 255)';
    }
    return (
      <Square 
        value={this.props.squares[i]} 
        style={{color: current_style}} 
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    const x=3;
    let boardList = [];
    for(let i = 0 ; i < x ; i++){
      let tempArray = [];
      for (let j = 0 ; j < x ; j++) {
        tempArray.push(this.renderSquare(i*x+j));
      }
      boardList.push(
        <div className='board-row'>{tempArray}</div>
      );
    }
    return (
      <div>{boardList}</div>
    );
  }
}

// 井字遊戲
type GameState = {
  history: Array<{
    squares: Array<string>,
    position: number | null,
  }>,
  stepNumber: number,
  xIsNext: boolean,
  sortASC: boolean,
  winner_type?: string,
};
class Game extends React.Component<any, GameState> {
  
  constructor(props:any){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      sortASC: true
    };
  }

  // 玩家點擊動作
  handleClick(i:number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState((state) => ({
      history: history.concat([{
        squares: squares,
        position: i,
      }]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
      winner_type: ''
    }));
  }

  // 更換玩家
  jumpTo(step:number){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  // 更換排序狀態
  doSort(){
    this.setState((state) => ({
      sortASC: !state.sortASC,
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move) => {
      let position = ''
      if(step.position !== null){
        position = '(' + (Math.floor(step.position / 3) + 1) + ',' + ((step.position % 3) + 1) + ')';
      }
      return(
        <Moves
          key={move}
          move={move}
          position={position}
          stepNumber={this.state.stepNumber}
          onClick={() => this.jumpTo(move)}
        /> 
      );
    });

    let status:string;
    if(!current.squares.includes('') && !winner){
      status = '平手'; 
    }else{
      if(winner){
        status = 'Winner:' + winner[0];
      }else{
        status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
      }
    }
    
    return (
      <div className="game">
        <div className="game-clock">
          <Clock />
        </div>
        <div className="game-board">
          <Board 
            squares={current.squares}
            position={current.position} 
            onClick={(i:any) => this.handleClick(i)}
          />
          <SortBtn 
            sortASC={this.state.sortASC}
            onClick={() => this.doSort()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            {this.state.sortASC ? moves : moves.reverse()}
          </ol>
        </div>
      </div>
     
    );
  }
}

// 時空旅行按鈕
type MovesProps = {
  move: number;
  position: string;
  stepNumber: number;
  onClick: () => void;
}
class Moves extends React.Component<MovesProps> {
  render(){
    const desc = this.props.move ? 'GO to move #' + this.props.move : 'Go to game start';
    return(
      <li key={this.props.move}>
        <button 
          onClick={() => this.props.onClick()} 
          style = {this.props.stepNumber === this.props.move ? { fontWeight: 'bold',color: 'red'} : {}}
        >
          {desc + this.props.position}
        </button>
      </li>
    );
  }
}

// 排序時空旅行按鈕
type SortBtnProps = {
  sortASC: boolean;
  onClick: () => void
}
class SortBtn extends React.Component<SortBtnProps> {
  render(){
    return (
      <button onClick={() => this.props.onClick()}>{this.props.sortASC ? 'ASC' : 'DESC'}</button>
    );
  }
}

// 判斷當前輸贏狀態
function calculateWinner(squares:Array<string>) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], a, b, c];
    }
  }
  return null;
}

export default Game;