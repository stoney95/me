import {FC} from 'react';

import {default as ContainerView} from "./Container-view";

const ContainerContainer: FC = ({children}) => {
    return <ContainerView>{children}</ContainerView>;
}

export default ContainerContainer;