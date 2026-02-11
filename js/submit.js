import { DOM } from "./dom.js";
import { CONFIG } from "./config.js";
import { registrarLog } from "./logger.js";
import { showModal } from "./modal.js";
import { updateProgress } from "./progress.js";
import { STATE } from "./state.js";

export async function handleSubmit(e) {
    e.preventDefault();

    if (Date.now() - STATE.ultimoEnvio < 3000) return;
    STATE.ultimoEnvio = Date.now();

    DOM.btnEnviar.disabled = true;
    DOM.btnEnviar.textContent = "ENVIANDO...";

    const mLog = DOM.matricula.value;
    registrarLog("ENVIO", `Iniciando tentativa de envio para matrícula: ${mLog}`);

    try {
        const formData = new URLSearchParams(new FormData(DOM.form));

        const res = await fetch(CONFIG.API_URL, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);

        const response = await res.json();

        if (response.success) {
            registrarLog("ENVIO", `Solicitação de ${mLog} gravada com sucesso`, "SUCESSO");

            showModal("SUCESSO!", "Sua solicitação foi registrada no banco de dados.", "✔", "#2E7D32");

            DOM.data.value = "";
            document.querySelectorAll('input[name="folga"]').forEach(radio => radio.checked = false);

            updateProgress();

        } else {
            registrarLog("ENVIO_NEGADO", `Servidor recusou: ${response.message}`, "AVISO");

            if (response.message?.includes("duplicada")) {
                showModal("SOLICITAÇÃO DUPLICADA", "Você já solicitou folga para esta data.", "🚫", "orange");

                DOM.data.value = "";
                document.querySelectorAll('input[name="folga"]').forEach(radio => radio.checked = false);
                updateProgress();
            } else {
                showModal("AVISO", response.message || "Falha desconhecida.", "⚠️", "orange");
            }
        }

    } catch (err) {
        registrarLog("ENVIO_CRITICO", err.message, "ERRO");

        showModal(
            "ERRO DE CONEXÃO",
            "Não foi possível enviar sua solicitação. Verifique sua internet.",
            "📡",
            "red"
        );
    } finally {
        DOM.btnEnviar.disabled = false;
        DOM.btnEnviar.textContent = "ENVIAR SOLICITAÇÃO";
    }
}
