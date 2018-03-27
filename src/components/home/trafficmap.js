import React from 'react';
import { inject,observer } from "mobx-react"


class TrafficMap extends React.Component{
    constructor(props){
        super();
        this.state={
            traffic_map:props.traffic_map
        }
    }

    render(){
        if (this.props.traffic_map==="" || this.props.traffic_map===null)
            return <span/>;
        const traffic_map=this.props.traffic_map;

        console.log("traffic_map : "+JSON.stringify(traffic_map));

        const theadings=this.props.LocationStore.destinations.map(loc=> <th key={loc.id} scope="col">{loc.title}</th>);
        const theader=(<thead>
            <tr>
                <th scope="col">&nbsp;</th>
                {theadings}
            </tr>
            </thead>);
        const trows = traffic_map.rows.map( (row,idx) => {
            const tdata=row.elements.map((element,idx) => {
                return <td key={idx}>{element.distance.text}<br/>{element.duration.text}</td>;
            });
            return <tr key={this.props.LocationStore.homes[idx].id}><th>{this.props.LocationStore.homes[idx].title}</th>{tdata}</tr>;
        });

        return <table className="table text-left">{theader}<tbody>
        {trows}</tbody>
        </table>;
    }
}

export default inject("LocationStore")(observer(TrafficMap));