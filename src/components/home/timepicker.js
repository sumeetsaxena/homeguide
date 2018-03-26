import React from 'react';

class TimePicker extends React.Component{
    constructor(props){
        super();
        this.onTimeChange=props.onTimeChange;
    }
    onTimeClicked(e)
    {
        console.log(e.target.innerHTML);
        this.onTimeChange(e.target.innerHTML);
    }

    render(){
        const hours=["5 am", "5:30 am", "6 am", "6:30 am", "7 am", "7:30 am", "8 am", "8:30 am", "9 am", "9:30 am", "10 am", "10:30 am", "11 am", "11:30 am", "12 pm", "12:30 pm", "1 pm", "1:30 pm", "2 pm", "2:30 pm", "3 pm", "3:30 pm", "4 pm", "4:30 pm", "5 pm", "5:30 pm", "6 pm", "6:30 pm", "7 pm", "7:30 pm", "8 pm", "8:30 pm"];

        const lis=hours.map(hour => <li key={hour} onClick={this.onTimeClicked.bind(this)}><a className="dropdown-item">{hour}</a></li>);

        return  (<ul className="day-times">
        {lis}
        </ul>);
    }
}

export default TimePicker;