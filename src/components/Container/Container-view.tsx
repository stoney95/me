import {FC} from "react";

import "./Container.scss";

const ContainerView: FC = ({children}) => {
    return (
        <div className="container">
            {children}
        </div>
    )
}

export default ContainerView;