export function calcularTempoRestante(fechamento) {
    const agora = Date.now();
    const diff = fechamento - agora;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    return { diff, d, h, m, s };
}

