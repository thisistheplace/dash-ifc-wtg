import { IfcViewerAPI } from 'web-ifc-viewer';
import { Color } from 'three';
import React, {Component, setState} from 'react';
import PropTypes from 'prop-types';
// import Loader from './../utils/loader';

export default class DashIfcWtg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ifc_data: props.ifc_file_contents,
            // loading: "hidden"
        }
        this.handleFileUpdate = this.handleFileUpdate.bind(this);
        this.loadifc = this.loadifc.bind(this);
        this.ifcloader = this.ifcloader.bind(this);
        // this.startLoading = this.startLoading.bind(this);
        // this.stopLoading = this.stopLoading.bind(this);
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

    // startLoading(){
    //     setState({loading : "block"});
    // }

    // stopLoading(){
    //     setState({loading : "hidden"});
    // }

    componentDidMount() {
        const container = document.getElementById(this.props.id);
        const viewer = new IfcViewerAPI({
            container:container,
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
        // this.startLoading();

        // Clear scene
        //this.scene.remove.apply(this.scene, this.scene.children);

        this.viewer.dispose();
        this.componentDidMount();

        this.ifcloader();
        // this.stopLoading();
    }

    ifcloader = async() => {
        var blob = new Blob([this.props.ifc_file_contents], { type: 'text/plain', endings: "native" });
        const ifc_file = new File([blob], "file.ifc");
        await this.viewer.IFC.loadIfc(ifc_file, true);
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                {/* <div className="loader">
                    <Loader/>
                </div> */}
                <div id={this.props.id} style={{ height: '100%', width: '100%' }} />
                <style jsx>{`
                    .loader {
                        display: ${this.state.loading};
                        position: absolute;
                        z-index: 3;
                        background: #fcfcfc;
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
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