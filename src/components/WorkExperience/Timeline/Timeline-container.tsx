import {FC, RefObject} from 'react';
import { ArrowRefs } from '../types';

import {default as TimelineView} from "./Timeline-view";

interface TimelineProps {
    dates: Array<{
        date: {
            year: number;
            month: number;
        };
        title: string;
    }>;
    
    arrowRefs: Map<string, ArrowRefs>;
}

const range = (min: number, max: number) => [...Array.from(Array(max - min + 1).keys())].map(i => i + min);

const TimelineContainer: FC<TimelineProps> = ({dates, arrowRefs}) => {
    const years = dates.map(date => date.date.year);
    const maxYear = Math.max(...years) + 1;
    const minYear = Math.min(...years)

    const yearRange = range(minYear, maxYear);
    const yearPercentage = 100 / (yearRange.length - 1);
    const monthPercent = 100 / (13 * (yearRange.length - 1));

    const datesPercentage = dates.map(date => {
        const yearIndex = yearRange.indexOf(date.date.year);
        return {
            percentage: yearPercentage * yearIndex + monthPercent * date.date.month,
            ref: arrowRefs.get(date.title)?.target
        }
    })


    return (<TimelineView dates={datesPercentage} years={yearRange} yearPercentage={yearPercentage}/>)
}

export default TimelineContainer;