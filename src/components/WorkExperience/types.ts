import { RefObject } from "react";
import {ArrowContainerHandle} from "./Arrow";
import {ProjectViewProps} from "./Project";
import {type ObserverableDiv} from "./Project/ObserverableDiv";


export type WorkExperience = {
    projectProps: ProjectViewProps;
    date: {
        year: number;
        month: number;
    };
}

export type ProjectState = {
    projectProps: ProjectViewProps;
    ref: RefObject<HTMLDivElement>;
}

export type ArrowRefs = {
    source: RefObject<ObserverableDiv>;
    extendedSource: RefObject<ObserverableDiv>;
    target: RefObject<HTMLDivElement>;
    arrow: RefObject<ArrowContainerHandle>;
}

export const ItemTypes = {
    PROJECT: 'project'
}