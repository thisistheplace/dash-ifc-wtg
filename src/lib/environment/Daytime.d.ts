import { IfcComponent } from 'web-ifc-viewer';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { AmbientLight } from 'three';
import { IfcContext } from 'web-ifc-viewer/dist/components';

export declare class Daytime extends IfcComponent {
    sky: Sky;
    sun: AmbientLight;
    context: IfcContext;
    constructor(context: IfcContext);
    update(_delta) { };
    removeFromScene(){ };
};