import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "camera-controls";

let camera, scene, renderer, loader, controls, material, cameraControls, clock;

export function init() {
  CameraControls.install({ THREE: THREE });
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  loader = new PLYLoader();
  camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 88) / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 100);
  controls = new OrbitControls(camera, renderer.domElement);
  cameraControls = new CameraControls(camera, renderer.domElement);
  material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    envMap: null,
    metalness: 0,
    roughness: 0,
    transparent: true,
    transmission: 1.0,
    side: THREE.DoubleSide,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
  });

  // connect zoom functions to buttons
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");

  const zoomInFunction = (e) => {
    cameraControls.dolly(10, true);
    camera.updateProjectionMatrix();
  };

  const zoomOutFunction = (e) => {
    cameraControls.dolly(-10, true);
    camera.updateProjectionMatrix();
  };

  zoomInButton.addEventListener("click", zoomInFunction);
  zoomOutButton.addEventListener("click", zoomOutFunction);

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  const menuWidth = 88;
  camera.aspect = (window.innerWidth - menuWidth) / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth - menuWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  const delta = clock.getDelta();
  cameraControls.update(delta);
  render();
}

function render() {
  renderer.render(scene, camera);
}

export function renderDisplay() {
  scene.background = new THREE.Color("#ffffff");
  scene.add(new THREE.AxesHelper(5));

  const light = new THREE.SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);

  camera.position.z = 40;

  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth - 88, window.innerHeight);

  controls.enableDamping = true;

  loader.load(
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/ply/ascii/dolphins.ply",
    function (geometry) {
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotateX(-Math.PI / 2);
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
}
