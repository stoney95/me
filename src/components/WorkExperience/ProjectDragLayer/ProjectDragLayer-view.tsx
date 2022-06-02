import {FC, useEffect, useState} from "react";
import { XYCoord } from "react-dnd";
import { useDragLayer } from "react-dnd";
import { ItemTypes } from "../types";
import AnimatedProject from "../AnimatedProject"
import useMousePosition from "../../../hooks/useMousePosition"
import usePrevious from "../../../hooks/usePrevious"

import "./ProjectDragLayer.scss";

var lastMousePosition: XYCoord | null = null;


function calculatePosition(initialOffset: XYCoord, currentOffset: XYCoord, mousePosition: XYCoord) {
    if (lastMousePosition === null) {
        lastMousePosition = mousePosition;
    }

    const mouseDelta = {
        x: lastMousePosition.x - initialOffset.x,
        y: lastMousePosition.y - initialOffset.y
    }

    const x = currentOffset.x + mouseDelta.x;
    const y = currentOffset.y + mouseDelta.y;

    return { x: x, y: y };
}

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    mousePosition: XYCoord
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    const {x, y} = calculatePosition(initialOffset, currentOffset, mousePosition)
    
    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

const ProjectDragLayerView: FC = () => {
    const mousePosition = useMousePosition()

    const {item, initialOffset, currentOffset, isDragging, clientOffset} = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
        clientOffset: monitor.getClientOffset()
    }));

    
    if (!isDragging) {
        lastMousePosition = null;
        return null
    }

    const style = getItemStyles(initialOffset, currentOffset, mousePosition)
    return <div className="drag-layer-container" style={style}>
        <AnimatedProject {...item}/>
    </div>
}

export default ProjectDragLayerView;