import * as THREE from './../node_modules/three/build/three.module.js';

import { OrbitControls } from './../node_modules/three/examples/jsm/controls/OrbitControls.js';

import { GLTFLoader } from './../node_modules/three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_PATH = './../assets/stitch_free/scene.gltf';
const backgroundColor = 0xdddf00;

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(backgroundColor);
// TODO look at these settings
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
hemiLight.position.set(0, 30, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

// TODO add shadows
let d = 8.25;
let dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
dirLight.shadow.camera.near = 0.1;
dirLight.shadow.camera.far = 1500;
dirLight.shadow.camera.left = d * -1;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = d * -1;
// Add directional Light to scene
scene.add(dirLight);

// Floor
let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
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
let geometry = new THREE.SphereGeometry(8, 32, 32);
let material = new THREE.MeshBasicMaterial({ color: 0xffff3f }); // 0xf2ce2e
let sphere = new THREE.Mesh(geometry, material);

sphere.position.z = -15;
sphere.position.y = 0;
sphere.position.x = -0.25;
// Add sphere scene.
scene.add(sphere);

// TODO add more background elememts

// Set renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Load Stitch
const loader = new GLTFLoader();

loader.load(
  MODEL_PATH,
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

// TODO add text labels

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
