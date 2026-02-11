export function salvarRascunho(dados) {
    localStorage.setItem("dersoDraft", JSON.stringify(dados));
}

export function restaurarRascunho() {
    return JSON.parse(localStorage.getItem("dersoDraft"));
}

