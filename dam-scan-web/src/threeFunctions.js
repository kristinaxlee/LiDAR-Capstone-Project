import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "camera-controls";

let camera,
  scene,
  renderer,
  loader,
  controls,
  material,
  cameraControls,
  clock,
  initialPos;

export function init() {
  CameraControls.install({ THREE: THREE });
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  loader = new PLYLoader();
  camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 450) / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  camera.aspect = (window.innerWidth - 450) / window.innerHeight;
  controls = new OrbitControls(camera, renderer.domElement);
  cameraControls = new CameraControls(camera, renderer.domElement);

  // grab buttons from UI
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");
  const zoomCenterButton = document.getElementById("zoom-center");
  const expandMenuButton = document.getElementById("expand-menu-button");
  const displayButton = document.getElementById("display-button");

  // attach side menu resize handlers to menu close and display buttons
  expandMenuButton.addEventListener("click", onMenuResize);
  displayButton.addEventListener("click", onWindowResize);

  // attach zoom events handlers to buttons
  zoomInButton.addEventListener("click", zoomIn);
  zoomOutButton.addEventListener("click", zoomOut);
  zoomCenterButton.addEventListener("click", zoomCenter);

  // resize render window when browser window resizes
  window.addEventListener("resize", onWindowResize, false);
}

/**
 * Zoom camera out using dolly function
 */
function zoomOut() {
  cameraControls.dolly(-1, true);
  camera.updateProjectionMatrix();
}

/**
 * Zoom camera in using dolly function
 */
function zoomIn() {
  cameraControls.dolly(1, true);
  camera.updateProjectionMatrix();
}

/**
 * Move camera to its original position
 * NOTE: This function does not work. Needs to be fixed in the future.
 */
function zoomCenter() {
  console.log(" -- zoom function center button pressed");
  console.log(" -- initial position: ", initialPos);

  camera.position.set(initialPos.x, initialPos.y, initialPos.z);
  camera.updateProjectionMatrix();

  animate();
}

/**
 * Resize render window when side menu is opened/closed and when scan initially loads
 */
function onMenuResize() {
  var sideMenu = document.getElementById("side-menu");
  var positionInfo = sideMenu.getBoundingClientRect();

  const menuWidth = positionInfo.width === 88 ? 450 : 88;
  camera.aspect = (window.innerWidth - menuWidth) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - menuWidth, window.innerHeight);
  render();
}

/**
 * Resize the render window when browser window size is resized
 */
function onWindowResize() {
  var sideMenu = document.getElementById("side-menu");
  var positionInfo = sideMenu.getBoundingClientRect();

  const menuWidth = positionInfo.width;
  camera.aspect = (window.innerWidth - menuWidth) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - menuWidth, window.innerHeight);
  render();
}

/**
 * Animate scan and update orbit controls and camera controls
 */
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  const delta = clock.getDelta();
  cameraControls.update(delta);
  render();
}

/**
 * Render ThreeJS scene
 */
function render() {
  renderer.render(scene, camera);
}

/**
 * Render a new scan from a url when user presses "Display" button
 */
export function renderDisplay(filename) {
  // remove previous scans
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }

  console.log(" -- filename sent to renderDisplay: ", filename);
  scene.background = new THREE.Color("#ffffff");
  scene.add(new THREE.AxesHelper(5));

  const light = new THREE.SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);

  camera.position.z = 40;

  renderer.outputEncoding = THREE.sRGBEncoding;

  // subtract 450 to account for side menu window size offset
  camera.aspect = (window.innerWidth - 450) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - 450, window.innerHeight);

  controls.enableDamping = true;

  var endpoint = "http://localhost:8888/scans/" + filename;

  loader.load(
    endpoint,
    function (geometry) {
      material = new THREE.PointsMaterial({ size: 0.01 });
      material.vertexColors = true;
      const mesh = new THREE.Points(geometry, material);
      mesh.position.x = 0;
      mesh.position.y = 0;
      mesh.position.z = 0;
      mesh.scale.multiplyScalar(0.2);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.log(error);
    }
  );

  // take old rendered map and replace with new one
  var item = document.getElementById("map-container").childNodes[0];
  item.replaceChild(renderer.domElement, item.childNodes[0]);

  animate();

  // store initial position
  initialPos = camera.position;
}
