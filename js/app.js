import { carregarDadosIniciais } from "./api.js";
import { STATE } from "./state.js";
import { DOM } from "./dom.js";
import { registrarLog } from "./logger.js";
import { restaurarRascunho } from "./storage.js";
import { updateProgress } from "./progress.js";
import { handleSubmit } from "./submit.js";
import { showModal } from "./modal.js";

async function init() {
    registrarLog("SISTEMA", "Inicializando Sistema 5.0");

    try {
        await carregarSistema();
        restaurarFormulario();
        registrarEventos();

        updateProgress();

        registrarLog("SISTEMA", "Sistema iniciado com sucesso", "SUCESSO");
        console.log("Sistema 5.0 iniciado");

    } catch (e) {
        tratarErroCritico(e);
    }
}


/* ======================================
   CARREGAMENTO INICIAL
====================================== */

async function carregarSistema() {
    const dados = await carregarDadosIniciais();

    STATE.employeeList = dados?.lista || {};

    registrarLog(
        "DADOS",
        `Lista carregada com ${Object.keys(STATE.employeeList).length} registros`
    );
}


/* ======================================
   RESTAURAÇÃO DE RASCUNHO
====================================== */

function restaurarFormulario() {
    const draft = restaurarRascunho();

    if (!draft) return;

    Object.entries(draft).forEach(([key, value]) => {
        const field = DOM.form.elements[key];
        if (field) field.value = value;
    });

    registrarLog("RASCUNHO", "Rascunho restaurado automaticamente");
}


/* ======================================
   EVENTOS
====================================== */

function registrarEventos() {
    if (DOM.form) {
        DOM.form.addEventListener("submit", handleSubmit);
    }

    if (DOM.form) {
        DOM.form.addEventListener("input", () => {
            updateProgress();
        });
    }

    registrarLog("EVENTOS", "Eventos registrados");
}


/* ======================================
   ERRO CRÍTICO
====================================== */

function tratarErroCritico(e) {
    registrarLog("ERRO_CRITICO", e.message, "ERRO");

    showModal(
        "ERRO CRÍTICO",
        "Não foi possível carregar os dados iniciais do sistema.",
        "⚠️",
        "red"
    );

    console.error("Erro crítico:", e);
}


init();
