const sliderContenedor = document.getElementById("slider-principal");
const slider = document.getElementById("slides");
const items = slider.querySelectorAll("li");
const indicadoresContenedor = document.getElementById("indicadores");
const total = items.length;

let index = 0;
let intervaloAutoplay;

// Ajustar ancho dinámicamente según la cantidad de imágenes
slider.style.width = `${total * 100}%`;
items.forEach(item => {
    item.style.width = `${100 / total}%`;
});

// Crear los puntos indicadores automáticamente
for (let i = 0; i < total; i++) {
    const punto = document.createElement("button");
    punto.classList.add("punto");
    punto.setAttribute("aria-label", `Ir a imagen ${i + 1}`);
    if (i === 0) punto.classList.add("activo");

    punto.addEventListener("click", () => {
        index = i;
        actualizarSlider();
        reiniciarAutoplay();
    });

    indicadoresContenedor.appendChild(punto);
}

const puntos = indicadoresContenedor.querySelectorAll(".punto");

function actualizarSlider() {
    const paso = 100 / total;
    slider.style.transform = `translateX(-${index * paso}%)`;

    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === index);
    });
}

function siguiente() {
    index = (index + 1) % total;
    actualizarSlider();
}

function anterior() {
    index = (index - 1 + total) % total;
    actualizarSlider();
}

// Botones
document.getElementById("next").addEventListener("click", () => {
    siguiente();
    reiniciarAutoplay();
});

document.getElementById("prev").addEventListener("click", () => {
    anterior();
    reiniciarAutoplay();
});

// Deslizamiento táctil en celular
let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    detenerAutoplay();
}, { passive: true });

slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    const distancia = startX - endX;

    if (distancia > 50) {
        siguiente();
    } else if (distancia < -50) {
        anterior();
    }
    iniciarAutoplay();
}, { passive: true });

// Autoplay cada 5 segundos (se pausa al pasar el mouse)
function iniciarAutoplay() {
    intervaloAutoplay = setInterval(siguiente, 5000);
}

function detenerAutoplay() {
    clearInterval(intervaloAutoplay);
}

function reiniciarAutoplay() {
    detenerAutoplay();
    iniciarAutoplay();
}

sliderContenedor.addEventListener("mouseenter", detenerAutoplay);
sliderContenedor.addEventListener("mouseleave", iniciarAutoplay);

iniciarAutoplay();