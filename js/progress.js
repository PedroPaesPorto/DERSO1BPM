import { DOM } from "./dom.js";

export function updateProgress() {

    if (!DOM?.email || !DOM?.nome || !DOM?.data || !DOM?.barra) return;

    const validacoes = [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(DOM.email.value.trim()),
        DOM.nome.value.trim().length > 3,
        !!document.querySelector('input[name="folga"]:checked'),
        DOM.data.value.trim() !== ""
    ];

    const total = validacoes.length;
    const preenchidos = validacoes.filter(Boolean).length;
    const perc = (preenchidos / total) * 100;

    DOM.barra.style.width = perc + "%";
    DOM.barra.classList.toggle("barra-completa", perc === 100);
}
