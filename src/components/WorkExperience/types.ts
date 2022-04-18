import { RefObject } from "react";
import Arrow from "./Arrow";
import {ProjectViewProps} from "./Project"


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
    source: RefObject<HTMLDivElement>;
    target: RefObject<HTMLDivElement>;
    arrow: RefObject<typeof Arrow>;
}