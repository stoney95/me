import {FC, RefObject} from "react";

import "./Point.scss";

interface PointProps {
    ref?: RefObject<HTMLDivElement>
    big?: boolean;
}

const PointView: FC<PointProps> = ({big, ref}) => {
    let classNameAddition = ""
    if (big) classNameAddition = " big "

    return <div className={"timeline-point-container + " + classNameAddition}>
        <div className={"outer-timeline-point"}>
            <div ref={ref} className={"inner-timeline-point"}/>
        </div>
    </div>
}

export default PointView;