import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";
import SideMenu from "./SideMenu";
import ZoomMenu from "./zoomMenu";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";

const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const MapContainer = styled.div`
  height: 100vh;
  width: window.innerWidth - 88;
  position: relative;
`;

const MapTitle = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
`;

function App() {
  const [menuActive, setMenuActive] = useState(true);
  const stateRef = useRef<Boolean | null>(null);
  stateRef.current = menuActive;
  const [filters, setFilters] = useState({
    department: "",
    fromDate: "",
    toDate: "",
    room: "",
    date: "",
  });

  const setRoom = (e: any) => {
    setFilters({
      ...filters,
      room: e.target.value,
    });
  };

  const setDate = (e: any) => {
    setFilters({
      ...filters,
      date: e.target.value,
    });
  };

  const setDepartment = (e: any) => {
    setFilters({
      ...filters,
      department: e.target.value,
    });
  };

  const setToDate = (e: any) => {
    setFilters({
      ...filters,
      toDate: e.target.value,
    });
  };

  const setFromDate = (e: any) => {
    setFilters({
      ...filters,
      fromDate: e.target.value,
    });
  };

  // Three JS stuff
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  const loader = new PLYLoader();
  const camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth - 88) / window.innerHeight,
    0.1,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);
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

  // When app loads, render ThreeJS stuff
  useEffect(() => {
    window.addEventListener("resize", onWindowResize, false);
    //window.addEventListener("click", onWindowResize, false);
    scene.background = new THREE.Color("#ffffff");
    scene.add(new THREE.AxesHelper(5));

    const light = new THREE.SpotLight();
    light.position.set(20, 20, 20);
    scene.add(light);

    camera.position.z = 40;

    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth - 88, window.innerHeight);

    document.getElementById("map-container")!.appendChild(renderer.domElement);

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
  }, []);

  // Resize ThreeJS window when menu is open/closed (currently not working)
  /*useEffect(() => {
    const width = stateRef.current ? 450 : 88;
    camera.aspect = (window.innerWidth - width) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - width, window.innerHeight);
    render();
  }, [stateRef.current, menuActive]);*/

  return (
     <>
    <ZoomMenu/>
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <SideMenu
        setRoom={setRoom}
        setDate={setDate}
        setDepartment={setDepartment}
        setToDate={setToDate}
        setFromDate={setFromDate}
        filters={filters}
        setMenuActive={setMenuActive}
        menuActive={menuActive}
        onWindowResize={onWindowResize}
      />
      <MapContainer>
        <Map id="map-container"></Map>
        <MapTitle>
          <h1>{filters.room}</h1>
          <h3>{filters.date}</h3>
        </MapTitle>
      </MapContainer>
    </div>
    </>
  );
}

export default App;
