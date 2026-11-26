const envelopeWrapper = document.getElementById("envelopeWrapper");
const sealButton = document.getElementById("sealButton");

sealButton.addEventListener("click", () => {

    // Abrir sobre
    envelopeWrapper.classList.add("open");

    // Esperar a que termine la animación y cambiar de HTML
    setTimeout(() => {
        window.location.href = "componentes/invitacion-final.html";
    }, 2500);

});