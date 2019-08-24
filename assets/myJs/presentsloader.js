var categoriaAtual = null;

var categoriaCmb = {
    nome: "cmb",
    quantidade: 8
};

var categoriaEletro = {
    nome: "eletro",
    quantidade: 9
};

var categoriaUtils = {
    nome: "utils",
    quantidade: 10
};

var categorias = [categoriaCmb, categoriaEletro, categoriaUtils];
var quantidadeCategorias = categorias.length;

var spinner = $("#spinner-presentes");
var containerMaisPresentes = $("#mais-presentes");
var quantidadeTotal = 0;

function cargaInicialDePresentes() {
    $("#casasfreitas").popover({
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content">Av. Dom Luís, 281 <br/> <a href="http://www.casafreitas.com.br/site/lojas" target="_blank">Ver todos</a></div></div>'
    });    
    
    $("#paypal").popover({
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content">PayPal é um sistema que permite a transferência de dinheiro entre indivíduos ou negociantes usando um endereço de e-mail, evitando métodos tradicionais como cheques e boleto bancário.<br/> <a href="https://www.paypal.com/br/webapps/mpp/pay-online" target="_blank">Saber mais</a></div></div>'
    });
    
    configurarCategorias();
}

function carregarMaisPresentes() {
    containerMaisPresentes.hide();
    spinner.show();
    categoriaAtual = obterCategoriaAtual();

    var quantidadeExibida = obterQuantidadeExibida();
    var quantidadeAExibir = (Math.ceil(quantidadeExibida / 3) * 3) - quantidadeExibida;
    if (quantidadeAExibir === 0)
        quantidadeAExibir = 3;

    requisitarPresentes(containerMaisPresentes, "", 0, quantidadeAExibir);
}

function configurarCategorias() {
    configurarCategoria(categoriaCmb);
    configurarCategoria(categoriaEletro);
    configurarCategoria(categoriaUtils);
}

function configurarCategoria(categoria) {
    categoria.itensRestantes = [];
    for (var index = 1; index <= categoria.quantidade; index++) {
        categoria.itensRestantes.push(index);
    }

    shuffle(categoria.itensRestantes);
}

function obterQuantidadeExibida() {
    return $("#lista-presentes").children(":visible").length;
}

function obterCategoriaAtual() {
    var nomeSelecionado = $("a.active").data("filter");
    return obterCategoriaPor(nomeSelecionado);
}

function requisitarPresentes(container, dados, quantidadeAtual, quantidadeTotal) {
    var presente;
    try {
        presente = categoriaAtual === null ?
                obterPresente() :
                obterPresenteDaCategoria(categoriaAtual);
    }
    catch (ex) {
        exibirPresentes(container, dados);
        return;
    }

    $.ajax({
        url: presente.url,
        dataType: "html",
        success: function(item) {
            quantidadeAtual += 1;
            dados = dados + item;
            presente.categoria.itensRestantes.shift();

            if (quantidadeAtual < quantidadeTotal) {
                requisitarPresentes(container, dados, quantidadeAtual, quantidadeTotal);
            }
            else {
                exibirPresentes(container, dados);
            }
        },
        error: function() {
            requisitarPresentes(container, dados, quantidadeAtual, quantidadeTotal);
        }
    });
}

function exibirPresentes(container, dados) {
    spinner.hide();
    $(dados).appendTo("." + container.data("destination"));
    setTimeout(function() {
        configurarVisibilidadeBotao(categoriaAtual === null ? "todos" : categoriaAtual.nome);
    }, 700);

    $("img.lazy").lazyload({
        effect: "fadeIn",
        threshold: 300
    });
}

function obterPresente() {
    var categoria = obterCategoria();
    return obterPresenteDaCategoria(categoria);
}

function obterPresenteDaCategoria(categoria) {
    if (categoria.itensRestantes.length <= 0)
        throw "Não há mais presentes";

    var nome = categoria.nome;
    var codigoPresente = categoria.itensRestantes[0];

    return {
        url: "pages/presentes/" + nome + "/item" + codigoPresente + ".min.html",
        id: codigoPresente,
        categoria: categoria
    };
}

function obterCategoria() {
    var index = Math.floor((Math.random() * quantidadeCategorias) + 1) - 1;
    var categoria = categorias[index];
    var tentativas = 1;

    while (categoria.itensRestantes.length === 0) {
        tentativas += 1;
        if (tentativas > quantidadeCategorias)
            throw "Não há mais presentes";

        index += 1;
        categoria = categorias[index % quantidadeCategorias];
    }

    return categoria;
}

function obterCategoriaPor(nome) {
    switch (nome) {
        case "cmb":
            return categoriaCmb;
        case "utils":
            return categoriaUtils;
        case "eletro":
            return categoriaEletro;
        default:
            return null;
    }
}

function configurarVisibilidadeBotao(nomeCategoria) {
    var botaoVisivel = true;
    var categoria = obterCategoriaPor(nomeCategoria);
    
    if (categoria !== null) {
        botaoVisivel = categoria.itensRestantes.length > 0;
    }
    else {
        botaoVisivel = false;
        for(var index = 0; index < categorias.length; index ++) {
            if(categorias[index].itensRestantes.length > 0) {
                botaoVisivel = true;
                break;
            }
        }
    }
    
    if(botaoVisivel) containerMaisPresentes.show();
    else containerMaisPresentes.hide();
}