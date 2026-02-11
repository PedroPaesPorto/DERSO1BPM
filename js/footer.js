export function updateFooter() {
        const now = new Date();
        DOM.footer.textContent = `Desenvolvido na 1ª Cia do 1º BPM pelo PVSA Pedro Porto - versão ${CONFIG.VERSAO} - em ${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    }
