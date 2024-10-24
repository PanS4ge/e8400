const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const radius = 4;
const height = 5;
const sides = 4; // Liczba boków ostrosłupa

// Usunięcie podstawy poprzez zmianę liczby 'heightSegments' na 0
const geometry = new THREE.CylinderGeometry(0, radius, height, sides, 0);

// Przepisane UV-mapy, aby tekstury były rozmieszczone w układzie "X" na ściankach
geometry.faceVertexUvs[0] = [
  [new THREE.Vector2(0, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.25, 0.5)],
  [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.5, 0)],
  [new THREE.Vector2(0.5, 0), new THREE.Vector2(1, 0), new THREE.Vector2(0.75, 0.5)],
  [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.5, 1)],
];

const url = new URL(window.location.href);
const urlParams = new URLSearchParams(url.search);
var txturl = ""
if(urlParams.get("slider")) { 
  if(urlParams.get("slider").toLowerCase() == "false"){
    document.getElementById("slider").style.display = "none"
    document.getElementById("info").style.display = "none"
  }
}
if(urlParams.get("speed")) {
  document.getElementById("slider").value = parseFloat(urlParams.get("speed")) * 10000
}
if(urlParams.get("url")) {
  txturl = urlParams.get("url")
} else {
  txturl = 'https://pans4ge.github.io/e8400/bombelium.png'
}

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(txturl); // Zmień na ścieżkę do swojej tekstury

const materials = [
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshBasicMaterial({ map: texture }),
  new THREE.MeshBasicMaterial({ map: texture })
];

const pyramid = new THREE.Mesh(geometry, materials);
scene.add(pyramid);

camera.position.z = 10;
camera.position.y = 2;
camera.rotation.x = -0.3;

var render = function () {
  requestAnimationFrame(render);
  pyramid.rotation.x += 0.00;
  pyramid.rotation.y += parseInt(document.getElementById("slider").value) / 10000;

  renderer.render(scene, camera);
};

render();
