import { CONFIG } from "./config.js";
import { STATE } from "./state.js";
import { DOM } from "./dom.js";
import { registrarLog } from "./logger.js";
import { applyInstitutionalTheme, applyDarkModeStyles } from "./theme.js";
import { monitorarPrazos } from "./prazo.js";
import { setupEvents } from "./events.js";
import { updateFooter } from "./footer.js";

export async function init() {

    registrarLog("SISTEMA", "Iniciando carregamento DERSO...", "INFO");

    if (!DOM.loading || !DOM.formContent) {
        console.error("Elementos principais do DOM não encontrados.");
        return;
    }

    try {

        const [datasResp, listaResp] = await Promise.all([
            fetch(`${CONFIG.API_URL}?action=datas`),
            fetch(`${CONFIG.API_URL}?action=lista`)
        ]);

        if (!datasResp.ok || !listaResp.ok) {
            throw new Error("Erro na resposta da API");
        }

        const dResp = await datasResp.json();
        const lResp = await listaResp.json();

        STATE.employeeList = lResp || {};

        DOM.loading.classList.add("is-hidden");
        DOM.formContent.classList.remove("is-hidden");

        registrarLog("SISTEMA", "Dados sincronizados com sucesso", "SUCESSO");

        applyInstitutionalTheme();
        applyDarkModeStyles();

        if (dResp?.abertura && dResp?.fechamento) {
            monitorarPrazos(dResp.abertura, dResp.fechamento);
        } else {
            registrarLog(
                "PRAZO",
                "Datas de abertura/fechamento não recebidas",
                "AVISO"
            );
        }

        setupEvents();
        updateFooter();

    } catch (e) {

        registrarLog("FALHA_CRITICA", e.message, "ERRO");

        DOM.loading.innerHTML =
            "Falha crítica de comunicação com o servidor.";

        console.error("Erro na inicialização:", e);
    }
}
