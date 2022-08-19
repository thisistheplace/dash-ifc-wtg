import { Water } from 'three/examples/jsm/objects/Water';
import { TextureLoader, PlaneBufferGeometry, RepeatWrapping, AmbientLight } from 'three';
import { IfcComponent } from 'web-ifc-viewer';

export default class Ocean extends IfcComponent {

    constructor(context, sun) {
        super(context);
        this.context = context;
        var waterGeometry = new PlaneBufferGeometry( 10000, 10000 );
        this.water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new TextureLoader().load( '/static/img/waternormals.jpg', function ( texture ) {
                    texture.wrapS = texture.wrapT = RepeatWrapping;
                } ),
                alpha: 0.9,
                sunDirection: sun.position.clone().normalize(),
                sunColor: 0xffffff,
                waterColor: 0x001e0f,
                distortionScale: 3.7,
                fog: context.getScene().fog !== undefined
            }
        );
        this.water.material.uniforms[ 'sunDirection' ].value.copy( sun.position ).normalize();
        this.water.rotation.x = - Math.PI / 2;
        this.context.getScene().add( this.water );
    }
    
    update(_delta) {
        this.water.material.uniforms[ 'time' ].value += _delta / 5;
    }

    removeFromScene(){
        this.water.geometry.dispose();
        this.water.material.dispose();
        this.water.removeFromParent();
    }
};