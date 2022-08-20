import React, {Component, useCallback} from 'react';
import PropTypes from 'prop-types';

import { IfcViewerAPI } from 'web-ifc-viewer';
import { IfcScene } from 'web-ifc-viewer/dist/components/context/scene';

import Ocean from '../environment/Ocean';
import Daytime from '../environment/Daytime';

export declare class DashIfcWtg extends Component {
    viewer: IfcViewerAPI;
    scene: IfcScene;
    ocean: Ocean;
    sky: Daytime;
    constructor(props: any);
    loadIfc(): void;
};