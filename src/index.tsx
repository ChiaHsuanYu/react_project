import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App.tsx';
// // import reportWebVitals from './reportWebVitals.tsx';
// // import { exit } from 'process';

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// // reportWebVitals();

// // 井字遊戲
// // 定義類別
// // class Square extends React.Component {
// //   render() {
// //     return (
// //       <button
// //         className="square"
// //         onClick={() => this.props.onClick()}
// //       >
// //         {this.props.value}
// //       </button>
// //     );
// //   }
// // }
// // 繪製正方形區塊(改為功能function)
// function Square(props){
//   return (
//     <div className="square" style={props.style} onClick={props.onClick}>
//       { props.value}
//     </div>
//   );
// }

// // 顯示區塊處理
// class Board extends React.Component {
//   renderSquare(i) {
//     // 若為當前動作位置,則添加文字顏色顯示
//     let current_style = '';
//     const checkWinner = calculateWinner(this.props.squares)
//     current_style = checkWinner && checkWinner.includes(i) ? 'red' : '';
//     if(current_style === '' && i === this.props.position){
//       current_style = 'blue';
//     }
//     return (
//       <Square 
//         value={this.props.squares[i]} 
//         style={{color: current_style}} 
//         onClick={() => this.props.onClick(i)} 
//       />
//     );
//   }

//   render() {
//     const x=3;
//     let boardList = [];
//     for(let i = 0 ; i < x ; i++){
//       let tempArray = [];
//       for (let j = 0 ; j < x ; j++) {
//         tempArray.push(this.renderSquare(i*x+j));
//       }
//       boardList.push(
//         <div className='board-row'>{tempArray}</div>
//       );
//     }
//     return (
//       <div>{boardList}</div>
//     );
//   }
// }

// // 井字遊戲
// class Game extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       history: [{
//         squares: Array(9).fill(null),
//         position: null,
//       }],
//       stepNumber: 0,
//       xIsNext: true,
//       sortASC: true
//     };
//   }

//   // 玩家點擊動作
//   handleClick(i) {
//     const history = this.state.history.slice(0, this.state.stepNumber + 1);
//     const current = history[history.length - 1];
//     const squares = current.squares.slice();
//     if(calculateWinner(squares) || squares[i]){
//       return;
//     }
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState((state) => ({
//       history: history.concat([{
//         squares: squares,
//         position: i,
//       }]),
//       stepNumber: history.length,
//       xIsNext: !state.xIsNext,
//       winner_type: ''
//     }));
//   }

//   // 更換玩家
//   jumpTo(step){
//     this.setState({
//       stepNumber: step,
//       xIsNext: (step % 2) === 0,
//     });
//   }

//   // 更換排序狀態
//   doSort(){
//     this.setState((state) => ({
//       sortASC: !state.sortASC,
//     }));
//   }

//   render() {
//     const history = this.state.history;
//     const current = history[this.state.stepNumber];
//     const winner = calculateWinner(current.squares);
//     const moves = history.map((step,move) => {
//       let position = ''
//       if(step.position !== null){
//         position = '(' + (Math.floor(step.position / 3) + 1) + ',' + ((step.position % 3) + 1) + ')';
//       }
//       return(
//         <Moves
//           key={move}
//           move={move}
//           position={position}
//           stepNumber={this.state.stepNumber}
//           onClick={() => this.jumpTo(move)}
//         /> 
//       );
//     });

//     let status;
//     if(!current.squares.includes(null) && !winner){
//       status = '平手'; 
//     }else{
//       if(winner){
//         status = 'Winner:' + winner[0];
//       }else{
//         status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
//       }
//     }
    
//     return (
//       <div className="game">
//         <div className="game-clock">
//           <Clock />
//         </div>
//         <div className="game-board">
//           <Board 
//             squares={current.squares}
//             position={current.position} 
//             onClick={(i) => this.handleClick(i)}
//           />
//           <SortBtn 
//             sortASC={this.state.sortASC}
//             onClick={() => this.doSort()}
//           />
//         </div>
//         <div className="game-info">
//           <div>{status}</div>
//           <ol>
//             {this.state.sortASC ? moves : moves.reverse()}
//           </ol>
//         </div>
//       </div>
     
//     );
//   }
// }

// // 時空旅行按鈕
// class Moves extends React.Component {
//   render(){
//     const desc = this.props.move ? 'GO to move #' + this.props.move : 'Go to game start';
//     return(
//       <li key={this.props.move}>
//         <button 
//           onClick={() => this.props.onClick()} 
//           style = {this.props.stepNumber === this.props.move ? { fontWeight: 'bold',color: 'red'} : {}}
//         >
//           {desc + this.props.position}
//         </button>
//       </li>
//     );
//   }
// }

// // 排序時空旅行按鈕
// class SortBtn extends React.Component {
//   render(){
//     return (
//       <button onClick={() => this.props.onClick()}>{this.props.sortASC ? 'ASC' : 'DESC'}</button>
//     );
//   }
// }

// // 繪製當下時間區塊
// class Clock extends React.Component {

//   constructor(props){
//     super(props);
//     this.state = {date: new Date()};
//   }

//   componentDidMount(){
//     this.timerID = setInterval(
//       () => this.tick(),
//       1000
//     );
//   }

//   componentWillInmount(){
//     clearInterval(this.timerID);
//   }

//   tick(){
//     this.setState({
//       date: new Date()
//     });
//   }

//   render(){
//     return (
//       <div>
//         <h1>Hello,world!</h1>
//         <FormattedDate date={this.state.date} />
//       </div>
//     )
//   }
// }

// function FormattedDate(props) {
//   return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
// }

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class Temperatureinput extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}



class Test extends React.Component{
  
}
class Calculator extends React.Component{
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }
  
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <Temperatureinput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <Temperatureinput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

// // ========================================

const root_2 = ReactDOM.createRoot(document.getElementById("root"));
root_2.render(<Calculator />);

// // 判斷當前輸贏狀態
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return [squares[a], a, b, c];
//     }
//   }
//   return null;
// }
