import React, { createRef, FC, RefObject, useRef, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
} from "react-beautiful-dnd";

import Timeline from "./Timeline";
import DraggableProjects from './DraggableProjects';
import ExtendedProjects from './ExtendedProjects';
import Arrow from './Arrow';

import {WorkExperience, ArrowRefs} from "./types"

interface WorkExperienceProps {
    projects: Array<WorkExperience>
    arrowRefs: Map<string, ArrowRefs> 
}

const compareDates = (date1: {year: number; month: number}, date2: {year: number; month: number;}) => {
    return (date1.year - date2.year) * 100 + (date1.month - date2.month)
}

const WorkExperienceView: FC<WorkExperienceProps> = ({projects: initialProjects, arrowRefs}) => {
    const _projects = new Array<WorkExperience>()
    const _extendedProjects = new Array<WorkExperience>()

    initialProjects.map((project) => {
        project.projectProps.extended ? _extendedProjects.push(project) : _projects.push(project);
    })

    const dates = initialProjects.map((project) => ({
        date: project.date,
        title: project.projectProps.title
    }));

    _projects.sort((a, b) => compareDates(a.date, b.date));
    _extendedProjects.sort((a, b) => compareDates(a.date, b.date));

    const [projects, setProjects] = useState(_projects);
    const [extendedProjects, setExtendedProjects] = useState(_extendedProjects);

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
    
        if (!destination) {
          return;
        }
        const dInd = +destination.droppableId;

        const itemToExtend = projects.splice(source.index, 1)[0];
        const itemToShrink = extendedProjects.splice(dInd, 1)[0];
        itemToExtend.projectProps.extended = true;
        itemToShrink.projectProps.extended = false;

        const newProjects = [...projects]
        const newExtendedProjects = [...extendedProjects]

        newProjects.push(itemToShrink);
        newExtendedProjects.push(itemToExtend);

        newProjects.sort((a, b) => compareDates(a.date, b.date));
        newExtendedProjects.sort((a, b) => compareDates(a.date, b.date));

        setProjects(newProjects);
        setExtendedProjects(newExtendedProjects);
    }

    const projectPropsList = projects.map(project => project.projectProps)
    const extendedProjectPropsList = extendedProjects.map(project => project.projectProps)

    return <div className="d-flex flex-column">
        <DragDropContext onDragEnd={onDragEnd}>
            <DraggableProjects projects={projectPropsList} arrowRefs={arrowRefs}/>
            <Timeline dates={dates} arrowRefs={arrowRefs}/>
            <ExtendedProjects projects={extendedProjectPropsList} arrowRefs={arrowRefs}/>
        </DragDropContext>
        {Array.from(arrowRefs.values()).map(refs => (
            <Arrow 
                source={refs.source}
                target={refs.target}
                // ref={refs.arrow}
            />
        ))}
    </div>
}

export default WorkExperienceView;