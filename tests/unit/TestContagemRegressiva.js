
describe("Contagem regressiva", function() {

    it("Quando faltar mais de um dia, deve retornar frase no plural", function() {
        var data = new Date("August 3, 2014 00:00:00");        
        
        var frase = contagemRegressiva.frase(data);
        
        expect(frase).toBe("Faltam 118 dias");
    });
    
    it("Quando falta apenas um dia, deve retornar frase no singular", function() {
        var data = new Date("November 28, 2014 00:00:00");        
        
        var frase = contagemRegressiva.frase(data);
        
        expect(frase).toBe("Falta 1 dia");
    });    
    
    it("No dia do casamento, deve retornar frase do dia", function() {
        var data = new Date("November 29, 2014 00:00:00");        
        
        var frase = contagemRegressiva.frase(data);
        
        expect(frase).toBe("Chegou o dia!");
    });   
    
    
    it("Depois do casamento, deve retornar agradecimento", function() {
        var data = new Date("November 30, 2014 00:00:00");
        
        var frase = contagemRegressiva.frase(data);
        
        expect(frase).toBe("Obrigado pela presença!");
    });     
});