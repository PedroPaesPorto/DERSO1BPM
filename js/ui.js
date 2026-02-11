import { DOM } from "./dom.js";

/* ======================================
   LOADING
====================================== */

export function showLoading(message = "Carregando...") {
    if (!DOM.loading) return;

    DOM.loading.textContent = message;
    DOM.loading.classList.remove("is-hidden");

    if (DOM.formContent) {
        DOM.formContent.classList.add("is-hidden");
    }
}

export function hideLoading() {
    if (!DOM.loading) return;

    DOM.loading.classList.add("is-hidden");

    if (DOM.formContent) {
        DOM.formContent.classList.remove("is-hidden");
    }
}


/* ======================================
   MODAL
====================================== */

export function closeModal() {
    if (!DOM.modal) return;
    DOM.modal.style.display = "none";
}

export function toggleHistory(show = false) {
    if (!DOM.historyContent) return;
    DOM.historyContent.classList.toggle("is-hidden", !show);
}


/* ======================================
   BLOQUEIO VISUAL DO FORMULÁRIO
====================================== */

export function lockForm() {
    if (!DOM.form) return;
    DOM.form.classList.add("form-locked");
}

export function unlockForm() {
    if (!DOM.form) return;
    DOM.form.classList.remove("form-locked");
}


/* ======================================
   FEEDBACK VISUAL RÁPIDO
====================================== */

export function flashElement(element, duration = 800) {
    if (!element) return;

    element.classList.add("ui-flash");

    setTimeout(() => {
        element.classList.remove("ui-flash");
    }, duration);
}

export function shakeElement(element, duration = 600) {
    if (!element) return;

    element.classList.add("ui-shake");

    setTimeout(() => {
        element.classList.remove("ui-shake");
    }, duration);
}


/* ======================================
   SCROLL
====================================== */

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

export function scrollToElement(element) {
    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* ======================================
   BOTÃO COM ESTADO TEMPORÁRIO
====================================== */

export function setButtonLoading(button, text = "Processando...") {
    if (!button) return;

    button.dataset.originalText = button.textContent;
    button.disabled = true;
    button.textContent = text;
}

export function restoreButton(button) {
    if (!button) return;

    button.disabled = false;
    button.textContent = button.dataset.originalText || "ENVIAR";
}

