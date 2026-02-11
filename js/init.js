import { CONFIG } from "./config.js";
import { STATE } from "./state.js";
import { DOM } from "./dom.js";
import { registrarLog } from "./logger.js";
import { applyInstitutionalTheme, applyDarkModeStyles } from "./theme.js";
import { monitorarPrazos } from "./prazo.js";
import { setupEvents } from "./events.js";
import { updateFooter } from "./footer.js";

export async function init() {
    registrarLog("SISTEMA", "Iniciando carregamento DERSO...");

    try {
        const [dResp, lResp] = await Promise.all([
            fetch(`${CONFIG.API_URL}?action=datas`).then(r => r.json()),
            fetch(`${CONFIG.API_URL}?action=lista`).then(r => r.json())
        ]);

        STATE.employeeList = lResp;

        DOM.loading.classList.add('is-hidden');
        DOM.formContent.classList.remove('is-hidden');

        registrarLog("SISTEMA", "Dados sincronizados", "SUCESSO");

        applyInstitutionalTheme();
        monitorarPrazos(dResp.abertura, dResp.fechamento);
        setupEvents();
        updateFooter();
        applyDarkModeStyles();

    } catch (e) {
        registrarLog("FALHA_CRITICA", e.message, "ERRO");
        DOM.loading.innerHTML = "Falha crítica de comunicação.";
    }
}

