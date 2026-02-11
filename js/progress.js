export function updateProgress() {
        const fields = [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(DOM.email.value),
            DOM.nome.value.length > 3,
            !!document.querySelector('input[name="folga"]:checked'),
            DOM.data.value !== ""
        ];
        const perc = (fields.filter(Boolean).length / 4) * 100;
        DOM.barra.style.width = perc + "%";
        DOM.barra.classList.toggle('barra-completa', perc === 100);
    }

