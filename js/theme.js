function applyDarkModeStyles() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            registrarLog("INTERFACE", "Modo Noturno detectado e aplicado");
            const style = document.createElement('style');
            style.innerHTML = `
                @media (prefers-color-scheme: dark) {
                    body { background-color: #121212; color: #e0e0e0; }
                    .container { background: #1e1e1e; border: 1px solid #333; }
                    input:not([type="radio"]), select, textarea { 
                        background: #2d2d2d !important; color: #fff !important; border-color: #444 !important; 
                    }
                    .radio-group label { background: #2d2d2d; border-color: #444; color: #eee; }
                    .subtitle { color: #bbb; }
                    #prazoBox { box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
                }
            `;
            document.head.appendChild(style);
        }
    }


function applyInstitutionalTheme(matriculaLogada = null) {
    const hoje = new Date();
    const diaAtual = hoje.getDate();
    const mesAtual = hoje.getMonth();
    const chaveHoje = `${diaAtual}-${mesAtual + 1}`;
    
    // Mês de referência (Mês seguinte para a escala)
    const dataRef = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);
    const mesReferencia = dataRef.getMonth(); 

    const instDiv = document.getElementById("instMessage");
    const aplicar = (msg) => instDiv.innerHTML = msg;

    // 1. PRIORIDADE MÁXIMA: Aniversário do Combatente Logado
    if (matriculaLogada && STATE.employeeList[matriculaLogada]) {
        const militar = STATE.employeeList[matriculaLogada];
        if (militar.niver === chaveHoje) {
            const primeiroNome = (militar.nome || "").split(' ')[0];
            return aplicar(`🎂 <b>Parabéns, ${primeiroNome}!</b> O 1º BPM celebra seu dia. Saúde e vida longa, combatente! 🫡`);
        }
    }

    // 2. PRIORIDADE MÉDIA: Datas Comemorativas (Hoje)
    const temasPontuais = {
        "4-1": `🌳 Rondônia: ${hoje.getFullYear() - 1982} anos de história e bravura.`,
       "10-2": "🌸 10 de Fevereiro: Dia da Policial Militar. Nossa continência àquelas que, com fibra e delicadeza, honram a farda da PMRO e protegem nossa sociedade. Orgulho do 1º BPM! 🫡",
        "1-5": "🛠️ Dia do Trabalhador: O serviço público move a cidadania.",
        "7-9": "🇧🇷 7 de Setembro: Independência se constrói com Ordem e Progresso.",
        "7-12": `🛡️ 1º BPM: O Sentinela da Capital. ${hoje.getFullYear() - 1983} anos de compromisso.`
    };

    if (temasPontuais[chaveHoje]) {
        return aplicar(temasPontuais[chaveHoje]);
    }

    // 3. PADRÃO: Mensagem Mensal (Baseada no Mês da Escala - Mês Seguinte)
    const mensais = {
        0: "🎭 Janeiro: Planejamento estratégico para o novo ano.",
        1: "🎊 Fevereiro: Foco e prevenção na segurança dos eventos.",
        2: "🌷 Março: Homenagem às mulheres que honram a farda.",
        3: "🕊️ Abril: Tempo de renovação e fortalecimento da união.",
        4: "🤱 Maio: Mães, a base de tudo. Reconhecemos sua missão.",
        5: "🔥 Junho: Valorizando a cultura e as tradições locais.",
        6: "👮 Julho: Disciplina e prontidão no policiamento ostensivo.",
        7: "👔 Agosto: A presença familiar é o alicerce do profissional.",
        8: "🇧🇷 Setembro: Renovando nosso juramento de servir e proteger.",
        9: "🎗️ Outubro: Prevenção é o melhor caminho para a saúde.",
        10: "📜 Novembro: Compromisso com os ideais da República.",
        11: "🎄 Dezembro: Planejamento garante um final de ano seguro. ✨"
    };

    aplicar(mensais[mesReferencia] || "DERSO 1º BPM");
}
