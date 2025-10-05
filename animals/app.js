const API_URL = 

//  Geolocalização 
function getLocation() {
  const geoErrorEl = document.getElementById("geoError");
  const coordsEl = document.getElementById("coords");
  geoErrorEl.textContent = "";
  coordsEl.textContent = "";

  if (!navigator.geolocation) {
    geoErrorEl.textContent = "Geolocalização não suportada";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      coordsEl.textContent = `Latitude: ${latitude.toFixed(4)} | Longitude: ${longitude.toFixed(4)}`;
    },
    (err) => {
      geoErrorEl.textContent = "Erro: " + err.message;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

const dogImageElement = document.getElementById('dog-image');
 
async function fetchDog() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    document.getElementById("dogContainer").innerHTML =
      `<img src="${data.message}" alt="Dog" />`;
  } catch (err) {
    console.error("Erro ao buscar dog:", err);
  }
}

// Câmera
let stream = null;
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photoResult = document.getElementById("photoResult");

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("stopBtn").style.display = "inline-block";
    document.getElementById("captureBtn").disabled = false;
  } catch (err) {
    console.error("Erro ao abrir câmera:", err);
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
  }
  video.srcObject = null;
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("stopBtn").style.display = "none";
  document.getElementById("captureBtn").disabled = true;
}

function capturePhoto() {
  if (!stream) return;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);
  const data = canvas.toDataURL("image/png");
  photoResult.innerHTML = `<h4>Foto capturada:</h4><img src="${data}" alt="captured" />`;
}
