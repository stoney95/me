import {FC} from "react";

import "./Arrow.scss";
import {Point, ArrowDeltas, BezierPoints} from "./types";

interface ArrowViewProps extends React.ClassAttributes<SVGSVGElement> {
    startPoint: Point;
    endPoint: Point;
}

const calculateDeltas = (
    startPoint: Point,
    endPoint: Point,
): ArrowDeltas => {
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
  
    return { dx, dy, absDx, absDy };
};

const calculateControlPoints = ({absDx, absDy, dx, dy}: ArrowDeltas): BezierPoints => {
    let startPointX = 0;
    let startPointY = 0;
    let endPointX = absDx;
    let endPointY = absDy;

    if (dx < 0) [startPointX, endPointX] = [endPointX, startPointX];
    if (dy < 0) [startPointX, endPointX] = [endPointX, startPointX];

    const yFactor = dy / absDy;
    const xFactor = dx / absDx * yFactor;
    let offset = 10;
    const remainingDy = absDy - 2 * offset;
    const minDelta = Math.min(absDx, remainingDy);
    const curveRadius = Math.min(50, minDelta / 2);

    const yGap = absDy - 2 * offset - 2 * curveRadius;
    offset += yGap / 2;

    const p1 = {
        x: startPointX,
        y: startPointY,
    };
    const p2 = {
        x: p1.x,
        y: p1.y + offset,
    }
    const c1 = {
        startPoint: p2,
        radius: curveRadius,
        dx: curveRadius * xFactor,
        dy: curveRadius,
        direction: xFactor > 0 ? 0 : 1
    }
    const p3 = {
        x: p2.x + curveRadius * xFactor,
        y: p2.y + curveRadius,
    };
    const p4 = {
        x: endPointX - curveRadius * xFactor,
        y: endPointY - offset - curveRadius,
    };
    const c2 = {
        startPoint: p4,
        radius: curveRadius,
        dx: curveRadius * xFactor,
        dy: curveRadius,
        direction: xFactor > 0 ? 1 : 0
    }
    const p5 = {
        x: endPointX,
        y: endPointY - offset,
    };
    const p6 = {
        x: endPointX,
        y: endPointY,
    };
  
    return { p1, p2, p3, p4, p5, p6, c1, c2 };
};

const ArrowView: FC<ArrowViewProps> = ({startPoint, endPoint}) => {
    const canvasStartPoint = {
        x: Math.min(startPoint.x, endPoint.x),
        y: Math.min(startPoint.y, endPoint.y),
    };

    const strokeWidth = 1;

    const canvasWidth = Math.abs(endPoint.x - startPoint.x) + strokeWidth * 2;
    const canvasHeight = Math.abs(endPoint.y - startPoint.y);

    const deltas = calculateDeltas(startPoint, endPoint)
    const {p1, p2, p3, p4, p5, p6, c1, c2} = calculateControlPoints(deltas)
    
    return (
        <svg
            width={canvasWidth}
            height={canvasHeight}
            style={{
                backgroundColor: "transparent",
                transform: `translate(${canvasStartPoint.x}px, ${canvasStartPoint.y}px)`,
            }}
            className="arrow"
        >
            <path 
                stroke="black"
                strokeWidth={strokeWidth}
                fill="none"
                d={`
                M ${p1.x}, ${p1.y} L ${p2.x}, ${p2.y} 
                a ${c1.radius},${c1.radius} 0 0,${c1.direction} ${c1.dx}, ${c1.dy}  
                M ${p3.x}, ${p3.y} L ${p4.x}, ${p4.y} 
                a ${c2.radius},${c2.radius} 0 0,${c2.direction} ${c2.dx}, ${c2.dy} 
                M ${p5.x}, ${p5.y} L ${p6.x}, ${p6.y} 
                `} 
            />
        </svg>
    );
}

export default ArrowView;