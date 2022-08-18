// import Water from 'three/examples/jsm/objects/Water.js';
import { Water } from 'three/examples/jsm/objects/Water';
import { TextureLoader, PlaneBufferGeometry, RepeatWrapping } from 'three';

export default function addOcean(scene) {
    var waterGeometry = new PlaneBufferGeometry( 10000, 10000 );
    var water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new TextureLoader().load( '/static/img/waternormals.jpg', function ( texture ) {
                texture.wrapS = texture.wrapT = RepeatWrapping;
            } ),
            alpha: 0.5,
            // sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = - Math.PI / 2;
    scene.add( water );
};