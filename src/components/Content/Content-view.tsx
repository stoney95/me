import {FC} from "react";

import "./Content.scss";

const ContentView: FC = ({children}) => {
    return <div className="content">
        {children}
    </div>
}

export default ContentView;