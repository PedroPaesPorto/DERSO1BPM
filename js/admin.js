import { STATE } from "./state.js";

export function abrirPainelAdmin() {
    alert(
        "LOGS DA SESSÃO\n\n" +
        STATE.sessionLogs.map(l =>
            `${l.data} - ${l.acao} - ${l.tipo}`
        ).join("\n")
    );
}

