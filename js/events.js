export  function setupEvents() {
        DOM.email.oninput = (e) => {
    const val = e.target.value;
    const datalist = document.getElementById('emailProviders');
    datalist.innerHTML = "";

    if (val.includes("@")) {
        const prefix = val.split("@")[0];
        CONFIG.EMAIL_LIST.forEach(p => {
            datalist.innerHTML += `<option value="${prefix}@${p}">`;
        });
    }

    // ✅ FEEDBACK VISUAL DE VALIDAÇÃO
    DOM.email.classList.toggle(
        "valido",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    );

    updateProgress();
};

        DOM.matricula.onblur = () => {
            let val = DOM.matricula.value.trim();
            if (!val) return;
            if (val.length <= 6 && !val.startsWith("1000")) val = "1000" + val;
            DOM.matricula.value = val;
            
            if (STATE.employeeList[val]) {
                const militar = STATE.employeeList[val];
                DOM.nome.value = typeof militar === 'object' ? militar.nome : militar;
                document.getElementById('erroMatricula').style.display = "none";
                registrarLog("VALIDACAO", `Matrícula ${val} identificada`, "SUCESSO");
                
                // Dispara o tema institucional com a matrícula logada
                applyInstitutionalTheme(val);
            } else {
                DOM.nome.value = "";
                document.getElementById('erroMatricula').style.display = "block";
                registrarLog("VALIDACAO", `Matrícula ${val} não encontrada`, "AVISO");
                applyInstitutionalTheme(); // Volta ao tema padrão
            }
            updateProgress();
        };

        DOM.form.oninput = updateProgress;
        DOM.btnHistory.onclick = () => fetchHistory(DOM.matricula.value);
        DOM.btnHistoryFechado.onclick = () => fetchHistory(DOM.matriculaConsulta.value);
        document.getElementById('btnCloseModal').onclick = () => DOM.modal.style.display = 'none';
        DOM.form.onsubmit = handleSubmit;
    }

