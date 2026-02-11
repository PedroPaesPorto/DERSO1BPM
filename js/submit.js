export  async function handleSubmit(e) {
    e.preventDefault();
    DOM.btnEnviar.disabled = true;
    DOM.btnEnviar.textContent = "ENVIANDO...";
    
    const mLog = DOM.matricula.value;
    registrarLog("ENVIO", `Iniciando tentativa de envio para matrícula: ${mLog}`);

    try {
        const formData = new URLSearchParams(new FormData(DOM.form));
        const response = await fetch(CONFIG.API_URL, { method: 'POST', body: formData }).then(r => r.json());

        if (response.success) {
            registrarLog("ENVIO", `Solicitação de ${mLog} gravada com sucesso`, "SUCESSO");
            showModal("SUCESSO!", "Sua solicitação foi registrada no banco de dados.", "✔", "#2E7D32");
            
            // --- ALTERAÇÃO PARA CELERIDADE: RESET SELETIVO ---
            DOM.data.value = ""; // Limpa a data
            document.querySelectorAll('input[name="folga"]').forEach(radio => radio.checked = false); // Desmarca a folga
            
            updateProgress();
        } else {
            registrarLog("ENVIO_NEGADO", `Servidor recusou: ${response.message}`, "AVISO");
            if (response.message.includes("duplicada")) {
                showModal("SOLICITAÇÃO DUPLICADA", "Você já solicitou folga para esta data.", "🚫", "orange");
                
                // Limpa apenas a data e folga também em caso de duplicidade para ele tentar outra
                DOM.data.value = "";
                document.querySelectorAll('input[name="folga"]').forEach(radio => radio.checked = false);
                updateProgress();
            } else {
                showModal("AVISO", response.message, "⚠️", "orange");
            }
        }
    } catch (err) {
        registrarLog("ENVIO_CRITICO", err.message, "ERRO");
        showModal("ERRO DE CONEXÃO", "Não foi possível enviar sua solicitação. Verifique sua internet.", "📡", "red");
    } finally {
        DOM.btnEnviar.disabled = false;
        DOM.btnEnviar.textContent = "ENVIAR SOLICITAÇÃO";
    }
}
