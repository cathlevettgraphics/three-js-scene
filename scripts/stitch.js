import * as THREE from './../node_modules/three/build/three.module.js';

import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

// TODO Can't import gasp as module
// import { gsap } from './../node_modules/gsap/dist/gsap.js';

// Icy color palete
// --navy-blue: #03045eff;
// --dark-cornflower-blue: #023e8aff;
// --star-command-blue: #0077b6ff;
// --blue-green: #0096c7ff;
// --cerulean-crayola: #00b4d8ff;
// --sky-blue-crayola: #48cae4ff;
// --sky-blue-crayola-2: #90e0efff;
// --blizzard-blue: #ade8f4ff;
// --powder-blue: #caf0f8ff;

const MODEL_PATH = './../assets/stitch_free/scene.gltf';
const backgroundColor = 0xcaf0f8;
// const canvas = document.querySelector('#c');

// Create scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(backgroundColor);
scene.fog = new THREE.Fog(backgroundColor, 60, 100);

// Set camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 10;
camera.position.y = 1.5;
camera.position.x = 0;

// Create lights
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.9);
hemiLight.position.set(0, 20, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

// const hemiHelper = new THREE.HemisphereLightHelper(hemiLight, 5);
// scene.add(hemiHelper);

// Shadows – https://threejs.org/docs/index.html#api/en/lights/shadows/DirectionalLightShadow

let dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(-20, 10, 20);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 512; // default
dirLight.shadow.mapSize.height = 512; // default
dirLight.shadow.camera.near = 0.5; // default
dirLight.shadow.camera.far = 1000; // default

// Add directional Light to scene
scene.add(dirLight);

// Direction light helper – https://threejs.org/docs/index.html#api/en/helpers/DirectionalLightHelper

// const dirHelper = new THREE.DirectionalLightHelper(dirLight, 10);
// scene.add(dirHelper);

// Floor
let floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
let floorMaterial = new THREE.MeshPhongMaterial({
  color: 0xeeeeee,
  shininess: 0,
});

let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
floor.position.y = -2.2;
// Add floor to scene
scene.add(floor);

// Load Stitch
// TODO how to cast shadows on this texture
const loader = new GLTFLoader();
loader.load(MODEL_PATH, function (gltf) {
  let stitch = gltf.scene;
  // stitch.receiveShadow = true;
  // stitch.castShadow = true;

  scene.add(stitch);
});

//create a blue LineBasicMaterial
// const lineMaterial = new THREE.LineDashedMaterial({ color: 0x333333 });

// const points = [];
// points.push(new THREE.Vector2(-6, 5, 1));
// points.push(new THREE.Vector2(-2, 0, 0));

// const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// const line = new THREE.Line(lineGeometry, lineMaterial);
// // Add line
// scene.add(line);

// Sphere
let geometry = new THREE.SphereGeometry(6, 32, 32);
let material = new THREE.MeshPhongMaterial({ color: 0x90e0ef }); // 0xf2ce2e
let centerSphere = new THREE.Mesh(geometry, material);

centerSphere.position.z = -15;
centerSphere.position.y = 3;
centerSphere.position.x = -0.25;

centerSphere.castShadow = true;
centerSphere.receiveShadow = false;

// Add centerSphere to scene.
scene.add(centerSphere);

// Second sphere
let geometry2 = new THREE.SphereGeometry(3, 32, 32);
let material2 = new THREE.MeshPhysicalMaterial({
  color: 0x0096c7ff,
});
let leftSphere = new THREE.Mesh(geometry2, material2);

leftSphere.position.z = -5;
leftSphere.position.y = 0.75;
leftSphere.position.x = -12;

leftSphere.castShadow = true;
leftSphere.receiveShadow = false;
// Add sphere to scene.
scene.add(leftSphere);

// Third sphere
let geometry3 = new THREE.SphereGeometry(3, 32, 32);
let material3 = new THREE.MeshToonMaterial({
  color: 0x023e8aff,
});
let rightSphere = new THREE.Mesh(geometry3, material3);

rightSphere.position.z = -5;
rightSphere.position.y = 0.75;
rightSphere.position.x = 12;

rightSphere.castShadow = true;
rightSphere.receiveShadow = false;
// Add sphere to scene.
scene.add(rightSphere);

// Add texture to sphere
const imageSphere = new THREE.SphereGeometry(3, 32, 32);
const texture = new THREE.TextureLoader().load(
  'https://images.unsplash.com/photo-1464802686167-b939a6910659?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1933&q=80',
);

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(1, 1);
var imageMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
});
const imageSphereComplete = new THREE.Mesh(imageSphere, imageMaterial);
scene.add(imageSphereComplete);

imageSphereComplete.position.z = -15;
imageSphereComplete.position.y = 0.75;
imageSphereComplete.position.x = 10;

// TODO What should go here?
gsap.registerPlugin();

const test = () => {
  const tl = gsap.timeline();
  tl.fromTo(
    rightSphere,
    {
      x: -250,
      y: 150,
    },
    {
      x: 150,
      y: 150,
    },
  );
  return tl;
};
test();

// Set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Orbit contrls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

controls.update();

// Render
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
