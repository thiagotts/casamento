var contagemRegressiva = {
    frase: function(dataAtual) {
        var dataDoCasamento = new Date("November 29, 2014 23:59:59");

        var diasRestantes = parseFloat((dataDoCasamento - dataAtual) / (24 * 3600 * 1000));

        if (diasRestantes >= 2) {
            return "Faltam " + parseInt(diasRestantes) + " dias";
        }
        else if (diasRestantes >= 1) {
            return "Falta " + parseInt(diasRestantes) + " dia";
        }
        else if (diasRestantes >= 0 && diasRestantes < 1) {
            return "Chegou o dia!";
        }
        else if (diasRestantes < 0) {
            return "Obrigado pela presença!";
        }
    }
};