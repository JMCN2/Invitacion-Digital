const envelopeWrapper = document.getElementById("envelopeWrapper");
const sealButton = document.getElementById("sealButton");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");

let isNavigating = false;

function updateMusicButton() {
    if (!musicToggle || !bgMusic) return;
    musicToggle.textContent = bgMusic.paused ? "♪ Música (Pausa)" : "♪ Música (Activa)";
}

function startMusic() {
    if (!bgMusic) return Promise.resolve();
    bgMusic.volume = 0.6;
    return bgMusic.play()
        .then(() => {
            localStorage.setItem("musicPlaying", "true");
            updateMusicButton();
        })
        .catch(() => {
            updateMusicButton();
        });
}

if (musicToggle && bgMusic) {
    musicToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (bgMusic.paused) {
            localStorage.setItem("musicPlaying", "true");
            bgMusic.play().then(updateMusicButton).catch(updateMusicButton);
        } else {
            localStorage.setItem("musicPlaying", "false");
            bgMusic.pause();
            updateMusicButton();
        }
    });
}

if (sealButton && envelopeWrapper) {
    sealButton.addEventListener("click", () => {
        if (isNavigating) return;
        isNavigating = true;

        // Reproduce la canción en el mismo clic que abre el sobre
        startMusic();

        // Guardar tiempo actual justo antes de cambiar de página
        const saveProgress = () => {
            if (bgMusic) {
                localStorage.setItem("musicTime", String(bgMusic.currentTime || 0));
            }
        };

        // Abrir sobre
        envelopeWrapper.classList.add("open");

        // Esperar a que termine la animación y cambiar de HTML
        setTimeout(() => {
            saveProgress();
            window.location.href = "componentes/invitacion-final.html";
        }, 2500);
    });
}

updateMusicButton();