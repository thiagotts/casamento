
describe("Obter url de presentes", function() {
    var urlBase = "pages/presentes/";

    it("Quando categorias tiver mais de um item restante, deve retornar url aleatoria", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        var itensOriginais = categoriaCmb.itensRestantes;
        categoriaCmb.itensRestantes = [1, 2, 3];

        var presente = obterPresente();

        expect(presente).toBeDefined();
        expect(presente.url).toBeDefined();
        expect(categoriaCmb.itensRestantes).toContain(presente.id);
        expect(presente.categoria).toBe(categoriaCmb);

        categoriaCmb.itensRestantes = itensOriginais;
    });

    it("Quando categoria tiver apenas um item, deve retornar url do item", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        var itensOriginais = categoriaCmb.itensRestantes;
        categoriaCmb.itensRestantes = [999];

        var presente = obterPresente();

        expect(presente).toBeDefined();
        expect(presente.url).toBe(urlBase + "cmb/item999.html");
        expect(presente.id).toBe(999);
        expect(presente.categoria).toBe(categoriaCmb);

        categoriaCmb.itensRestantes = itensOriginais;
    });


    it("Quando nenhuma categoria tiver itens restantes, deve lancar excecao", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        spyOn(categoriaCmb, 'itensRestantes').andReturn([]);

        expect(obterPresente).toThrow();
    });
});


describe("Obter url de presentes por categoria", function() {
    var urlBase = "pages/presentes/";

    it("Quando categoria tiver mais de um item restante, deve retornar url aleatoria", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        var itensOriginais = categoriaCmb.itensRestantes;
        categoriaCmb.itensRestantes = [1, 2, 3];

        var presente = obterPresenteDaCategoria(categoriaCmb);

        expect(presente).toBeDefined();
        expect(presente.url).toBeDefined();
        expect(categoriaCmb.itensRestantes).toContain(presente.id);
        expect(presente.categoria).toBe(categoriaCmb);

        categoriaCmb.itensRestantes = itensOriginais;
    });

    it("Quando categoria tiver apenas um item, deve retornar url do item", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        var itensOriginais = categoriaCmb.itensRestantes;
        categoriaCmb.itensRestantes = [999];

        var presente = obterPresenteDaCategoria(categoriaCmb);

        expect(presente).toBeDefined();
        expect(presente.url).toBe(urlBase + "cmb/item999.html");
        expect(presente.id).toBe(999);
        expect(presente.categoria).toBe(categoriaCmb);

        categoriaCmb.itensRestantes = itensOriginais;
    });


    it("Quando categoria tiver itens restantes, deve lancar excecao", function() {
        spyOn(categoriaCmb, 'itensRestantes').andReturn([]);

        var acao = function() {
            obterPresenteDaCategoria(categoriaCmb);
        };

        expect(acao).toThrow();
    });
});