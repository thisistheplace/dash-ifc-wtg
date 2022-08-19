import { IfcComponent } from 'web-ifc-viewer';
import { Water } from 'three/examples/jsm/objects/Water';
import { AmbientLight } from 'three';
import { IfcContext } from 'web-ifc-viewer/dist/components';

export declare class Ocean extends IfcComponent {
    water: Water;
    context: IfcContext;
    constructor(context: IfcContext, sun: AmbientLight);
    update(_delta) { };
    removeFromScene(){ };
};