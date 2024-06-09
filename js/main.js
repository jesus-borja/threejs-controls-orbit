import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera, controls, scene, renderer;

init();
//render(); // remove when using animation loop

function init() {
    // instances the object scene
    scene = new THREE.Scene();

    // sets the background color
    scene.background = new THREE.Color(0x774991);

    // sets the color and the growth rate of the fog
    scene.fog = new THREE.FogExp2(0xce1773, 0.002);

    console.log(scene);

    // smooths the edges of drawn objects
    renderer = new THREE.WebGLRenderer({ antialias: true });

    // sets the pixel size to the pixels in our screen
    renderer.setPixelRatio(window.devicePixelRatio);

    // sets the size for the renderer to equal our screen size
    renderer.setSize(window.innerWidth, window.innerHeight);

    // sets the function animate to be called for the animation loop
    renderer.setAnimationLoop(animate);

    // adds the renderer as an HTML element to the body of the page
    document.body.appendChild(renderer.domElement);

    // AAAAAAAAAAAAAAAAAAA
    // FOV, Size, cercanía, lejanía
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    // sets the camera position
    camera.position.set(400, 200, 0);

    // controls

    // creates the object for controlling the camera
    controls = new OrbitControls(camera, renderer.domElement);

    // listen to the keyboard events of the page
    controls.listenToKeyEvents(window); // optional

    //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

    // smooths the camera moving while starting and stoping movements
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

    // how strong is the smoothing of the movement
    controls.dampingFactor = 0.05;

    // if true: allows to move the camera below the scene
    // if false: limits the moving of the camera
    controls.screenSpacePanning = false;

    // how much zoom in you can make
    controls.minDistance = 100;

    // how much zoom out you can make
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    // geometry used for the elements of the scene
    const geometry = new THREE.ConeGeometry(10, 30, 4, 1);

    // material for the elements of the scene
    const material = new THREE.MeshPhongMaterial({
        color: 0x073ca5,
        flatShading: true,
    });

    // loop to create and add the elements to the scene
    for (let i = 0; i < 150; i++) {
        // creates the mesh to represent the objects in the scene
        const mesh = new THREE.Mesh(geometry, material);

        // sets a random position for the object
        mesh.position.x = Math.random() * 1600 - 800;
        mesh.position.y = 0;
        mesh.position.z = Math.random() * 1600 - 800;

        // udpates the object location
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;

        // adds the object to the scene
        scene.add(mesh);
    }

    // lights

    // clear light, illuminates from an "infinitely" far distance
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    // blueish light, illuminates from an "infinitely" far distance
    const dirLight2 = new THREE.DirectionalLight(0x002288, 3);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    // grey global light, illuminates all objects equally
    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);

    // function to adapt the screen size everytime it changes

    window.addEventListener("resize", onWindowResize);
}

// recalculates the screen size and camera view size
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// updates the scene and controls
function animate() {
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    render();
}

// updates the scene
function render() {
    renderer.render(scene, camera);
}
