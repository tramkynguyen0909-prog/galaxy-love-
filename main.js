// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 18);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ⭐ Stars
const starGeo = new THREE.BufferGeometry();
const starCount = 2000;
const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 500,
    (Math.random() - 0.5) * 500,
    (Math.random() - 0.5) * 500
  );
}
starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const starMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.7,
});
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// 🌍 Planet
const planetGeo = new THREE.SphereGeometry(5, 64, 64);
const planetMat = new THREE.MeshStandardMaterial({
  color: 0xff99ff,
  emissive: 0x441144,
  roughness: 0.3,
  metalness: 0.6,
});
const planet = new THREE.Mesh(planetGeo, planetMat);
scene.add(planet);

// 💡 Lights
scene.add(new THREE.AmbientLight(0xff99ff, 0.6));

const light = new THREE.PointLight(0xffffff, 1.2);
light.position.set(10, 20, 20);
scene.add(light);

// 🎵 Music + Countdown
const audio = document.getElementById("bgm");
let count = 3;
const cd = document.getElementById("countdown");

const timer = setInterval(() => {
  cd.innerText = count;
  count--;
  if (count < 0) {
    clearInterval(timer);
    cd.style.display = "none";
    audio.play();
    animate();
  }
}, 1000);

// 🚀 Animation
let angle = 0;
function animate() {
  requestAnimationFrame(animate);

  angle += 0.002;
  camera.position.x = Math.sin(angle) * 18;
  camera.position.z = Math.cos(angle) * 18;
  camera.lookAt(0, 0, 0);

  planet.rotation.y += 0.003;
  stars.rotation.y += 0.0005;

  renderer.render(scene, camera);
}
