import { DOM } from "./dom.js";

export function showModal(title, text, icon, color, showHistory = false) {
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalIcon = document.getElementById('modalIcon');

    if (!DOM.modal || !DOM.historyContent || !modalTitle || !modalText || !modalIcon) return;

    modalTitle.textContent = title;
    modalText.textContent = text;

    modalIcon.textContent = icon;
    modalIcon.style.color = color;

    DOM.historyContent.classList.toggle('is-hidden', !showHistory);
    DOM.modal.style.display = 'flex';
}
