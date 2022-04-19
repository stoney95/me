import {FC, RefObject} from "react";
import Project, {ProjectViewProps} from "../Project";
import {ObserverableDiv} from "../Project/ObserverableDiv";
import {Droppable, Draggable} from "react-beautiful-dnd";

import "./ExtendedProjects.scss";
import { ArrowRefs } from "../types";

interface ExtendedProjectsProps {
    projects: Array<ProjectViewProps>;
    arrowRefs: Map<string, ArrowRefs>;
}

const getProjectStyle = (draggableStyle: any, draggingOver?: boolean) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    width: "100%",
    height: "100%",
    display: draggingOver ? "none" : "block",
  
    ...draggableStyle
});

const getDroppableClassName = (isDraggingOver: boolean): string => {
    let className = "d-flex flex-row justify-content-between extended-droppable";
    if (isDraggingOver) className += " dragging-over";

    return className;
}

const ExtendedProject = (props: ProjectViewProps, index: number, ref: RefObject<ObserverableDiv> | undefined) => {
    return (
        <Droppable key={index} droppableId={`${index}`}>
            {(provided, droppableSnapshot) => (
            <div
                className={getDroppableClassName(droppableSnapshot.isDraggingOver)}
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                <Draggable
                    key={props.title}
                    draggableId={props.title}
                    index={0}
                    isDragDisabled={true}
                >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getProjectStyle(
                            provided.draggableProps.style,
                            droppableSnapshot.isDraggingOver,
                        )}
                    >
                        {Project(props, ref)}
                    </div>
                )}
                </Draggable>
                {provided.placeholder}
            </div>
            )}
        </Droppable>
    )
}

const ExtendedProjectsView: FC<ExtendedProjectsProps> = ({projects, arrowRefs}) => {
    const ref = (project: ProjectViewProps) => arrowRefs.get(project.title)?.source

    return <div className="d-flex flex-row justify-content-between">
        {projects.map((project, index) => 
        ExtendedProject(project, index, ref(project)))}
    </div>
}

export default ExtendedProjectsView;