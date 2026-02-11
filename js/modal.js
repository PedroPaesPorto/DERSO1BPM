export  function showModal(title, text, icon, color, showHistory = false) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalText').textContent = text;
        const iconDiv = document.getElementById('modalIcon');
        iconDiv.textContent = icon;
        iconDiv.style.color = color;
        DOM.historyContent.classList.toggle('is-hidden', !showHistory);
        DOM.modal.style.display = 'flex';
    }
