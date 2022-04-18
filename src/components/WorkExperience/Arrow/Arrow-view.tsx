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

    const fixedLineInflectionConstant = Math.min(50, absDy);
  
    const p1 = {
        x: startPointX,
        y: startPointY,
    };
    const p2 = {
        x: startPointX,
        y: endPointY - fixedLineInflectionConstant,
    }
    const p3 = {
        x: startPointX,
        y: endPointY,
    };
    const p4 = {
        x: endPointX,
        y: endPointY - fixedLineInflectionConstant,
    };
    const p5 = {
        x: endPointX,
        y: endPointY,
    };
  
    return { p1, p2, p3, p4, p5 };
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
    const {p1, p2, p3, p4, p5} = calculateControlPoints(deltas)
    
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
                M 
                    ${p1.x + strokeWidth}, ${p1.y} 
                    ${p2.x + strokeWidth}, ${p2.y} 
                C 
                    ${p3.x + strokeWidth}, ${p3.y} 
                    ${p4.x + strokeWidth}, ${p4.y} 
                    ${p5.x + strokeWidth}, ${p5.y} 
                `} 
            />
        </svg>
    );
}

export default ArrowView;