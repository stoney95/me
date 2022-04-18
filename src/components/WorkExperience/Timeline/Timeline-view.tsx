import {FC, RefObject} from "react";

import Point from "./Point"

import "./Timeline.scss";


interface TimelineViewProps {
    dates: {
        percentage: number;
        ref?: RefObject<HTMLDivElement>;
    }[];
    years: number[];
    yearPercentage: number;
}

const TimelineView: FC<TimelineViewProps> = ({dates, years, yearPercentage}) => {
    return  <div className="timeline">
        {years.map((year, index) => (
            <div style={{position: "absolute", left: `${yearPercentage * index}%`, transform: "translate(-50%, -5px)"}}>
                <div className="d-flex flex-column align-items-center">
                    <Point big={true}/>
                    <div>{year}</div>
                </div>
            </div>
        ))}
        {dates.map(date => (
            <div style={{position: "absolute", left: `${date.percentage}%`, transform: "translateY(-50%) translateY(1px)"}}>{Point({ref:date.ref})}</div>
        ))}
    </div>
        
}

export default TimelineView;