import { CONFIG } from "./config.js";

export async function carregarDadosIniciais() {
    const [dResp, lResp] = await Promise.all([
        fetch(`${CONFIG.API_URL}?action=datas`).then(r => r.json()),
        fetch(`${CONFIG.API_URL}?action=lista`).then(r => r.json())
    ]);
    return { datas: dResp, lista: lResp };
}

export async function enviarFormulario(formData) {
    return fetch(CONFIG.API_URL, {
        method: "POST",
        body: formData
    }).then(r => r.json());
}

export async function buscarHistorico(matricula) {
    return fetch(`${CONFIG.API_URL}?action=historico&matricula=${matricula}`)
        .then(r => r.json());
}

