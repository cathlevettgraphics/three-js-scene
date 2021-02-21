import * as THREE from './../node_modules/three/build/three.module.js';

import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

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

// Create scene
const scene = new THREE.Scene();

scene.background = new THREE.Color(backgroundColor);
// Fog – https://threejs.org/docs/index.html#api/en/scenes/Fog
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
let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
hemiLight.position.set(0, 20, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

// Shadows – https://threejs.org/docs/index.html#api/en/lights/shadows/DirectionalLightShadow

let dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(-20, 12, 20);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 512; // default
dirLight.shadow.mapSize.height = 512; // default
dirLight.shadow.camera.near = 0.5; // default
dirLight.shadow.camera.far = 1000; // default

// Add directional Light to scene
scene.add(dirLight);

// Direction light helper – https://threejs.org/docs/index.html#api/en/helpers/DirectionalLightHelper
// const helper = new THREE.DirectionalLightHelper(dirLight, 10);
// scene.add(helper);

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

// Sphere
let geometry = new THREE.SphereGeometry(6, 32, 32);
let material = new THREE.MeshStandardMaterial({ color: 0x90e0ef }); // 0xf2ce2e
let sphere = new THREE.Mesh(geometry, material);

sphere.position.z = -15;
sphere.position.y = 3;
sphere.position.x = -0.25;

sphere.castShadow = true;
sphere.receiveShadow = false;

// Add sphere to scene.
scene.add(sphere);

// Second sphere
let geometry2 = new THREE.SphereGeometry(3, 32, 32);
let material2 = new THREE.MeshStandardMaterial({ color: 0x0096c7ff });
let sphere2 = new THREE.Mesh(geometry2, material2);

sphere2.position.z = -5;
sphere2.position.y = 0.75;
sphere2.position.x = -12;

sphere2.castShadow = true;
sphere2.receiveShadow = false;
// Add sphere to scene.
scene.add(sphere2);

// Third sphere
let geometry3 = new THREE.SphereGeometry(3, 32, 32);
let material3 = new THREE.MeshStandardMaterial({ color: 0x023e8aff });
let sphere3 = new THREE.Mesh(geometry3, material3);

sphere3.position.z = -5;
sphere3.position.y = 0.75;
sphere3.position.x = 12;

sphere3.castShadow = true;
sphere3.receiveShadow = false;
// Add sphere to scene.
scene.add(sphere3);

// Set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Load Stitch
// TODO how to cast shadows on this texture
const loader = new GLTFLoader();
loader.load(MODEL_PATH, function (gltf) {
  let model = gltf.scene;
  model.receiveShadow = true;
  model.castShadow = true;

  scene.add(model);
});

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
