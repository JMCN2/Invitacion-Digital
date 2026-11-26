(function () {
  // Fecha exacta del evento: 30 de noviembre de 2026 a las 09:00:00 (hora local del dispositivo)
  const TARGET_DATE = new Date(2026, 10, 30, 9, 0, 0).getTime();

  function pad(num) {
    return String(num).padStart(2, "0");
  }

  function initCountdown() {
    const statusEl = document.getElementById("countdown-status");
    const daysEl = document.getElementById("cd-days");
    const hoursEl = document.getElementById("cd-hours");
    const minutesEl = document.getElementById("cd-minutes");
    const secondsEl = document.getElementById("cd-seconds");

    if (!statusEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) {
      return;
    }

    function updateTimer() {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;
      const absDiff = Math.abs(diff);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((absDiff / 1000) % 60);

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minutesEl.textContent = pad(minutes);
      secondsEl.textContent = pad(seconds);

      if (diff >= 0) {
        statusEl.textContent = "Faltan para el inicio";
      } else {
        statusEl.textContent = "El evento comenzó hace";
      }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  function playOnEntry() {
    const audio = document.getElementById("bg-music");
    if (!audio) return;

    function startAudio() {
      audio.play().catch(function () {
        // Si el navegador bloquea el sonido hasta la primera interacción, espera al clic o toque
      });
    }

    startAudio();

    function handleFirstAction() {
      audio.play().then(function () {
        document.removeEventListener("click", handleFirstAction);
        document.removeEventListener("touchstart", handleFirstAction);
        document.removeEventListener("keydown", handleFirstAction);
      }).catch(function () {});
    }

    document.addEventListener("click", handleFirstAction);
    document.addEventListener("touchstart", handleFirstAction, { passive: true });
    document.addEventListener("keydown", handleFirstAction);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCountdown();
      playOnEntry();
    });
  } else {
    initCountdown();
    playOnEntry();
  }
})();