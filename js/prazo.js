export function monitorarPrazos(dataAbertura, dataFechamento) {
    const abertura = new Date(dataAbertura).getTime();
    const fechamento = new Date(dataFechamento).getTime();
    const hoje = new Date();
    
    // --- LÓGICA DO MÊS SEGUINTE ---
    const mesSeguinte = hoje.getMonth() + 1;
    const ano = hoje.getFullYear();
    const dataMinima = new Date(ano, mesSeguinte, 1);
    const dataMaxima = new Date(ano, mesSeguinte + 1, 0); // Último dia do mês seguinte
    
    // Formatação para o atributo 'min' e 'max' (YYYY-MM-DD)
    const minStr = dataMinima.toISOString().split('T')[0];
    const maxStr = dataMaxima.toISOString().split('T')[0];
    
    DOM.data.min = minStr;
    DOM.data.max = maxStr;
    
    // ALTERAÇÃO PARA CELERIDADE: O campo inicia vazio para exibir dd/mm/aaaa
    DOM.data.value = ""; 

    // Adiciona o texto informativo abaixo da data
    let infoData = document.getElementById('infoPeriodo');
    if (!infoData) {
        infoData = document.createElement('small');
        infoData.id = 'infoPeriodo';
        infoData.style.display = 'block';
        infoData.style.marginTop = '5px';
        infoData.style.color = '#666';
        DOM.data.parentNode.appendChild(infoData);
    }
    infoData.innerHTML = `📅 Período permitido: <b>${dataMinima.toLocaleDateString('pt-BR')}</b> a <b>${dataMaxima.toLocaleDateString('pt-BR')}</b>`;

    const nomeMesRef = dataMinima.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
    const ultimoDiaMes = dataMaxima.getTime();

    setInterval(() => {
        const agora = new Date().getTime();
        const instDiv = document.getElementById("instMessage");
        
        DOM.prazoBox.classList.remove('estado-verde', 'estado-alerta', 'estado-urgente', 'estado-critico', 'estado-sucesso', 'estado-inspecao');

        if (agora < abertura) {
            STATE.isClosed = true;
            DOM.form.style.display = "none";
            instDiv.style.display = "none";
            DOM.prazoBox.classList.add('estado-inspecao');
            
            const diff = abertura - agora;
            const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000),
                  m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);
            
            DOM.timerDisplay.innerHTML = `
                <b style="color:#1A3C6E">ESTAMOS PASSANDO EM INSPEÇÃO AO CÓDIGO.</b><br>
                <p style="margin: 10px 0;">Voltamos em: <br>
                <span style="font-size:1.1rem; font-weight:bold;">${d}d ${h}h ${m}m ${s}s</span></p>
                <span style="font-size:24px;">🫡👮‍♂️</span>`;
        } 
        else if (agora > fechamento) {
            STATE.isClosed = true;
            DOM.form.style.display = "none";
            instDiv.style.display = "none";
            
            if (agora <= ultimoDiaMes) {
                DOM.consultaFechada.style.display = "block";
                DOM.btnHistoryFechado.style.display = "block";
                DOM.prazoBox.classList.add('estado-sucesso');
                DOM.timerDisplay.innerHTML = `
                    <div style="padding:10px;">
                        <b style="color:#2E7D32">MISSÃO CUMPRIDA!</b><br>
                        <p style="font-size:14px; margin: 10px 0; line-height:1.4;">
                            AS SOLICITAÇÕES DE DERSO PARA O MÊS DE <b>${nomeMesRef}</b> <br>
                            FORAM ENCERRADAS EM <b>${new Date(fechamento).toLocaleString("pt-BR")}</b>.
                        </p>
                        <p style="font-size:13px; color:#555;">Você ainda pode consultar suas solicitações abaixo: 👮‍♂️</p>
                    </div>`;
            } else {
                DOM.consultaFechada.style.display = "none";
                DOM.timerDisplay.innerHTML = "⌛ Aguardando novo cronograma de escalas...";
            }
        } 
        else {
            STATE.isClosed = false;
            DOM.form.style.display = "block";
            instDiv.style.display = "block";
            
            const diff = fechamento - agora;
            const d = Math.floor(diff / 86400000), h = Math.floor((diff % 86400000) / 3600000),
                  m = Math.floor((diff % 3600000) / 60000), s = Math.floor((diff % 60000) / 1000);

            // --- LÓGICA DE URGÊNCIA ATUALIZADA ---
            if (diff < 7200000) { // Menos de 2 horas (CRÍTICO)
                DOM.prazoBox.classList.add('estado-critico');
                DOM.timerDisplay.innerHTML = `🔥 <b>EMERGÊNCIA: TEMPO ACABANDO!</b><br>Fecha em: <b>${h}h ${m}m ${s}s</b>`;
            } else if (diff < 21600000) { // Menos de 6 horas (URGENTE)
                DOM.prazoBox.classList.add('estado-urgente');
                DOM.timerDisplay.innerHTML = `⚠️ <b>RÁPIDO! O TEMPO ESTÁ ACABANDO</b><br>Resta apenas: <b>${h}h ${m}m ${s}s</b>`;
            } else if (diff < 86400000) { // Menos de 24 horas (ALERTA)
                DOM.prazoBox.classList.add('estado-alerta');
                DOM.timerDisplay.innerHTML = `⏳ <b>SISTEMA FECHA EM BREVE</b><br>Tempo restante: ${h}h ${m}m ${s}s`;
            } else { // VERDE
                DOM.prazoBox.classList.add('estado-verde');
                DOM.timerDisplay.innerHTML = `⚡ <b>OPERACIONAL ATIVO</b><br><small>Encerra em: ${d}d ${h}h ${m}m ${s}s</small>`;
            }
        }
    }, 1000);
}

