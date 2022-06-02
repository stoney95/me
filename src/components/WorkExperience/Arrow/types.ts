export type Point = {x: number, y: number};

export type ArrowDeltas = {
    dx: number, 
    dy: number, 
    absDx: number,
    absDy: number
}

export type Curve = {
    radius: number,
    startPoint: Point,
    dx: number,
    dy: number,
    direction: number
}

export type BezierPoints = {
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point,
    p5: Point,
    p6: Point,
    c1: Curve,
    c2: Curve,
}


export type ArrowDefinition = {
    startPoint: Point,
    endPoint: Point,
    setStartPoint: (p: Point) => void,
    setEndPoint: (p: Point) => void,
}


export type setPointState = React.Dispatch<React.SetStateAction<Point>>