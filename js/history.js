export async function fetchHistory(mat) {
        if (!mat) {
            registrarLog("PESQUISA", "Tentativa de consulta sem matrícula", "AVISO");
            return showModal("AVISO", "Insira a matrícula para consultar.", "📂", "#FFD700");
        }
        registrarLog("PESQUISA", `Buscando histórico para: ${mat}`);
        showModal("CONSULTANDO", "Buscando seus registros...", "⏳", "#1A3C6E");
        try {
            const r = await fetch(`${CONFIG.API_URL}?action=historico&matricula=${mat}`).then(res => res.json());
            if (r.dados && r.dados.length > 0) {
                registrarLog("PESQUISA", `${r.dados.length} registros encontrados para ${mat}`, "SUCESSO");
                const html = r.dados.map(i => `<div class="historico-item"><span>📅 ${i.data}</span><b>${i.folga}</b></div>`).join('');
                DOM.historyContent.innerHTML = html;
                showModal(r.nome || "REGISTROS", "Solicitações encontradas:", "📋", "#1A3C6E", true);
            } else {
                registrarLog("PESQUISA", `Nenhum registro encontrado para ${mat}`, "INFO");
                showModal("NADA ENCONTRADO", "Não há registros para esta matrícula.", "🔎", "#777");
            }
        } catch (e) {
            registrarLog("PESQUISA_FALHA", e.message, "ERRO");
            showModal("ERRO", "Falha na comunicação com o banco de dados.", "❌", "red");
        }
    }
