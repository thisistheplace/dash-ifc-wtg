

import { Sky } from 'three/examples/jsm/objects/Sky';
import { IfcComponent } from 'web-ifc-viewer';
import { AmbientLight, BoxGeometry } from 'three';

export default class Daytime extends IfcComponent {

    constructor(context) {
        super(context);
        this.context = context;

        this.sun = new AmbientLight( 0x222222 );
        this.sky = new Sky();
        this.sky.geometry = new BoxGeometry(10000, 10000, 10000);

        var uniforms = this.sky.material.uniforms;

        uniforms[ 'turbidity' ].value = 10;
        uniforms[ 'rayleigh' ].value = 0.5;
        uniforms[ 'mieCoefficient' ].value = 0.02;
        uniforms[ 'mieDirectionalG' ].value = 0.9;
        var parameters = {
            distance: 1000,
            inclination: 0.1,
            azimuth: 0.205
        };
        var theta = Math.PI * ( parameters.inclination - 0.5 );
        var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 );
        this.sun.position.x = parameters.distance * Math.cos( phi );
        this.sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta );
        this.sun.position.z = parameters.distance * Math.sin( phi ) * Math.cos( theta );

        this.sky.material.uniforms[ 'sunPosition' ].value = this.sun.position.copy( this.sun.position );

        this.context.getScene().add( this.sky );
        this.context.getScene().add( this.sun );
    }

    removeFromScene(){
        this.sky.geometry.dispose();
        this.sky.material.dispose();
        this.sky.removeFromParent();

        this.sun.removeFromParent();
    }
};