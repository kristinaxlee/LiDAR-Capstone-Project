import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let camera, scene, renderer, loader, controls, material;

export function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  loader = new PLYLoader();
  camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 88) / window.innerHeight,
    0.1,
    1000
  );
  controls = new OrbitControls(camera, renderer.domElement);
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
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomIn");
    camera.updateProjectionMatrix();
  };

  zoomInButton.addEventListener("click", zoomInFunction);

  const zoomOutFunction = (e) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomOut");
    camera.updateProjectionMatrix();
  };

  zoomOutButton.addEventListener("click", zoomOutFunction);

  const clickZoom = (value, zoomType) => {
    if (value >= 10 && zoomType === "zoomIn") {
      return value - 5;
    } else if (value <= 75 && zoomType === "zoomOut") {
      return value + 5;
    } else {
      return value;
    }
  };

  const getFov = () => {
    return Math.floor(
      (2 *
        Math.atan(camera.getFilmHeight() / 2 / camera.getFocalLength()) *
        180) /
        Math.PI
    );
  };
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

  animate();

  // take old rendered map and replace with new one
  var item = document.getElementById("map-container").childNodes[0];
  item.replaceChild(renderer.domElement, item.childNodes[0]);
}
