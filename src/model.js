import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//camera & scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60 , window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-3,2,3); // x, y, z
camera.lookAt(0, 0, 0); // 카메라 시점

//renderer, bg color
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xffffff, 0); // bg color
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//light

const light = new THREE.DirectionalLight( 0xffffff, 2 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light )

// loader
const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

//model

modelLoader.load('./../assets/model.glb', (model)=> {

	const scale = 46
	model.scene.scale.set(scale,scale,scale);
	model.scene.position.set(0,0.5,0);

	scene.add(model.scene);
});

modelLoader.load('./../assets/paper.glb', (model)=>{
	model.scene.position.set(-2.3,0,0);

	scene.add(model.scene);
});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();