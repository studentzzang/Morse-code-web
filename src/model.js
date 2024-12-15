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

//query
var manualDiv = document.getElementById("manual-container");

//light

const light = new THREE.DirectionalLight( 0xffffff, 2 );
light.position.set( 0, 1, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light )

// loader
const modelLoader = new GLTFLoader();

//model

var manualModel = null;

modelLoader.load('./../assets/model.glb', (model)=> { //machine

	const scale = 46
	model.scene.scale.set(scale,scale,scale);
	model.scene.position.set(0,0.5,0);

	scene.add(model.scene);
});

modelLoader.load('./../assets/paper.glb', (model)=>{ // manual
	model.scene.position.set(-2.3,0,0);

	manualModel = model.scene;

	scene.add(model.scene);
});

// show manual
document.addEventListener("click", (e)=>{
	let mouse = new THREE.Vector2();
	
	mouse.set(
		(e.clientX / window.innerWidth) * 2 - 1,
		((window.innerHeight - e.clientY) / window.innerHeight) * 2 -1 
	);

	const rayCaster = new THREE.Raycaster();
	rayCaster.setFromCamera(mouse, camera);

	const intersects = rayCaster.intersectObject(manualModel); //detect manual is clicked
	
	if(intersects.length > 0){ // clicked?
		manualDiv.style.visibility  = 'visible';
	}
})

// close manual
document.querySelector("#cancle").addEventListener("click", (e)=> {
	manualDiv.style.visibility = 'hidden';
});

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();