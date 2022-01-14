import React, { useEffect, useState } from "react";
import "./App.css";
import SideMenu from "./SideMenu";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

function App() {
  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    date: "",
  });

  const changeRoom = (e: any) => {
    setFilters({
      ...filters,
      room: e.target.value,
    });
  };

  const changeDate = (e: any) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const changeDepartment = (e: any) => {
    setFilters({
      ...filters,
      department: e.target.value,
    });
  };

  const changeToDate = (e: any) => {
    setFilters({
      ...filters,
      toDate: e.target.value,
    });
  };

  const changeFromDate = (e: any) => {
    setFilters({
      ...filters,
      fromDate: e.target.value,
    });
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#dedef0");
    scene.add(new THREE.AxesHelper(5));

    const light = new THREE.SpotLight();
    light.position.set(20, 20, 20);
    scene.add(light);

    const camera = new THREE.PerspectiveCamera(
      75,
      (window.innerWidth - 450) / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer();
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth - 450, window.innerHeight);
    //document.body.appendChild(renderer.domElement);
    document.getElementById("map-container")!.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const material = new THREE.MeshPhysicalMaterial({
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

    const loader = new PLYLoader();
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

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = (window.innerWidth - 450) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth - 450, window.innerHeight);
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
    animate();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <SideMenu
        changeRoom={changeRoom}
        changeDate={changeDate}
        changeDepartment={changeDepartment}
        changeToDate={changeToDate}
        changeFromDate={changeFromDate}
        filters={filters}
      />
      <div
        style={{
          height: "100vh",
          width: window.innerWidth - 450,
        }}
        id="map-container"
      ></div>
    </div>
  );
}

export default App;
