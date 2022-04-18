import {FC, RefObject} from "react";
import Project, {ProjectViewProps} from "../Project"
import {Droppable, Draggable} from "react-beautiful-dnd";

import "./DraggableProjects.scss";
import { ArrowRefs } from "../types";

interface DraggableProjectsProps {
    projects: Array<ProjectViewProps>;
    arrowRefs: Map<string, ArrowRefs>;
}

const getProjectStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    width: "fit-content",
    height: "100%",
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "transparent",
  
    // styles we need to apply on draggables
    ...draggableStyle
});

const getDroppableClassName = (isDraggingOver: boolean): string => {
    let className = "d-flex flex-row justify-content-between timeline-droppable";
    if (isDraggingOver) className += " dragging-over";

    return className;
}



const DraggableProject = (project: ProjectViewProps, index: number, ref: RefObject<HTMLDivElement> | undefined) => {
    return <Draggable
        key={project.title}
        draggableId={project.title}
        index={index}
    >
        {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getProjectStyle(
                snapshot.isDragging,
                provided.draggableProps.style
            )}
        >
            {Project(project, ref)}
        </div>
        )}
</Draggable>
}

const DraggableProjectsView: FC<DraggableProjectsProps> = ({projects, arrowRefs}) => {
    return <Droppable key={"top"} droppableId="top" direction="horizontal" isDropDisabled={true}>
        {(provided, snapshot) => (
        <div
            className={getDroppableClassName(snapshot.isDraggingOver)}
            ref={provided.innerRef}
            {...provided.droppableProps}
        >
            {projects.map((project, index) => DraggableProject(project, index, arrowRefs.get(project.title)?.source))}
            {provided.placeholder}
        </div>
        )}
    </Droppable>
}

export default DraggableProjectsView;