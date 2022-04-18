import {FC} from "react";

import "./Content.scss";

const ContentView: FC = ({children}) => {
    const forwardScrollEvent = (e: any) => {
        window.dispatchEvent(new CustomEvent("scroll"));
    }

    return <div onScroll={forwardScrollEvent} className="content">
        {children}
    </div>
}

export default ContentView;