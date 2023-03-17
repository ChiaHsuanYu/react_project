
import React from 'react';

// 繪製當下時間區塊
class Clock extends React.Component {
    
    timerID:any;
    constructor(props:any){
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount(){
        this.timerID = setInterval(
        () => this.tick(),
        1000
        );
    }

    componentWillInmount(){
        clearInterval(this.timerID);
    }

    tick(){
        this.setState({
            date: new Date()
        });
    }

    render(){
        return (
        <div>
            <h1>Hello,world!</h1>
            {/* <FormattedDate date={this.state.date} /> */}
        </div>
        )
    }
}

function FormattedDate(props:any) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

export default Clock;