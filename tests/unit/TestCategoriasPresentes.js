describe("Variavel categorias", function() {
    configurarCategorias();
    
    it("Deve possuir o nome de todas as categorias", function() {
        expect(categorias.length).toBe(quantidadeCategorias);
        expect(categorias).toContain(categoriaUtils);
        expect(categorias).toContain(categoriaEletro);
        expect(categorias).toContain(categoriaCmb);
    });
});

describe("Categoria de cama mesa e banho", function() {
    it("Nome deve ser cmb", function() {
        var nome = categoriaCmb.nome;

        expect(nome).toBe("cmb");
    });

    it("Deve pussuir itens restantes", function() {
        var itensRestantes = categoriaCmb.itensRestantes;

        expect(itensRestantes).toBeDefined();
        expect(itensRestantes.length).toBeGreaterThan(0);
    });
});

describe("Categoria de eletrodomesticos", function() {
    it("Nome deve ser eletro", function() {
        var nome = categoriaEletro.nome;

        expect(nome).toBe("eletro");
    });

    it("Deve pussuir itens restantes", function() {
        var itensRestantes = categoriaEletro.itensRestantes;

        expect(itensRestantes).toBeDefined();
        expect(itensRestantes.length).toBeGreaterThan(0);
    });
});

describe("Categoria de utilidades", function() {
    it("Nome deve ser utils", function() {
        var nome = categoriaUtils.nome;

        expect(nome).toBe("utils");
    });

    it("Deve pussuir itens restantes", function() {
        var itensRestantes = categoriaUtils.itensRestantes;

        expect(itensRestantes).toBeDefined();
        expect(itensRestantes.length).toBeGreaterThan(0);
    });
});

describe("Metodo obter categoria por nome", function() {
    it("Deve retornar categoria de eletromesticos", function() {
        var categoria = obterCategoriaPor("eletro");

        expect(categoria).toBe(categoriaEletro);
    });
    
    it("Deve retornar categoria de cama mesa e banho", function() {
        var categoria = obterCategoriaPor("cmb");

        expect(categoria).toBe(categoriaCmb);
    });
    
    it("Deve retornar categoria de utilidades", function() {
        var categoria = obterCategoriaPor("utils");

        expect(categoria).toBe(categoriaUtils);
    });    
});

describe("Metodo obter categoria aleatoria", function() {
    it("Quando todas categorias tiverem itens restantes, deve retornar categoria aleatoria", function() {
        var categoria = obterCategoria();

        expect(categoria).toBeDefined();
        expect(categoria.nome).toBeDefined();
        expect(categoria.itensRestantes).toBeDefined();
    });
    
    it("Quando apenas categoria utilidades tiver itens restantes, retornar categoria utilidades", function() {
        spyOn(categoriaCmb, 'itensRestantes').andReturn([]);
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);   
        
        var categoria = obterCategoria();

        expect(categoria).toBe(categoriaUtils);
    });   
    
    it("Quando apenas categoria eletrodomesticos tiver itens restantes, retornar categoria eletrodomesticos", function() {
        spyOn(categoriaCmb, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]); 
        
        var categoria = obterCategoria();

        expect(categoria).toBe(categoriaEletro);
    });   
    
    it("Quando apenas categoria cama mesa e banho tiver itens restantes, retornar categoria cama mesa e banho", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);   
        
        var categoria = obterCategoria();

        expect(categoria).toBe(categoriaCmb);
    });   
    
    it("Quando nenhuma categoria tiver itens restantes, deve lancar excecao", function() {
        spyOn(categoriaEletro, 'itensRestantes').andReturn([]);
        spyOn(categoriaUtils, 'itensRestantes').andReturn([]);
        spyOn(categoriaCmb, 'itensRestantes').andReturn([]);    
        
        expect(obterCategoria).toThrow();
    });     
});