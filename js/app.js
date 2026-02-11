import { carregarDadosIniciais } from "./api.js";
import { STATE } from "./state.js";

async function init() {
    try {
        const dados = await carregarDadosIniciais();
        STATE.employeeList = dados.lista;
        console.log("Sistema 5.0 iniciado");
    } catch (e) {
        console.error("Erro crítico:", e);
    }
}

init();

