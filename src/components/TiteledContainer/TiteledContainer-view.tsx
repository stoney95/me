import {FC} from "react";

import "./TiteledContainer.scss";

interface ITiteledContainer {
    title: string;
}

const ContainerView: FC<ITiteledContainer> = ({title, children}) => {
    return <div className="titeled-container">
        {children}
        <div className="titeled-container-title">
            {title}
        </div>
    </div>
}

export default ContainerView;