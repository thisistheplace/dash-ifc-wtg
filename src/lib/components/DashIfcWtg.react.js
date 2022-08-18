import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from 'three';
import React, {Component, setState} from 'react';
import PropTypes from 'prop-types';
import addOcean from '../environment/Ocean'

export default class DashIfcWtg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ifc_data: props.ifc_file_contents,
        }
        this.handleFileUpdate = this.handleFileUpdate.bind(this);
        this.loadifc = this.loadifc.bind(this);
        this.ifcloader = this.ifcloader.bind(this);
        this.scene = null;
    }

    componentDidUpdate(prevProps){
        const {ifc_file_contents} = this.props;
        if (ifc_file_contents !== prevProps.ifc_file_contents){
            this.handleFileUpdate();
        }
    }

    handleFileUpdate(){
        const {ifc_file_contents} = this.props;
        // Update the viewer
        this.loadifc();
    }

    componentDidMount() {
        const container = document.getElementById(this.props.id);
        const viewer = new IfcViewerAPI({
            container: container,
            backgroundColor: new Color("#FFFFFF")
        });
        viewer.addAxes();
        viewer.addGrid();
        viewer.IFC.setWasmPath('../../');
        viewer.IFC.loader.ifcManager.applyWebIfcConfig({
            USE_FAST_BOOLS: true,
            COORDINATE_TO_ORIGIN: true
          });

        // Don't show edges
        viewer.context.renderer.postProduction.active = false;

        this.viewer = viewer;
        this.scene = this.viewer.IFC.context.getScene();

        // Apply environmental components
        addOcean(this.scene);

        // Selectors
        window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
        window.onclick = () => viewer.IFC.selector.pickIfcItem(true);
        window.ondblclick = viewer.IFC.selector.highlightIfcItem(true);
        // Clear selection
        window.onkeydown = (event) => {
            if(event.code === 'KeyC') {
                viewer.IFC.selector.unpickIfcItems();
                viewer.IFC.selector.unHighlightIfcItems();
            }
        }
    }

    loadifc(){
        // Clear the scene before loading a new IFC model
        this.viewer.dispose();
        this.componentDidMount();
        this.ifcloader();
    }

    ifcloader = async() => {
        var blob = new Blob([this.props.ifc_file_contents], { type: 'text/plain', endings: "native" });
        const ifc_file = new File([blob], "file.ifc");
        await this.viewer.IFC.loadIfc(ifc_file, true);
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div id={this.props.id} style={{ height: '100%', width: '100%' }} />
            </div>
        );
    }
}

DashIfcWtg.defaultProps = {};

DashIfcWtg.propTypes = {
    /**
     * The ID used to identify the container for the IFC viewer component.
     */
    id: PropTypes.string,

    /**
     * The contents of the ifc file
     */
    ifc_file_contents: PropTypes.string.isRequired,
};