import {FC, useState} from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    type DropResult,
    type DraggableProvided,
    type DraggableStateSnapshot,
    type DroppableProvided,
    type DroppableStateSnapshot,
    type DraggableLocation
} from "react-beautiful-dnd";

import ProjectView from "./Project";
import {ProjectViewProps} from "./Project/Project-view";

import "./Timeline.scss"


interface TimelineProps {
    projects: Array<ProjectViewProps>;
}

const getDroppableClassName = (isDraggingOver: boolean): string => {
    let className = "d-flex flex-row justify-content-between timeline-droppable";
    if (isDraggingOver) className += " dragging-over";

    return className;
}

const getProjectStyle = (isDragging: boolean, draggableStyle: any, draggingOver?: boolean) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    width: "100%",
    height: "100%",
    display: draggingOver ? "none" : "block",
  
    // change background colour if dragging
    // background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });


const Timeline: FC<TimelineProps> = ({projects}) => {
    return (
        <Droppable key={"top"} droppableId="top" direction="horizontal" isDropDisabled={true}>
            {(provided, snapshot) => (
            <div
                className={getDroppableClassName(snapshot.isDraggingOver)}
                ref={provided.innerRef}
                {...provided.droppableProps}
            >
                {projects.map((item, index) => (
                <Draggable
                    key={item.title}
                    draggableId={item.title}
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
                        {ProjectView(item)}
                    </div>
                    )}
                </Draggable>
                ))}
                {provided.placeholder}
            </div>
            )}
        </Droppable>
    )
}

interface ExtendedProjectViewProps {
    props: ProjectViewProps;
    index: number;
}

const ExtendedProject: FC<ExtendedProjectViewProps> = ({props, index}) => {
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
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            droppableSnapshot.isDraggingOver,
                        )}
                    >
                        {ProjectView(props)}
                    </div>
                )}
                </Draggable>
                {/* {provided.placeholder} */}
            </div>
            )}
        </Droppable>
    )
}

export const DragDropHandler: FC<TimelineProps> = ({projects: intialProjects}) => {
    const _projects = new Array<ProjectViewProps>()
    const _extendedProjects = new Array<ProjectViewProps>()

    intialProjects.map((project) => {
        project.extended ? _extendedProjects.push(project) : _projects.push(project);
    })

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
        itemToExtend.extended = true;
        itemToShrink.extended = false;

        const newProjects = [...projects]
        const newExtendedProjects = [...extendedProjects]

        newProjects.push(itemToShrink);
        newExtendedProjects.push(itemToExtend);

        setProjects(newProjects);
        setExtendedProjects(newExtendedProjects);
    }


    return (
        <div className="d-flex flex-column">
          <DragDropContext onDragEnd={onDragEnd}>
            
            <div className="d-flex flex-row">
                <Timeline projects={projects} />
            </div>
            <div className="d-flex flex-row">
                {extendedProjects.map((project, index) => 
                <ExtendedProject props={project} index={index}/>)}
            </div>
          </DragDropContext>
        </div>
    );
}