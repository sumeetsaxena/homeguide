import React from 'react';

class DayPicker extends React.Component{
    constructor(props){
        super();
        this.onTimeChange=props.onTimeChange;
    }
    onDayClicked(e)
    {
        console.log(e.target.innerHTML);
        this.onTimeChange(e.target.innerHTML);
    }

    render(){
        const days=["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const lis=days.map(day => <li key={day} onClick={this.onDayClicked.bind(this)}><a className="dropdown-item">{day}</a></li>);

        return  (<ul className="day-weekdays">
        {lis}
        </ul>);
    }
}

export default DayPicker;