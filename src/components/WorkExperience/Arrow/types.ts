export type Point = {x: number, y: number};

export type ArrowDeltas = {
    dx: number, 
    dy: number, 
    absDx: number,
    absDy: number
}

export type BezierPoints = {
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point,
    p5: Point,
}


export type ArrowDefinition = {
    startPoint: Point,
    endPoint: Point,
    setStartPoint: (p: Point) => void,
    setEndPoint: (p: Point) => void,
}


export type setPointState = React.Dispatch<React.SetStateAction<Point>>