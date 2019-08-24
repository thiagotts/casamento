///#source 1 1 /source/assets/myJs/casamento.js
(function ($) {
    var $window = $(window);
    var windowHeight = $window.height();

    $window.resize(function () {
        windowHeight = $window.height();
        alinharLocais($window.width());
    });

    $.fn.fixedonlater = function (options) {

        var defaults = {
            speedDown: 250,
            speedUp: 100
        };
        var options = $.extend(defaults, options);
        var o = options;

        var $obj = $(this);


        function update() {
            windowScrollTop = $window.scrollTop();

            $obj.each(function () {
                var $this = $(this);
                var $thisHeight = $this.outerHeight();

                if (windowScrollTop > (windowHeight - $thisHeight)) {
                    $("#menu-fixo").hide();
                    if ($this.css('opacity') === "0") {
                        $this.animate({
                            top: "0",
                            opacity: '1'
                        }, {
                            queue: false,
                            duration: o.speedDown
                        });
                    }
                } else {
                    $("#menu-fixo").show();
                    $this.animate({
                        top: -$thisHeight,
                        opacity: '0'
                    }, {
                        queue: false,
                        duration: o.speedUp
                    });
                }
            });
        }
        ;

        $window.bind('scroll', update).resize(update);
        update();
    };
})(jQuery);


(function ($) {
    var $window = $(window);
    var $getVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com']");

    $.fn.responsivevideos = function () {

        function update() {
            $getVideos.each(function () {
                var $this = $(this);

                wrapperWidth = $this.parent().width() * 0.7;
                currentHeight = $this.height();
                currentWidth = $this.width();

                currentAspectRation = currentHeight / currentWidth;

                $this.removeAttr('height').removeAttr('width');
                $this.width(wrapperWidth).height(parseInt(currentAspectRation * wrapperWidth));

            });
        }
        ;


        $(document).ajaxComplete(function () {
            update();
        });
        $window.bind('resize', update);
        update();
    };
})(jQuery);

function alinharLocais(windowWidth) {
    alinharLocal(windowWidth, "cerimonia");
    alinharLocal(windowWidth, "recepcao");

}

function alinharLocal(windowWidth, evento) {
    if (windowWidth > 767) {
        var alturaFoto = $("#foto-cerimonia").height();
        var alturaInfo = alturaFoto / 3.25;
        $("#local-" + evento).css("padding-top", alturaInfo + "px");
        $("#hora-" + evento).css("padding-top", alturaInfo + "px");
        $("#foto-" + evento).css("padding-top", "");
        $("#foto-" + evento).css("padding-bottom", "");
    }
    else {
        $("#local-" + evento).css("padding-top", "");
        $("#hora-" + evento).css("padding-top", "");
        $("#foto-" + evento).css("padding-top", "30px");
        $("#foto-" + evento).css("padding-bottom", "30px");
    }
}

function mostrarProgressBar() {
    if ($(".loading").length == 0) {
        $("body").append('<div class="loading"><div class="progress progress-striped active" style="height: 10px;"><div class="bar"></div></div></div>');
        $(".loading").slideDown();
        $(".loading .progress .bar").delay(300).css("width", "100%");
    }
}

function ocultarProgressBar() {
    $(".loading").delay(1000).slideUp(500, function () {
        $(this).remove();
    });
}

function mostrarVideoInicial(larguraTela) {
    var ieAntigo = $("body").hasClass("oldie");

    if (larguraTela <= 400) {
        $('#page-welcome').css('background', 'url(assets/images/pages/home/bg0.jpg) 55% 0 no-repeat fixed');
    }
    else if (larguraTela <= 700) {
        $('#page-welcome').css('background', 'url(assets/images/pages/home/bg.jpg) 55% 0 no-repeat fixed');
    }
    else if (larguraTela <= 1080 || ieAntigo) {
        $('#page-welcome').css('background', 'url(assets/images/pages/home/bg1.jpg) 45% 0 no-repeat fixed');
    }
    else {
        var $pagewelcome = $('#page-welcome');
        $pagewelcome.append('<div class="video-overlay"></div>');

        var index = Math.floor((Math.random() * 2) + 1);
        $pagewelcome.videoBG({
            mp4: 'assets/videos/pages/home/outgrayslow' + index + '.mp4',
            webm: 'assets/videos/pages/home/outgrayslow' + index + '.webm',
            poster: 'assets/videos/pages/home/outgray' + index + '.jpg',
            scale: true,
            zIndex: 0,
            autoplay: true,
            loop: true
        });
    }
}

function configurarGaleria(idContainer) {
    document.getElementById(idContainer).onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
                link = target.src ? target.parentNode : target,
                options = { index: link, event: event },
        links = $("#" + idContainer).children().filter(":visible");
        blueimp.Gallery(links, options);
    };
}

function exibirGaleria() {
    adicionarFotosDoCasamento();
    adicionarFotosDosNoivos();
    adicionarFotosDoCha();

    $('#container-fotos').mixitup({
        targetSelector: '.pics',
        filterSelector: '.gallery-filter',
        sortSelector: '.sort',
        buttonEvent: 'click',
        effects: ['fade', 'rotateY'],
        listEffects: null,
        easing: 'smooth',
        layoutMode: 'grid',
        targetDisplayGrid: 'inline-block',
        targetDisplayList: 'block',
        gridClass: '',
        listClass: '',
        transitionSpeed: 600,
        showOnLoad: 'casamento',
        sortOnLoad: false,
        multiFilter: false,
        filterLogic: 'or',
        resizeContainer: true,
        minHeight: 0,
        failClass: 'fail',
        perspectiveDistance: '3000',
        perspectiveOrigin: '50% 50%',
        animateGridList: true,
        onMixLoad: null,
        onMixStart: null,
        onMixEnd: configurarGaleria('container-fotos')
    });
}

function adicionarFotosDoCasamento() {
    adicionarFotos(148, "casamento", false);
}

function adicionarFotosDosNoivos() {
    adicionarFotos(34, "noivos", true);
}

function adicionarFotosDoCha() {
    adicionarFotos(45, "cha", true);
}

function adicionarFotos(quantidadeFotos, nomeCategoria, deveEmbaralhar) {
    var numerosFotos = [];
    for (var index = 1; index <= quantidadeFotos; index++) {
        numerosFotos.push(index);
    }

    if (deveEmbaralhar) numerosFotos = shuffle(numerosFotos);
    var $containerGaleria = $("#container-fotos");
    for (var index = 0; index < quantidadeFotos; index++) {
        var numeroFoto = numerosFotos[index];
        $containerGaleria.append('<a href="pages/galeria/img/' + nomeCategoria + '/' +
                numeroFoto + '.JPG" class="pics ' + nomeCategoria + '"><img class="lazy" data-original="pages/galeria/img/' +
                nomeCategoria + '/thumbnails/' + numeroFoto + '.JPG" alt=""></a>');
    }
}

function configurarConteudoDaTimeLine() {
    configurarGaleria("fotos-taiba");
    configurarGaleria("fotos-blumenau");
    configurarGaleria("fotos-oktoberfest");
    configurarGaleria("fotos-lolla");
    configurarVideo("video-dois-anos", "http://player.vimeo.com/video/107434031?portrait=0");
    configurarVideo("video-pedido", "http://player.vimeo.com/video/103098896?portrait=0");
}

function configurarVideo(idContainer, url) {
    $("#" + idContainer).html('<iframe src="' + url + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
}

function definirBackgroundsDasSecoes(larguraTela) {
    if (larguraTela <= 700) {
        $("#cerimonia").css("background", "url(assets/images/pages/cerimonia/bgmobmin.jpg) 50% 20% no-repeat fixed");
        $("#rsvp").css("background", "url(assets/images/pages/rsvp/bgmob.jpg) 20% 20% no-repeat fixed");
        $("#mensagens").css("background", "url(assets/images/pages/mensagens/bgmobmin.jpg) 50% 0 no-repeat fixed");
        $("#prerodape").css("background", "url(assets/images/pages/prerodape/bgmob.jpg) 50% 0 no-repeat fixed");
    }
    else if (larguraTela <= 1080) {
        $("#cerimonia").css("background", "url(assets/images/pages/cerimonia/bgmob.jpg) 70% -30% no-repeat fixed");
        $("#rsvp").css("background", "url(assets/images/pages/rsvp/bgmob.jpg) 20% 20% no-repeat fixed");
        $("#mensagens").css("background", "url(assets/images/pages/mensagens/bgmob.jpg) 50% no-repeat fixed");
        $("#prerodape").css("background", "url(assets/images/pages/prerodape/bgmob.jpg) 50% 0 no-repeat fixed");
    } else if (larguraTela <= 1601) {
        $("#cerimonia").css("background", "url(assets/images/pages/cerimonia/bg.jpg) 50% 20% no-repeat fixed");
        $("#rsvp").css("background", "url(assets/images/pages/rsvp/bg.jpg) 30% 0 no-repeat fixed");
        $("#mensagens").css("background", "url(assets/images/pages/mensagens/bg.jpg) 50% 0 no-repeat fixed");
        $("#prerodape").css("background", "url(assets/images/pages/prerodape/bg.jpg) 50% 0 no-repeat fixed");
    } else {
        $("#cerimonia").css("background", "url(assets/images/pages/cerimonia/bgbig.jpg) 50% 20% no-repeat fixed");
        $("#rsvp").css("background", "url(assets/images/pages/rsvp/bgbig.jpg) 30% 0 no-repeat fixed");
        $("#mensagens").css("background", "url(assets/images/pages/mensagens/bgbig.jpg) 50% 0 no-repeat fixed");
        $("#prerodape").css("background", "url(assets/images/pages/prerodape/bgbig.jpg) 50% 0 no-repeat fixed");
    }
}

$(document).ready(function () {
    window.onscroll = OnScrollPagina;
    var larguraTela = $(window).width();
    mostrarVideoInicial(larguraTela);
    $("#contagem").text(contagemRegressiva.frase(new Date()));


    window.onload = function () {
        configurarConteudoDaTimeLine();
        definirBackgroundsDasSecoes(larguraTela);

        alinharLocais(larguraTela);
        configurarMapaDaCerimonia();
        configurarMapaDaRecepcao();

        cargaInicialDePresentes();

        configurarSubmissaoDeMensagem();
        exibirMensagens();

        exibirGaleria();

        $("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 300
        });
    }
});

///#source 1 1 /source/assets/myJs/contagemRegressiva.js
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
///#source 1 1 /source/assets/myJs/mapas.js
var marcadorCerimonia, marcadorRecepcao, rotaCerimonia, rotaRecepcao, mapaRecepcao, mapaCerimonia;
var zoomAtivado = false;

function configurarMapaDaCerimonia() {
    mapaCerimonia = new GMaps({
        div: '#mapa-cerimonia',
        lat: -3.7308473,
        lng: -38.5171216
    });

    google.maps.event.addListener(mapaCerimonia.map, 'click', function(event) {
        this.setOptions({scrollwheel: true});
        zoomAtivado = true;
    });

    var marcadorCristoRei = {
        lat: -3.7308473,
        lng: -38.5171216,
        title: 'Paróquia Cristo Rei'
    };
    mapaCerimonia.addMarker(marcadorCristoRei);

    $('#formulario-cerimonia').submit(function(e) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#texto-cerimonia').val().trim(),
            callback: function(results, status) {
                if (status === 'OK') {
                    var latlng = results[0].geometry.location;
                    mapaCerimonia.setCenter(latlng.lat(), latlng.lng());
                    mapaCerimonia.removeMarkers();
                    marcadorCerimonia = {
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                        title: 'Seu endereço'
                    };
                    mapaCerimonia.addMarker(marcadorCristoRei);
                    mapaCerimonia.addMarker(marcadorCerimonia);

                    mapaCerimonia.removeRoutes();
                    mapaCerimonia.removePolylines();

                    rotaCerimonia = {
                        origin: [marcadorCerimonia.lat, marcadorCerimonia.lng],
                        destination: [marcadorCristoRei.lat, marcadorCristoRei.lng],
                        travelMode: 'driving',
                        strokeColor: '#4e808e',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    };
                    mapaCerimonia.drawRoute(rotaCerimonia);
                }
            }
        });
    });
}

function configurarMapaDaRecepcao() {
    mapaRecepcao = new GMaps({
        div: '#mapa-recepcao',
        lat: -3.7928264,
        lng: -38.4811093
    });

    google.maps.event.addListener(mapaRecepcao.map, 'click', function(event) {
        this.setOptions({scrollwheel: true});
        zoomAtivado = true;
    });

    var marcadorViritato = {
        lat: -3.7928264,
        lng: -38.4811093,
        title: 'Viriato Buffet'
    };
    mapaRecepcao.addMarker(marcadorViritato);

    $('#formulario-recepcao').submit(function(e) {
        e.preventDefault();
        GMaps.geocode({
            address: $('#texto-recepcao').val().trim(),
            callback: function(results, status) {
                if (status === 'OK') {
                    var latlng = results[0].geometry.location;
                    mapaRecepcao.setCenter(latlng.lat(), latlng.lng());
                    mapaRecepcao.removeMarkers();
                    marcadorRecepcao = {
                        lat: latlng.lat(),
                        lng: latlng.lng(),
                        title: 'Seu endereço'
                    };
                    mapaRecepcao.addMarker(marcadorViritato);
                    mapaRecepcao.addMarker(marcadorRecepcao);

                    mapaRecepcao.removeRoutes();
                    mapaRecepcao.removePolylines();

                    rotaRecepcao = {
                        origin: [marcadorRecepcao.lat, marcadorRecepcao.lng],
                        destination: [marcadorViritato.lat, marcadorViritato.lng],
                        travelMode: 'driving',
                        strokeColor: '#4e808e',
                        strokeOpacity: 0.6,
                        strokeWeight: 6
                    };
                    mapaRecepcao.drawRoute(rotaRecepcao);
                }
            }
        });
    });
}

function OnScrollPagina() {
    if (!zoomAtivado)
        return;

    mapaCerimonia.map.setOptions({scrollwheel: false});
    mapaRecepcao.map.setOptions({scrollwheel: false});
    zoomAtivado = false;
}
///#source 1 1 /source/assets/myJs/mensagens.js
var mensagens = [
    {
        texto: "Posso falar? To completamente apaixonada pelo site! Imagina só como vai ser essa festa!! Com certeza vai ser linda, do jeito que é o amor de vocês! Dá para ver em cada pedacinho desse site! Inha, essa vida nos reserva muitas surpresas, quem imaginou que a gente que estivemos tão próximas um dia nas baladas da vida e agora estamos próximas novamente na contagem regressiva dos nossos casamentos?! Amei cada momento desse nosso grupinho de noivas, e poder participar de tão pertinho da sua festa, como também poder dividir a minha com você! :) Toda felicidade desse mundo para vocês, e esse é realmente só o começo! Bjo grande para o casal \"Casadinho\" :*",
        autor: "Raissa Nogueira"
    },
    {
        texto: "Que site lindooo! Tenho certeza que tudo vai sair lindo e delicado como você amiga! Casal querido demais, muito feliz por participar desse casamento tão esperado! Amo vocês!",
        autor: "Luciana Revoredo"
    },
    {
        texto: "Ficou massa! Site lindo, fotos lindas, igual a vocês!",
        autor: "Vanessa Rios"
    },
    {
        texto: "Está tudo lindo, só aumentou a expectativa para o grande dia!!! Estou muito contente em fazer parte deste momento junto com vocês. São um casal muito querido!",
        autor: "Carolina Vieira"
    },
    {
        texto: "Inha & Thiago, Estou realmente muito feliz por vocês e muito emocionada. Minha primeira SOBRINHA que casa. É um sentimento muito gostoso! Que DEUS em sua infinita bondade, abençoe vocês e que nessa união nunca falte: o AMOR, a COMPREENSÃO e o RESPEITO. Sejam muito, muito FELIZES!!!",
        autor: "Adelita"
    },
    {
        texto: '<p>Que elegância o site!</p><p>Que alegria as cores e caras nessas fotos!</p><p>O amor está no ar!</p><p>Vou respirar bem fundo!</p>',
        autor: "Luce Galvão"
    },
    {
        texto: "Ingrid e Thiago, que coisa mais linda esse site! E o convite também! Fiquei encantada. Dá pra sentir o amor de vocês e que tudo está sendo feito com muito carinho. Parabéns! Desejo do fundo do coração que esse amor e esse cuidado perdure para sempre (até quando você não puder mais usar sapatilha de ponta, amiga bailarina, hehehe!). Grande beijo!",
        autor: "Larissa Guimarães"
    },
    {
        texto: "Pelo que foi exposto aqui nesta página, vocês estão preparados para uma vida a dois com muitas alegrias e muito amor. Parabéns e que Deus os abençoe e que vocês sejam muito muito felizes",
        autor: "Paula Meira de Carvalho"
    },
    {
        texto: "Thiago, Você foi uma criança que demonstrava maturidade em suas ideias e firmeza em seus propósitos. Aluno brilhante, enchia-nos de orgulho pelo seu desenvolvimento intelectual. Hoje, um homem com caráter indiscutível, sabe fazer suas escolhas sem medo de errar. Parabéns, Thiaguinho! Desculpe por tratá-lo como se fosse ainda uma criança, mas acho que todos nós temos nosso lado criança. Quero deixar registrado a minha alegria pela sua união com Ingrid, que sem duvida será um casal feliz. Mil beijos!",
        autor: "Tia Maria"
    },
    {
        texto: "Emocionante a história de vocês, fico triste em não poder compartilhar esse grande dia com vc amiga, mas estarei emanando votos de felicidades de longe, sempre! Beijão",
        autor: "Rianne Araújo"
    },
    {
        texto: "Desejo ao jovem casal toda felicidade com as bençãos do Nosso Senhor Jesus Cristo. Parabéns Thiago!",
        autor: "Roberto Rocha"
    },
    {
        texto: '<p>"O valor das coisas não está no tempo que elas duram, mas na intensidade com que acontecem. Por isso, existem momentos inesquecíveis, coisas inexplicáveis e pessoas incomparáveis."</p><p>Thiaguinho, essa passagem de um poema de Fernando Pessoa diz muito de nossa história, que começou  quando você com uma semana de nascido, saiu para fazer seu primeiro passeio: de sua casa para a minha. Sua mãe colocou-o em meus braços, naquele momento sem que ninguém suspeitasse de nada, estava escrito nas estrelas, que era o início de uma longa história. Com poucos meses precisei ir morar em sua casa, o tempo foi passando, sua mãe ficou grávida do Lucas e quando você ia para a cama dela, ela dizia: "vá deitar com sua tia para não machucar o bebê da mamãe". Então, quando chegou o dia de ir para meu novo apartamento, foi que me dei conta do quanto você estava sofrendo e como o Pequeno Príncipe diz: "somos, eternamente, responsáveis por aquilo que cativamos", quando saia do terceiro turno de trabalho, passava em sua casa para lhe pegar e dormir comigo. Coisas inexplicáveis aconteceram e acabou você passando toda a sua adolescência e parte da maioridade comigo. Não sei se lhe ensinei alguma coisa, pois nosso contato maior  se dava nos fins de semana, mas sei que aprendi muito com você. Lembro-me que em meu trabalho as mães se referiam aos seus filhos como "aborrecentes" e eu defendia, pois trabalhava com adolescentes e tinha em você uma forte referência. Dizia sempre em meu trabalho que não tinha, em casa, um adolescente de quinze anos, mas um rapaz de vinte e cinco anos. Eu era uma admiradora de sua índole e caráter inquestionáveis, tendo lisura em suas ações, muito moderado, mostrando bastante maturidade para enfrentar esse mundo de incertezas. Percebi que já era um homem, sabia o que queria, estava pronto para seguir sua vida sem precisar de mim. Restava-me a certeza de que havia feito tudo o que me foi possível. Agora, às vésperas de começar um novo ciclo de vida, não há momento melhor para desejar ao casal união, respeito, lealdade e muita cumplicidade. Que sejam felizes hoje e sempre... Recebam meu Amor e Luz, e ao Thiaguinho minha gratidão por ter feito parte de minha vida.</p><p>Carinhosamente,</p><p>Meire Céli Teixeira Lima</p>',
        autor: "Meire Céli"
    },
    {
        texto: "<p>Ingrid, você é uma sobrinha muita querida para nós. Que você e Thiago tenham uma vida conjugal muito feliz e duradoura, protegidos por Deus.</p><p>Parabéns dos tios Heloíza e Pinho.</p>",
        autor: "Heloíza e Pinho"
    },
    {
        texto: "<p>Queridos Thiago e Ingrid,</p><p>É com muita alegria que estou escrevendo para vocês. Desde o inicio acompanhei essa bela história. Seja curtindo um órbita ou batendo um bom papo em um aniversário ou mesa de bar, vocês sempre tiveram uma sintonia sem igual. Essa cumplicidade é uma das chaves para uma união duradoura e feliz. Menina Ingrid, você sempre radiou uma alegria sem igual. A paz que você passa quando chega em um local é sensacional. Deve ser por isso que o pequeno Thiago esteja cada dia mais leve. Tricolor Thiago, que felicidade ver mais um \"irmão\" casando. Irmão, sim! Pois como seu pai diz, eu sou um dos adotados dele. E sempre me achei assim, pois vocês sempre mostraram como uma família deve ser. Unida e feliz. Por isso, acredito que você será um ótimo marido e companheiro para a Ingrid. E eu aqui, com a Raphaela e nossa princesa Liz, desejamos muitas felicidades e alegrias nesta nova trilha que estão traçando juntos.</p>",
        autor: "Leonardo, Raphaela e Liz Leitão"
    },
    {
        texto: "<p>Olhem aí que noivinhos mais fofos! E o site então, muito lindo! Valeu mesmo a pena eu ficar posando de cabide ambulante durante o ensaio. Brincadeirinha... Adorei estar presente naquele dia divertido e prazeroso! Tentarei agora ser breve na mensagem, mas que palavras tem uma mãe para sua filha única às vésperas do seu casamento? - Muitas e muitas, eu diria inúmeras, mas sem sombra de dúvidas as mais verdadeiras e repletas de amor, o mais sublime sentimento que conheci a partir do seu nascimento Inha, meu maior presente! Sim, o amor maternal, aquele que não tem medidas, que tudo suporta e nada pede, já que é pura doação. O amor que entende que ser feliz é ver a felicidade de quem se ama. Hoje, Thiago, você se torna responsável por essa felicidade, a que fez minha filha aceitar trilhar com você novos caminhos e construirem juntos, uma nova vida. Por isso abro meu coração e lhe recebo como um filho querido, o mais novo membro da minha família. Sejam companheiros, amantes, cúmplices e verdadeiros. Nunca recuem diante das dificuldades, ao contrário, com maturidade, façam delas um incentivo para suas conquistas, e do amor, cultivado dia após dia, o alicerce dessa União. Que Deus os faça muito felizes, os abençoe e proteja hoje e sempre!</p><p>Com todo amor,</p>",
        autor: "Socorro Lopes"
    },
    {
        texto: "Vendo as fotos, não acredito que o dia tá chegando.. Parece que foi ontem que éramos só as duas bagunçando na piscina da casa da vovó. Depois veio a loira espevitada e a dedinha.. e pra completar de vez a bagunça chegou o tilíco. Se me perguntarem quem foi a minha primeira melhor amiga, acho que não tem outra pessoa que eu possa lembrar antes de ti. Espero que todos os sonhos se realizem nessa nova fase Inha e agora, entra junto desse shake que é a nossa família o senhor Thiago Sá, que já conquistou toda a Carvalhada. Felicidades \"vizinhos \"!!",
        autor: "Gabriela Quadros"
    },
    {
        texto: "<p>Ingrid e Thiago,</p><p>Em um momento como esse, veem muitas idéias à cabeça e a gente fica meio sem saber o que dizer, ou melhor, escrever. Mas eu vou contar, primeiro uma pequena \"historinha\" verídica, por sinal, que eu presenciei e nunca esqueci. A mesma ocorreu em Santa Quitéria no casamento de uma filha de um compadre do papai que, inclusive, chegou a morar lá em casa. O mesmo foi realizado pelo pároco local, Pe. Ximenes, homem simples, sem vaidades e muito querido na cidade. Uma dessas pessoas que ninguém dá nada por ele mas um santo homem. Na homilia do casamento ele, pregando para os noivos, disse que casamento era, acima de tudo, renúncia mas que, essa renúncia, não significava, de modo algum, anulação. Aí está o segredo, viver com muito amor e muita compreensão. Isso é o que eu desejo a vocês além, é claro, dos meus netos. Sei que vou sentir a falta de vocês mas o que se há de fazer......Peço a Deus que os ilunine e proteja e, sempre for preciso, contem comigo, a Socorro e, tenho certeza, com seus irmãos e cunhados. Sejam muiuiuiuiuiuiuiuiuito felizes!!!!!!!!!!! Todos nós os amamos. Um beijo!!!!!!!!1",
        autor: "Gilber"
    },
    {
        texto: "<p>O que dizer para um casal onde vejo amor, cumplicidade, carinho, respeito.... Inha e Thiago, com o casamento realiza-se o início de uma nova fase em suas vidas, e a alegria que enche seus corações hoje seja o começo de uma vida em que todos os seus sonhos se realizem. Que o amor demonstrado por vocês cresça cada dia mais sendo sempre o elo forte que marcará essa caminhada. Que Deus derrame sobre vocês suas bênçãos, cobrindo-os com o Vosso Sagrado Manto e Nossa Senhora os guie e acompanhe hoje e sempre. São os mais sinceros votos de felicidades para meus queridos sobrinhos.</p><p>Mil beijos e forte abraços aos dois.</p><p>Obs.: me emocionei bastante com a mensagem de sua tia, Thiago.</p>",
        autor: "Dolores Prado (tia Lolinha)"
    },
    {
        texto: "Minha irmanzinha que tanto AMO, seja muuuuito feliz do lado de mais um Nêgo na sua vida (sei que o mais amado ainda sou eu rsss), te amo sempre e não é pq está saindo da casa do papai que vou parar de te perturbar hehe. Thiago, agora sim COOOOONHADOOOO kkkkkk. Seja muito feliz ao lado da minha maninha, você já faz parte da minha família e agora se lascou, tbm vou te perturbar. Beijos aos dois!!!",
        autor: "Daniel França Lopes"
    },
    {
        texto: "<p>Um lindo casal!!! Thiago, de sua tia mais \"distante\", quase oculta, porém nem por isso menos desejosa de sua felicidade. A Meirinha me era muito querida e vocês  (André, Thiago e Lucas) são o forte elo que me traz sempre presente, a figura íntegra de sua mãe. Neste momento, estou por demais emocionada com a sua história, como HOMEM lindo que é, por dentro e por fora. Desejo ao casal Thiago e Ingrid, nesta oportunidade, uma união de Paz e Amor; através da cumplicidade entre vocês, respeito mútuo e leveza daquela liberdade ética e sincera que, com certeza, os farão sempre muito felizes.</p><p>Com afeto</p><p>Ângela</p>",
        autor: "Ângela Antônia Teixeira Sales"
    },
    {
        texto: "<p>Sei que a chuva que caiu na manhã do dia 29.11.2014 em Fortaleza, foram bênçãos que Deus enviou do céu para vocês que naquele dia iniciavam um nova e importante etapa em suas vidas. Inha, quase vinte e sete anos se passaram mas ainda lembro a emoção que senti ao vê-la pela primeira vez, que foi ainda na maternidade. Naquele momento tive a confirmação de que no meu coração cabia mais amor do que poderia supor. Foram muitas situações de você bebê, aprendendo a andar, falar, indo para a escola, adolescência e principalmente os dois meses que você ficou lá em casa, que voltaram na minha memória no momento em que a vi de noiva. Não deu para segurar! as lágrimas vieram viu!? Hoje esse amor é repartido com você e a pessoa que escolheu para dividir sua vida, pois o Thiago já ocupa um espaço no coração de todo Prado Carvalho. Espero que essa união seja consolidada com muito amor, compreensão e paz. Sei também que seus avós estão muito felizes no céu. BEIJÃO.</p><p>De sua madrinha (pequena mãe) tia Dinda.</p>",
        autor: "Liduina Prado (tia Dinda)"
    }
];

var linhaProgressoMensagens, indexMensagemAtual, totalMensagens;

function exibirMensagens() {
    if (mensagens.length < 1)
        return;

    var $container = $("#container-mensagens");
    shuffle(mensagens);

    adicionarMensagemAo($container, 0, "active item");
    if (mensagens.length === 1)
        return;

    for (var index = 1; index < mensagens.length; index++) {
        adicionarMensagemAo($container, index, "item");
    }

    configurarSliderDeMensagens();
    configurarProgressBar();
}

function adicionarMensagemAo(container, indexMensagem, classes) {
    container.append("<div class=\"" + classes + "\">" + mensagens[indexMensagem].texto + "<h5>" + mensagens[indexMensagem].autor + "</h5></div>");
}

function configurarSliderDeMensagens() {
    $('#msg-slider').each(function() {
        if ($('.item', this).length) {
            $(this).carousel({
                interval: 600000
            });
        }
    });

    indexMensagemAtual = 1;
    totalMensagens = mensagens.length;
}

function configurarProgressBar() {
    var element = document.getElementById('progresso-mensagens');
    linhaProgressoMensagens = new ProgressBar.Line(element, {
        color: '#4e808e',
        trailColor: '#fff',
        strokeWidth: 2
    });

    linhaProgressoMensagens.animate(indexMensagemAtual / totalMensagens);
};

function recuarProgressoMensagens() {
    indexMensagemAtual = indexMensagemAtual - 1;
    if (indexMensagemAtual === 0) indexMensagemAtual = totalMensagens;

    linhaProgressoMensagens.animate(indexMensagemAtual / totalMensagens);
}

function avancarProgressoMensagens() {
    indexMensagemAtual = indexMensagemAtual + 1;
    if (indexMensagemAtual > totalMensagens) indexMensagemAtual = 1;

    linhaProgressoMensagens.animate(indexMensagemAtual / totalMensagens);
}

function configurarSubmissaoDeMensagem() {
    $("#ss-form2").submit(function(e) {
        $("#confirmacao-envio-mensagem").html("");

        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            dataType: "jsonp",
            crossDomain: true,
            data: postData,
            beforeSend: function(xhr) {
                mostrarProgressBar();
            },
            complete: function(jqXHR, textStatus) {
                switch (jqXHR.status) {
                    case 200:
                        var mensagemSucesso = "<div class=\"alert alert-success\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button><strong>Obrigado!</strong><br/>Sua mensagem foi enviada com sucesso e será exibida em breve.</div>";
                        $("#confirmacao-envio-mensagem").html(mensagemSucesso);
                        resetForm($("#ss-form2"));
                        break;
                    default:
                        var mensagemFalha = "<div class=\"alert alert-error\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button><strong>Algo deu errado...</strong><br/>Tente enviar sua mensagem novamente.</div>";
                        $("#confirmacao-envio-mensagem").html(mensagemFalha);
                }
                ocultarProgressBar();
            }
        });
        e.preventDefault();
    });
}



///#source 1 1 /source/assets/myJs/presentsloader.js
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
///#source 1 1 /source/assets/myJs/utils.js
function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $form.find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');

    var $quantidadePessoas = $("#entry_1004913611");
    $quantidadePessoas.hide();
    $quantidadePessoas.removeAttr("required");
}

function shuffle(array) {
    var currentIndex = array.length,
            temporaryValue,
            randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

jQuery.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        $(this[i]).before($(this[j]));
    }
    return this;
};

function async(url, callback) {
    var d = document, t = 'script',
        o = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
    o.src = url;
    if (callback) { s.addEventListener('load', function (e) { callback(null, e); }, false); }
    s.parentNode.appendChild(o, s);
}

///#source 1 1 /source/assets/myJs/plugins/GMaps.js
(function(root, factory) {
  if(typeof exports === 'object') {
    module.exports = factory();
  }
  else if(typeof define === 'function' && define.amd) {
    define('GMaps', [], factory);
  }

  root.GMaps = factory();

}(this, function() {

/*!
 * GMaps.js v0.4.14
 * http://hpneo.github.com/gmaps/
 *
 * Copyright 2014, Gustavo Leon
 * Released under the MIT License.
 */

if (!(typeof window.google === 'object' && window.google.maps)) {
  throw 'Google Maps API is required. Please register the following JavaScript library http://maps.google.com/maps/api/js?sensor=true.'
}

var extend_object = function(obj, new_obj) {
  var name;

  if (obj === new_obj) {
    return obj;
  }

  for (name in new_obj) {
    obj[name] = new_obj[name];
  }

  return obj;
};

var replace_object = function(obj, replace) {
  var name;

  if (obj === replace) {
    return obj;
  }

  for (name in replace) {
    if (obj[name] != undefined) {
      obj[name] = replace[name];
    }
  }

  return obj;
};

var array_map = function(array, callback) {
  var original_callback_params = Array.prototype.slice.call(arguments, 2),
      array_return = [],
      array_length = array.length,
      i;

  if (Array.prototype.map && array.map === Array.prototype.map) {
    array_return = Array.prototype.map.call(array, function(item) {
      callback_params = original_callback_params;
      callback_params.splice(0, 0, item);

      return callback.apply(this, callback_params);
    });
  }
  else {
    for (i = 0; i < array_length; i++) {
      callback_params = original_callback_params;
      callback_params.splice(0, 0, array[i]);
      array_return.push(callback.apply(this, callback_params));
    }
  }

  return array_return;
};

var array_flat = function(array) {
  var new_array = [],
      i;

  for (i = 0; i < array.length; i++) {
    new_array = new_array.concat(array[i]);
  }

  return new_array;
};

var coordsToLatLngs = function(coords, useGeoJSON) {
  var first_coord = coords[0],
      second_coord = coords[1];

  if (useGeoJSON) {
    first_coord = coords[1];
    second_coord = coords[0];
  }

  return new google.maps.LatLng(first_coord, second_coord);
};

var arrayToLatLng = function(coords, useGeoJSON) {
  var i;

  for (i = 0; i < coords.length; i++) {
    if (!(coords[i] instanceof google.maps.LatLng)) {
      if (coords[i].length > 0 && typeof(coords[i][0]) == "object") {
        coords[i] = arrayToLatLng(coords[i], useGeoJSON);
      }
      else {
        coords[i] = coordsToLatLngs(coords[i], useGeoJSON);
      }
    }
  }

  return coords;
};

var getElementById = function(id, context) {
  var element,
  id = id.replace('#', '');

  if ('jQuery' in this && context) {
    element = $("#" + id, context)[0];
  } else {
    element = document.getElementById(id);
  };

  return element;
};

var findAbsolutePosition = function(obj)  {
  var curleft = 0,
      curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }

  return [curleft, curtop];
};

var GMaps = (function(global) {
  "use strict";

  var doc = document;

  var GMaps = function(options) {
    if (!this) return new GMaps(options);

    options.zoom = options.zoom || 15;
    options.mapType = options.mapType || 'roadmap';

    var self = this,
        i,
        events_that_hide_context_menu = ['bounds_changed', 'center_changed', 'click', 'dblclick', 'drag', 'dragend', 'dragstart', 'idle', 'maptypeid_changed', 'projection_changed', 'resize', 'tilesloaded', 'zoom_changed'],
        events_that_doesnt_hide_context_menu = ['mousemove', 'mouseout', 'mouseover'],
        options_to_be_deleted = ['el', 'lat', 'lng', 'mapType', 'width', 'height', 'markerClusterer', 'enableNewStyle'],
        container_id = options.el || options.div,
        markerClustererFunction = options.markerClusterer,
        mapType = google.maps.MapTypeId[options.mapType.toUpperCase()],
        map_center = new google.maps.LatLng(options.lat, options.lng),
        zoomControl = options.zoomControl || true,
        zoomControlOpt = options.zoomControlOpt || {
          style: 'DEFAULT',
          position: 'TOP_LEFT'
        },
        zoomControlStyle = zoomControlOpt.style || 'DEFAULT',
        zoomControlPosition = zoomControlOpt.position || 'TOP_LEFT',
        panControl = options.panControl || true,
        mapTypeControl = options.mapTypeControl || true,
        scaleControl = options.scaleControl || true,
        streetViewControl = options.streetViewControl || true,
        overviewMapControl = overviewMapControl || true,
        map_options = {},
        map_base_options = {
          zoom: this.zoom,
          center: map_center,
          mapTypeId: mapType,
          scrollwheel: false
        },
        map_controls_options = {
          panControl: panControl,
          zoomControl: zoomControl,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle[zoomControlStyle],
            position: google.maps.ControlPosition[zoomControlPosition]
          },
          mapTypeControl: mapTypeControl,
          scaleControl: scaleControl,
          streetViewControl: streetViewControl,
          overviewMapControl: overviewMapControl
        };

    if (typeof(options.el) === 'string' || typeof(options.div) === 'string') {
      this.el = getElementById(container_id, options.context);
    } else {
      this.el = container_id;
    }

    if (typeof(this.el) === 'undefined' || this.el === null) {
      throw 'No element defined.';
    }

    window.context_menu = window.context_menu || {};
    window.context_menu[self.el.id] = {};

    this.controls = [];
    this.overlays = [];
    this.layers = []; // array with kml/georss and fusiontables layers, can be as many
    this.singleLayers = {}; // object with the other layers, only one per layer
    this.markers = [];
    this.polylines = [];
    this.routes = [];
    this.polygons = [];
    this.infoWindow = null;
    this.overlay_el = null;
    this.zoom = options.zoom;
    this.registered_events = {};

    this.el.style.width = options.width || this.el.scrollWidth || this.el.offsetWidth;
    this.el.style.height = options.height || this.el.scrollHeight || this.el.offsetHeight;

    google.maps.visualRefresh = options.enableNewStyle;

    for (i = 0; i < options_to_be_deleted.length; i++) {
      delete options[options_to_be_deleted[i]];
    }

    if(options.disableDefaultUI != true) {
      map_base_options = extend_object(map_base_options, map_controls_options);
    }

    map_options = extend_object(map_base_options, options);

    for (i = 0; i < events_that_hide_context_menu.length; i++) {
      delete map_options[events_that_hide_context_menu[i]];
    }

    for (i = 0; i < events_that_doesnt_hide_context_menu.length; i++) {
      delete map_options[events_that_doesnt_hide_context_menu[i]];
    }

    this.map = new google.maps.Map(this.el, map_options);

    if (markerClustererFunction) {
      this.markerClusterer = markerClustererFunction.apply(this, [this.map]);
    }

    var buildContextMenuHTML = function(control, e) {
      var html = '',
          options = window.context_menu[self.el.id][control];

      for (var i in options){
        if (options.hasOwnProperty(i)) {
          var option = options[i];

          html += '<li><a id="' + control + '_' + i + '" href="#">' + option.title + '</a></li>';
        }
      }

      if (!getElementById('gmaps_context_menu')) return;

      var context_menu_element = getElementById('gmaps_context_menu');
      
      context_menu_element.innerHTML = html;

      var context_menu_items = context_menu_element.getElementsByTagName('a'),
          context_menu_items_count = context_menu_items.length,
          i;

      for (i = 0; i < context_menu_items_count; i++) {
        var context_menu_item = context_menu_items[i];

        var assign_menu_item_action = function(ev){
          ev.preventDefault();

          options[this.id.replace(control + '_', '')].action.apply(self, [e]);
          self.hideContextMenu();
        };

        google.maps.event.clearListeners(context_menu_item, 'click');
        google.maps.event.addDomListenerOnce(context_menu_item, 'click', assign_menu_item_action, false);
      }

      var position = findAbsolutePosition.apply(this, [self.el]),
          left = position[0] + e.pixel.x - 15,
          top = position[1] + e.pixel.y- 15;

      context_menu_element.style.left = left + "px";
      context_menu_element.style.top = top + "px";

      context_menu_element.style.display = 'block';
    };

    this.buildContextMenu = function(control, e) {
      if (control === 'marker') {
        e.pixel = {};

        var overlay = new google.maps.OverlayView();
        overlay.setMap(self.map);
        
        overlay.draw = function() {
          var projection = overlay.getProjection(),
              position = e.marker.getPosition();
          
          e.pixel = projection.fromLatLngToContainerPixel(position);

          buildContextMenuHTML(control, e);
        };
      }
      else {
        buildContextMenuHTML(control, e);
      }
    };

    this.setContextMenu = function(options) {
      window.context_menu[self.el.id][options.control] = {};

      var i,
          ul = doc.createElement('ul');

      for (i in options.options) {
        if (options.options.hasOwnProperty(i)) {
          var option = options.options[i];

          window.context_menu[self.el.id][options.control][option.name] = {
            title: option.title,
            action: option.action
          };
        }
      }

      ul.id = 'gmaps_context_menu';
      ul.style.display = 'none';
      ul.style.position = 'absolute';
      ul.style.minWidth = '100px';
      ul.style.background = 'white';
      ul.style.listStyle = 'none';
      ul.style.padding = '8px';
      ul.style.boxShadow = '2px 2px 6px #ccc';

      doc.body.appendChild(ul);

      var context_menu_element = getElementById('gmaps_context_menu')

      google.maps.event.addDomListener(context_menu_element, 'mouseout', function(ev) {
        if (!ev.relatedTarget || !this.contains(ev.relatedTarget)) {
          window.setTimeout(function(){
            context_menu_element.style.display = 'none';
          }, 400);
        }
      }, false);
    };

    this.hideContextMenu = function() {
      var context_menu_element = getElementById('gmaps_context_menu');

      if (context_menu_element) {
        context_menu_element.style.display = 'none';
      }
    };

    var setupListener = function(object, name) {
      google.maps.event.addListener(object, name, function(e){
        if (e == undefined) {
          e = this;
        }

        options[name].apply(this, [e]);

        self.hideContextMenu();
      });
    };

    //google.maps.event.addListener(this.map, 'idle', this.hideContextMenu);
    google.maps.event.addListener(this.map, 'zoom_changed', this.hideContextMenu);

    for (var ev = 0; ev < events_that_hide_context_menu.length; ev++) {
      var name = events_that_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    for (var ev = 0; ev < events_that_doesnt_hide_context_menu.length; ev++) {
      var name = events_that_doesnt_hide_context_menu[ev];

      if (name in options) {
        setupListener(this.map, name);
      }
    }

    google.maps.event.addListener(this.map, 'rightclick', function(e) {
      if (options.rightclick) {
        options.rightclick.apply(this, [e]);
      }

      if(window.context_menu[self.el.id]['map'] != undefined) {
        self.buildContextMenu('map', e);
      }
    });

    this.refresh = function() {
      google.maps.event.trigger(this.map, 'resize');
    };

    this.fitZoom = function() {
      var latLngs = [],
          markers_length = this.markers.length,
          i;

      for (i = 0; i < markers_length; i++) {
        if(typeof(this.markers[i].visible) === 'boolean' && this.markers[i].visible) {
          latLngs.push(this.markers[i].getPosition());
        }
      }

      this.fitLatLngBounds(latLngs);
    };

    this.fitLatLngBounds = function(latLngs) {
      var total = latLngs.length;
      var bounds = new google.maps.LatLngBounds();

      for(var i=0; i < total; i++) {
        bounds.extend(latLngs[i]);
      }

      this.map.fitBounds(bounds);
    };

    this.setCenter = function(lat, lng, callback) {
      this.map.panTo(new google.maps.LatLng(lat, lng));

      if (callback) {
        callback();
      }
    };

    this.getElement = function() {
      return this.el;
    };

    this.zoomIn = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() + value;
      this.map.setZoom(this.zoom);
    };

    this.zoomOut = function(value) {
      value = value || 1;

      this.zoom = this.map.getZoom() - value;
      this.map.setZoom(this.zoom);
    };

    var native_methods = [],
        method;

    for (method in this.map) {
      if (typeof(this.map[method]) == 'function' && !this[method]) {
        native_methods.push(method);
      }
    }

    for (i=0; i < native_methods.length; i++) {
      (function(gmaps, scope, method_name) {
        gmaps[method_name] = function(){
          return scope[method_name].apply(scope, arguments);
        };
      })(this, this.map, native_methods[i]);
    }
  };

  return GMaps;
})(this);

GMaps.prototype.createControl = function(options) {
  var control = document.createElement('div');

  control.style.cursor = 'pointer';
  
  if (options.disableDefaultStyles !== true) {
    control.style.fontFamily = 'Roboto, Arial, sans-serif';
    control.style.fontSize = '11px';
    control.style.boxShadow = 'rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px';
  }

  for (var option in options.style) {
    control.style[option] = options.style[option];
  }

  if (options.id) {
    control.id = options.id;
  }

  if (options.classes) {
    control.className = options.classes;
  }

  if (options.content) {
    control.innerHTML = options.content;
  }

  if (options.position) {
    control.position = google.maps.ControlPosition[options.position.toUpperCase()];
  }

  for (var ev in options.events) {
    (function(object, name) {
      google.maps.event.addDomListener(object, name, function(){
        options.events[name].apply(this, [this]);
      });
    })(control, ev);
  }

  control.index = 1;

  return control;
};

GMaps.prototype.addControl = function(options) {
  var control = this.createControl(options);
  this.controls.push(control);
  this.map.controls[control.position].push(control);

  return control;
};

GMaps.prototype.removeControl = function(control) {
  var position = null;

  for (var i = 0; i < this.controls.length; i++) {
    if (this.controls[i] == control) {
      position = this.controls[i].position;
      this.controls.splice(i, 1);
    }
  }

  if (position) {
    for (i = 0; i < this.map.controls.length; i++) {
      var controlsForPosition = this.map.controls[control.position]
      if (controlsForPosition.getAt(i) == control) {
        controlsForPosition.removeAt(i);
        break;
      }
    }
  }

  return control;
};

GMaps.prototype.createMarker = function(options) {
  if (options.lat == undefined && options.lng == undefined && options.position == undefined) {
    throw 'No latitude or longitude defined.';
  }

  var self = this,
      details = options.details,
      fences = options.fences,
      outside = options.outside,
      base_options = {
        position: new google.maps.LatLng(options.lat, options.lng),
        map: null
      },
      marker_options = extend_object(base_options, options);

  delete marker_options.lat;
  delete marker_options.lng;
  delete marker_options.fences;
  delete marker_options.outside;

  var marker = new google.maps.Marker(marker_options);

  marker.fences = fences;

  if (options.infoWindow) {
    marker.infoWindow = new google.maps.InfoWindow(options.infoWindow);

    var info_window_events = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed'];

    for (var ev = 0; ev < info_window_events.length; ev++) {
      (function(object, name) {
        if (options.infoWindow[name]) {
          google.maps.event.addListener(object, name, function(e){
            options.infoWindow[name].apply(this, [e]);
          });
        }
      })(marker.infoWindow, info_window_events[ev]);
    }
  }

  var marker_events = ['animation_changed', 'clickable_changed', 'cursor_changed', 'draggable_changed', 'flat_changed', 'icon_changed', 'position_changed', 'shadow_changed', 'shape_changed', 'title_changed', 'visible_changed', 'zindex_changed'];

  var marker_events_with_mouse = ['dblclick', 'drag', 'dragend', 'dragstart', 'mousedown', 'mouseout', 'mouseover', 'mouseup'];

  for (var ev = 0; ev < marker_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this, [this]);
        });
      }
    })(marker, marker_events[ev]);
  }

  for (var ev = 0; ev < marker_events_with_mouse.length; ev++) {
    (function(map, object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(me){
          if(!me.pixel){
            me.pixel = map.getProjection().fromLatLngToPoint(me.latLng)
          }
          
          options[name].apply(this, [me]);
        });
      }
    })(this.map, marker, marker_events_with_mouse[ev]);
  }

  google.maps.event.addListener(marker, 'click', function() {
    this.details = details;

    if (options.click) {
      options.click.apply(this, [this]);
    }

    if (marker.infoWindow) {
      self.hideInfoWindows();
      marker.infoWindow.open(self.map, marker);
    }
  });

  google.maps.event.addListener(marker, 'rightclick', function(e) {
    e.marker = this;

    if (options.rightclick) {
      options.rightclick.apply(this, [e]);
    }

    if (window.context_menu[self.el.id]['marker'] != undefined) {
      self.buildContextMenu('marker', e);
    }
  });

  if (marker.fences) {
    google.maps.event.addListener(marker, 'dragend', function() {
      self.checkMarkerGeofence(marker, function(m, f) {
        outside(m, f);
      });
    });
  }

  return marker;
};

GMaps.prototype.addMarker = function(options) {
  var marker;
  if(options.hasOwnProperty('gm_accessors_')) {
    // Native google.maps.Marker object
    marker = options;
  }
  else {
    if ((options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) || options.position) {
      marker = this.createMarker(options);
    }
    else {
      throw 'No latitude or longitude defined.';
    }
  }

  marker.setMap(this.map);

  if(this.markerClusterer) {
    this.markerClusterer.addMarker(marker);
  }

  this.markers.push(marker);

  GMaps.fire('marker_added', marker, this);

  return marker;
};

GMaps.prototype.addMarkers = function(array) {
  for (var i = 0, marker; marker=array[i]; i++) {
    this.addMarker(marker);
  }

  return this.markers;
};

GMaps.prototype.hideInfoWindows = function() {
  for (var i = 0, marker; marker = this.markers[i]; i++){
    if (marker.infoWindow) {
      marker.infoWindow.close();
    }
  }
};

GMaps.prototype.removeMarker = function(marker) {
  for (var i = 0; i < this.markers.length; i++) {
    if (this.markers[i] === marker) {
      this.markers[i].setMap(null);
      this.markers.splice(i, 1);

      if(this.markerClusterer) {
        this.markerClusterer.removeMarker(marker);
      }

      GMaps.fire('marker_removed', marker, this);

      break;
    }
  }

  return marker;
};

GMaps.prototype.removeMarkers = function (collection) {
  var new_markers = [];

  if (typeof collection == 'undefined') {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    
    this.markers = new_markers;
  }
  else {
    for (var i = 0; i < collection.length; i++) {
      if (this.markers.indexOf(collection[i]) > -1) {
        this.markers[i].setMap(null);
      }
    }

    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i].getMap() != null) {
        new_markers.push(this.markers[i]);
      }
    }

    this.markers = new_markers;
  }
};

GMaps.prototype.drawOverlay = function(options) {
  var overlay = new google.maps.OverlayView(),
      auto_show = true;

  overlay.setMap(this.map);

  if (options.auto_show != null) {
    auto_show = options.auto_show;
  }

  overlay.onAdd = function() {
    var el = document.createElement('div');

    el.style.borderStyle = "none";
    el.style.borderWidth = "0px";
    el.style.position = "absolute";
    el.style.zIndex = 100;
    el.innerHTML = options.content;

    overlay.el = el;

    if (!options.layer) {
      options.layer = 'overlayLayer';
    }
    
    var panes = this.getPanes(),
        overlayLayer = panes[options.layer],
        stop_overlay_events = ['contextmenu', 'DOMMouseScroll', 'dblclick', 'mousedown'];

    overlayLayer.appendChild(el);

    for (var ev = 0; ev < stop_overlay_events.length; ev++) {
      (function(object, name) {
        google.maps.event.addDomListener(object, name, function(e){
          if (navigator.userAgent.toLowerCase().indexOf('msie') != -1 && document.all) {
            e.cancelBubble = true;
            e.returnValue = false;
          }
          else {
            e.stopPropagation();
          }
        });
      })(el, stop_overlay_events[ev]);
    }

    if (options.click) {
      google.maps.event.addDomListener(overlay.el, 'click', function() {
        options.click.apply(overlay, [overlay]);
      });
    }

    google.maps.event.trigger(this, 'ready');
  };

  overlay.draw = function() {
    var projection = this.getProjection(),
        pixel = projection.fromLatLngToDivPixel(new google.maps.LatLng(options.lat, options.lng));

    options.horizontalOffset = options.horizontalOffset || 0;
    options.verticalOffset = options.verticalOffset || 0;

    var el = overlay.el,
        content = el.children[0],
        content_height = content.clientHeight,
        content_width = content.clientWidth;

    switch (options.verticalAlign) {
      case 'top':
        el.style.top = (pixel.y - content_height + options.verticalOffset) + 'px';
        break;
      default:
      case 'middle':
        el.style.top = (pixel.y - (content_height / 2) + options.verticalOffset) + 'px';
        break;
      case 'bottom':
        el.style.top = (pixel.y + options.verticalOffset) + 'px';
        break;
    }

    switch (options.horizontalAlign) {
      case 'left':
        el.style.left = (pixel.x - content_width + options.horizontalOffset) + 'px';
        break;
      default:
      case 'center':
        el.style.left = (pixel.x - (content_width / 2) + options.horizontalOffset) + 'px';
        break;
      case 'right':
        el.style.left = (pixel.x + options.horizontalOffset) + 'px';
        break;
    }

    el.style.display = auto_show ? 'block' : 'none';

    if (!auto_show) {
      options.show.apply(this, [el]);
    }
  };

  overlay.onRemove = function() {
    var el = overlay.el;

    if (options.remove) {
      options.remove.apply(this, [el]);
    }
    else {
      overlay.el.parentNode.removeChild(overlay.el);
      overlay.el = null;
    }
  };

  this.overlays.push(overlay);
  return overlay;
};

GMaps.prototype.removeOverlay = function(overlay) {
  for (var i = 0; i < this.overlays.length; i++) {
    if (this.overlays[i] === overlay) {
      this.overlays[i].setMap(null);
      this.overlays.splice(i, 1);

      break;
    }
  }
};

GMaps.prototype.removeOverlays = function() {
  for (var i = 0, item; item = this.overlays[i]; i++) {
    item.setMap(null);
  }

  this.overlays = [];
};

GMaps.prototype.drawPolyline = function(options) {
  var path = [],
      points = options.path;

  if (points.length) {
    if (points[0][0] === undefined) {
      path = points;
    }
    else {
      for (var i=0, latlng; latlng=points[i]; i++) {
        path.push(new google.maps.LatLng(latlng[0], latlng[1]));
      }
    }
  }

  var polyline_options = {
    map: this.map,
    path: path,
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight,
    geodesic: options.geodesic,
    clickable: true,
    editable: false,
    visible: true
  };

  if (options.hasOwnProperty("clickable")) {
    polyline_options.clickable = options.clickable;
  }

  if (options.hasOwnProperty("editable")) {
    polyline_options.editable = options.editable;
  }

  if (options.hasOwnProperty("icons")) {
    polyline_options.icons = options.icons;
  }

  if (options.hasOwnProperty("zIndex")) {
    polyline_options.zIndex = options.zIndex;
  }

  var polyline = new google.maps.Polyline(polyline_options);

  var polyline_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polyline_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polyline, polyline_events[ev]);
  }

  this.polylines.push(polyline);

  GMaps.fire('polyline_added', polyline, this);

  return polyline;
};

GMaps.prototype.removePolyline = function(polyline) {
  for (var i = 0; i < this.polylines.length; i++) {
    if (this.polylines[i] === polyline) {
      this.polylines[i].setMap(null);
      this.polylines.splice(i, 1);

      GMaps.fire('polyline_removed', polyline, this);

      break;
    }
  }
};

GMaps.prototype.removePolylines = function() {
  for (var i = 0, item; item = this.polylines[i]; i++) {
    item.setMap(null);
  }

  this.polylines = [];
};

GMaps.prototype.drawCircle = function(options) {
  options =  extend_object({
    map: this.map,
    center: new google.maps.LatLng(options.lat, options.lng)
  }, options);

  delete options.lat;
  delete options.lng;

  var polygon = new google.maps.Circle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawRectangle = function(options) {
  options = extend_object({
    map: this.map
  }, options);

  var latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(options.bounds[0][0], options.bounds[0][1]),
    new google.maps.LatLng(options.bounds[1][0], options.bounds[1][1])
  );

  options.bounds = latLngBounds;

  var polygon = new google.maps.Rectangle(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  return polygon;
};

GMaps.prototype.drawPolygon = function(options) {
  var useGeoJSON = false;

  if(options.hasOwnProperty("useGeoJSON")) {
    useGeoJSON = options.useGeoJSON;
  }

  delete options.useGeoJSON;

  options = extend_object({
    map: this.map
  }, options);

  if (useGeoJSON == false) {
    options.paths = [options.paths.slice(0)];
  }

  if (options.paths.length > 0) {
    if (options.paths[0].length > 0) {
      options.paths = array_flat(array_map(options.paths, arrayToLatLng, useGeoJSON));
    }
  }

  var polygon = new google.maps.Polygon(options),
      polygon_events = ['click', 'dblclick', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'rightclick'];

  for (var ev = 0; ev < polygon_events.length; ev++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(e){
          options[name].apply(this, [e]);
        });
      }
    })(polygon, polygon_events[ev]);
  }

  this.polygons.push(polygon);

  GMaps.fire('polygon_added', polygon, this);

  return polygon;
};

GMaps.prototype.removePolygon = function(polygon) {
  for (var i = 0; i < this.polygons.length; i++) {
    if (this.polygons[i] === polygon) {
      this.polygons[i].setMap(null);
      this.polygons.splice(i, 1);

      GMaps.fire('polygon_removed', polygon, this);

      break;
    }
  }
};

GMaps.prototype.removePolygons = function() {
  for (var i = 0, item; item = this.polygons[i]; i++) {
    item.setMap(null);
  }

  this.polygons = [];
};

GMaps.prototype.getFromFusionTables = function(options) {
  var events = options.events;

  delete options.events;

  var fusion_tables_options = options,
      layer = new google.maps.FusionTablesLayer(fusion_tables_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromFusionTables = function(options) {
  var layer = this.getFromFusionTables(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.getFromKML = function(options) {
  var url = options.url,
      events = options.events;

  delete options.url;
  delete options.events;

  var kml_options = options,
      layer = new google.maps.KmlLayer(url, kml_options);

  for (var ev in events) {
    (function(object, name) {
      google.maps.event.addListener(object, name, function(e) {
        events[name].apply(this, [e]);
      });
    })(layer, ev);
  }

  this.layers.push(layer);

  return layer;
};

GMaps.prototype.loadFromKML = function(options) {
  var layer = this.getFromKML(options);
  layer.setMap(this.map);

  return layer;
};

GMaps.prototype.addLayer = function(layerName, options) {
  //var default_layers = ['weather', 'clouds', 'traffic', 'transit', 'bicycling', 'panoramio', 'places'];
  options = options || {};
  var layer;

  switch(layerName) {
    case 'weather': this.singleLayers.weather = layer = new google.maps.weather.WeatherLayer();
      break;
    case 'clouds': this.singleLayers.clouds = layer = new google.maps.weather.CloudLayer();
      break;
    case 'traffic': this.singleLayers.traffic = layer = new google.maps.TrafficLayer();
      break;
    case 'transit': this.singleLayers.transit = layer = new google.maps.TransitLayer();
      break;
    case 'bicycling': this.singleLayers.bicycling = layer = new google.maps.BicyclingLayer();
      break;
    case 'panoramio':
        this.singleLayers.panoramio = layer = new google.maps.panoramio.PanoramioLayer();
        layer.setTag(options.filter);
        delete options.filter;

        //click event
        if (options.click) {
          google.maps.event.addListener(layer, 'click', function(event) {
            options.click(event);
            delete options.click;
          });
        }
      break;
      case 'places':
        this.singleLayers.places = layer = new google.maps.places.PlacesService(this.map);

        //search, nearbySearch, radarSearch callback, Both are the same
        if (options.search || options.nearbySearch || options.radarSearch) {
          var placeSearchRequest  = {
            bounds : options.bounds || null,
            keyword : options.keyword || null,
            location : options.location || null,
            name : options.name || null,
            radius : options.radius || null,
            rankBy : options.rankBy || null,
            types : options.types || null
          };

          if (options.radarSearch) {
            layer.radarSearch(placeSearchRequest, options.radarSearch);
          }

          if (options.search) {
            layer.search(placeSearchRequest, options.search);
          }

          if (options.nearbySearch) {
            layer.nearbySearch(placeSearchRequest, options.nearbySearch);
          }
        }

        //textSearch callback
        if (options.textSearch) {
          var textSearchRequest  = {
            bounds : options.bounds || null,
            location : options.location || null,
            query : options.query || null,
            radius : options.radius || null
          };

          layer.textSearch(textSearchRequest, options.textSearch);
        }
      break;
  }

  if (layer !== undefined) {
    if (typeof layer.setOptions == 'function') {
      layer.setOptions(options);
    }
    if (typeof layer.setMap == 'function') {
      layer.setMap(this.map);
    }

    return layer;
  }
};

GMaps.prototype.removeLayer = function(layer) {
  if (typeof(layer) == "string" && this.singleLayers[layer] !== undefined) {
     this.singleLayers[layer].setMap(null);

     delete this.singleLayers[layer];
  }
  else {
    for (var i = 0; i < this.layers.length; i++) {
      if (this.layers[i] === layer) {
        this.layers[i].setMap(null);
        this.layers.splice(i, 1);

        break;
      }
    }
  }
};

var travelMode, unitSystem;

GMaps.prototype.getRoutes = function(options) {
  switch (options.travelMode) {
    case 'bicycling':
      travelMode = google.maps.TravelMode.BICYCLING;
      break;
    case 'transit':
      travelMode = google.maps.TravelMode.TRANSIT;
      break;
    case 'driving':
      travelMode = google.maps.TravelMode.DRIVING;
      break;
    default:
      travelMode = google.maps.TravelMode.WALKING;
      break;
  }

  if (options.unitSystem === 'imperial') {
    unitSystem = google.maps.UnitSystem.IMPERIAL;
  }
  else {
    unitSystem = google.maps.UnitSystem.METRIC;
  }

  var base_options = {
        avoidHighways: false,
        avoidTolls: false,
        optimizeWaypoints: false,
        waypoints: []
      },
      request_options =  extend_object(base_options, options);

  request_options.origin = /string/.test(typeof options.origin) ? options.origin : new google.maps.LatLng(options.origin[0], options.origin[1]);
  request_options.destination = /string/.test(typeof options.destination) ? options.destination : new google.maps.LatLng(options.destination[0], options.destination[1]);
  request_options.travelMode = travelMode;
  request_options.unitSystem = unitSystem;

  delete request_options.callback;
  delete request_options.error;

  var self = this,
      service = new google.maps.DirectionsService();

  service.route(request_options, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      for (var r in result.routes) {
        if (result.routes.hasOwnProperty(r)) {
          self.routes.push(result.routes[r]);
        }
      }

      if (options.callback) {
        options.callback(self.routes);
      }
    }
    else {
      if (options.error) {
        options.error(result, status);
      }
    }
  });
};

GMaps.prototype.removeRoutes = function() {
  this.routes = [];
};

GMaps.prototype.getElevations = function(options) {
  options = extend_object({
    locations: [],
    path : false,
    samples : 256
  }, options);

  if (options.locations.length > 0) {
    if (options.locations[0].length > 0) {
      options.locations = array_flat(array_map([options.locations], arrayToLatLng,  false));
    }
  }

  var callback = options.callback;
  delete options.callback;

  var service = new google.maps.ElevationService();

  //location request
  if (!options.path) {
    delete options.path;
    delete options.samples;

    service.getElevationForLocations(options, function(result, status) {
      if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  //path request
  } else {
    var pathRequest = {
      path : options.locations,
      samples : options.samples
    };

    service.getElevationAlongPath(pathRequest, function(result, status) {
     if (callback && typeof(callback) === "function") {
        callback(result, status);
      }
    });
  }
};

GMaps.prototype.cleanRoute = GMaps.prototype.removePolylines;

GMaps.prototype.drawRoute = function(options) {
  var self = this;

  this.getRoutes({
    origin: options.origin,
    destination: options.destination,
    travelMode: options.travelMode,
    waypoints: options.waypoints,
    unitSystem: options.unitSystem,
    error: options.error,
    callback: function(e) {
      if (e.length > 0) {
        self.drawPolyline({
          path: e[e.length - 1].overview_path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        });
        
        if (options.callback) {
          options.callback(e[e.length - 1]);
        }
      }
    }
  });
};

GMaps.prototype.travelRoute = function(options) {
  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      unitSystem: options.unitSystem,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i=0, step; step=steps[i]; i++) {
              step.step_number = i;
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i=0, step; step=steps[i]; i++) {
        step.step_number = i;
        options.step(step);
      }
    }
  }
};

GMaps.prototype.drawSteppedRoute = function(options) {
  var self = this;
  
  if (options.origin && options.destination) {
    this.getRoutes({
      origin: options.origin,
      destination: options.destination,
      travelMode: options.travelMode,
      waypoints : options.waypoints,
      error: options.error,
      callback: function(e) {
        //start callback
        if (e.length > 0 && options.start) {
          options.start(e[e.length - 1]);
        }

        //step callback
        if (e.length > 0 && options.step) {
          var route = e[e.length - 1];
          if (route.legs.length > 0) {
            var steps = route.legs[0].steps;
            for (var i=0, step; step=steps[i]; i++) {
              step.step_number = i;
              self.drawPolyline({
                path: step.path,
                strokeColor: options.strokeColor,
                strokeOpacity: options.strokeOpacity,
                strokeWeight: options.strokeWeight
              });
              options.step(step, (route.legs[0].steps.length - 1));
            }
          }
        }

        //end callback
        if (e.length > 0 && options.end) {
           options.end(e[e.length - 1]);
        }
      }
    });
  }
  else if (options.route) {
    if (options.route.legs.length > 0) {
      var steps = options.route.legs[0].steps;
      for (var i=0, step; step=steps[i]; i++) {
        step.step_number = i;
        self.drawPolyline({
          path: step.path,
          strokeColor: options.strokeColor,
          strokeOpacity: options.strokeOpacity,
          strokeWeight: options.strokeWeight
        });
        options.step(step);
      }
    }
  }
};

GMaps.Route = function(options) {
  this.origin = options.origin;
  this.destination = options.destination;
  this.waypoints = options.waypoints;

  this.map = options.map;
  this.route = options.route;
  this.step_count = 0;
  this.steps = this.route.legs[0].steps;
  this.steps_length = this.steps.length;

  this.polyline = this.map.drawPolyline({
    path: new google.maps.MVCArray(),
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight
  }).getPath();
};

GMaps.Route.prototype.getRoute = function(options) {
  var self = this;

  this.map.getRoutes({
    origin : this.origin,
    destination : this.destination,
    travelMode : options.travelMode,
    waypoints : this.waypoints || [],
    error: options.error,
    callback : function() {
      self.route = e[0];

      if (options.callback) {
        options.callback.call(self);
      }
    }
  });
};

GMaps.Route.prototype.back = function() {
  if (this.step_count > 0) {
    this.step_count--;
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.pop();
      }
    }
  }
};

GMaps.Route.prototype.forward = function() {
  if (this.step_count < this.steps_length) {
    var path = this.route.legs[0].steps[this.step_count].path;

    for (var p in path){
      if (path.hasOwnProperty(p)){
        this.polyline.push(path[p]);
      }
    }
    this.step_count++;
  }
};

GMaps.prototype.checkGeofence = function(lat, lng, fence) {
  return fence.containsLatLng(new google.maps.LatLng(lat, lng));
};

GMaps.prototype.checkMarkerGeofence = function(marker, outside_callback) {
  if (marker.fences) {
    for (var i = 0, fence; fence = marker.fences[i]; i++) {
      var pos = marker.getPosition();
      if (!this.checkGeofence(pos.lat(), pos.lng(), fence)) {
        outside_callback(marker, fence);
      }
    }
  }
};

GMaps.prototype.toImage = function(options) {
  var options = options || {},
      static_map_options = {};

  static_map_options['size'] = options['size'] || [this.el.clientWidth, this.el.clientHeight];
  static_map_options['lat'] = this.getCenter().lat();
  static_map_options['lng'] = this.getCenter().lng();

  if (this.markers.length > 0) {
    static_map_options['markers'] = [];
    
    for (var i = 0; i < this.markers.length; i++) {
      static_map_options['markers'].push({
        lat: this.markers[i].getPosition().lat(),
        lng: this.markers[i].getPosition().lng()
      });
    }
  }

  if (this.polylines.length > 0) {
    var polyline = this.polylines[0];
    
    static_map_options['polyline'] = {};
    static_map_options['polyline']['path'] = google.maps.geometry.encoding.encodePath(polyline.getPath());
    static_map_options['polyline']['strokeColor'] = polyline.strokeColor
    static_map_options['polyline']['strokeOpacity'] = polyline.strokeOpacity
    static_map_options['polyline']['strokeWeight'] = polyline.strokeWeight
  }

  return GMaps.staticMapURL(static_map_options);
};

GMaps.staticMapURL = function(options){
  var parameters = [],
      data,
      static_root = 'http://maps.googleapis.com/maps/api/staticmap';

  if (options.url) {
    static_root = options.url;
    delete options.url;
  }

  static_root += '?';

  var markers = options.markers;
  
  delete options.markers;

  if (!markers && options.marker) {
    markers = [options.marker];
    delete options.marker;
  }

  var styles = options.styles;

  delete options.styles;

  var polyline = options.polyline;
  delete options.polyline;

  /** Map options **/
  if (options.center) {
    parameters.push('center=' + options.center);
    delete options.center;
  }
  else if (options.address) {
    parameters.push('center=' + options.address);
    delete options.address;
  }
  else if (options.lat) {
    parameters.push(['center=', options.lat, ',', options.lng].join(''));
    delete options.lat;
    delete options.lng;
  }
  else if (options.visible) {
    var visible = encodeURI(options.visible.join('|'));
    parameters.push('visible=' + visible);
  }

  var size = options.size;
  if (size) {
    if (size.join) {
      size = size.join('x');
    }
    delete options.size;
  }
  else {
    size = '630x300';
  }
  parameters.push('size=' + size);

  if (!options.zoom && options.zoom !== false) {
    options.zoom = 15;
  }

  var sensor = options.hasOwnProperty('sensor') ? !!options.sensor : true;
  delete options.sensor;
  parameters.push('sensor=' + sensor);

  for (var param in options) {
    if (options.hasOwnProperty(param)) {
      parameters.push(param + '=' + options[param]);
    }
  }

  /** Markers **/
  if (markers) {
    var marker, loc;

    for (var i=0; data=markers[i]; i++) {
      marker = [];

      if (data.size && data.size !== 'normal') {
        marker.push('size:' + data.size);
        delete data.size;
      }
      else if (data.icon) {
        marker.push('icon:' + encodeURI(data.icon));
        delete data.icon;
      }

      if (data.color) {
        marker.push('color:' + data.color.replace('#', '0x'));
        delete data.color;
      }

      if (data.label) {
        marker.push('label:' + data.label[0].toUpperCase());
        delete data.label;
      }

      loc = (data.address ? data.address : data.lat + ',' + data.lng);
      delete data.address;
      delete data.lat;
      delete data.lng;

      for(var param in data){
        if (data.hasOwnProperty(param)) {
          marker.push(param + ':' + data[param]);
        }
      }

      if (marker.length || i === 0) {
        marker.push(loc);
        marker = marker.join('|');
        parameters.push('markers=' + encodeURI(marker));
      }
      // New marker without styles
      else {
        marker = parameters.pop() + encodeURI('|' + loc);
        parameters.push(marker);
      }
    }
  }

  /** Map Styles **/
  if (styles) {
    for (var i = 0; i < styles.length; i++) {
      var styleRule = [];
      if (styles[i].featureType){
        styleRule.push('feature:' + styles[i].featureType.toLowerCase());
      }

      if (styles[i].elementType) {
        styleRule.push('element:' + styles[i].elementType.toLowerCase());
      }

      for (var j = 0; j < styles[i].stylers.length; j++) {
        for (var p in styles[i].stylers[j]) {
          var ruleArg = styles[i].stylers[j][p];
          if (p == 'hue' || p == 'color') {
            ruleArg = '0x' + ruleArg.substring(1);
          }
          styleRule.push(p + ':' + ruleArg);
        }
      }

      var rule = styleRule.join('|');
      if (rule != '') {
        parameters.push('style=' + rule);
      }
    }
  }

  /** Polylines **/
  function parseColor(color, opacity) {
    if (color[0] === '#'){
      color = color.replace('#', '0x');

      if (opacity) {
        opacity = parseFloat(opacity);
        opacity = Math.min(1, Math.max(opacity, 0));
        if (opacity === 0) {
          return '0x00000000';
        }
        opacity = (opacity * 255).toString(16);
        if (opacity.length === 1) {
          opacity += opacity;
        }

        color = color.slice(0,8) + opacity;
      }
    }
    return color;
  }

  if (polyline) {
    data = polyline;
    polyline = [];

    if (data.strokeWeight) {
      polyline.push('weight:' + parseInt(data.strokeWeight, 10));
    }

    if (data.strokeColor) {
      var color = parseColor(data.strokeColor, data.strokeOpacity);
      polyline.push('color:' + color);
    }

    if (data.fillColor) {
      var fillcolor = parseColor(data.fillColor, data.fillOpacity);
      polyline.push('fillcolor:' + fillcolor);
    }

    var path = data.path;
    if (path.join) {
      for (var j=0, pos; pos=path[j]; j++) {
        polyline.push(pos.join(','));
      }
    }
    else {
      polyline.push('enc:' + path);
    }

    polyline = polyline.join('|');
    parameters.push('path=' + encodeURI(polyline));
  }

  /** Retina support **/
  var dpi = window.devicePixelRatio || 1;
  parameters.push('scale=' + dpi);

  parameters = parameters.join('&');
  return static_root + parameters;
};

GMaps.prototype.addMapType = function(mapTypeId, options) {
  if (options.hasOwnProperty("getTileUrl") && typeof(options["getTileUrl"]) == "function") {
    options.tileSize = options.tileSize || new google.maps.Size(256, 256);

    var mapType = new google.maps.ImageMapType(options);

    this.map.mapTypes.set(mapTypeId, mapType);
  }
  else {
    throw "'getTileUrl' function required.";
  }
};

GMaps.prototype.addOverlayMapType = function(options) {
  if (options.hasOwnProperty("getTile") && typeof(options["getTile"]) == "function") {
    var overlayMapTypeIndex = options.index;

    delete options.index;

    this.map.overlayMapTypes.insertAt(overlayMapTypeIndex, options);
  }
  else {
    throw "'getTile' function required.";
  }
};

GMaps.prototype.removeOverlayMapType = function(overlayMapTypeIndex) {
  this.map.overlayMapTypes.removeAt(overlayMapTypeIndex);
};

GMaps.prototype.addStyle = function(options) {
  var styledMapType = new google.maps.StyledMapType(options.styles, { name: options.styledMapName });

  this.map.mapTypes.set(options.mapTypeId, styledMapType);
};

GMaps.prototype.setStyle = function(mapTypeId) {
  this.map.setMapTypeId(mapTypeId);
};

GMaps.prototype.createPanorama = function(streetview_options) {
  if (!streetview_options.hasOwnProperty('lat') || !streetview_options.hasOwnProperty('lng')) {
    streetview_options.lat = this.getCenter().lat();
    streetview_options.lng = this.getCenter().lng();
  }

  this.panorama = GMaps.createPanorama(streetview_options);

  this.map.setStreetView(this.panorama);

  return this.panorama;
};

GMaps.createPanorama = function(options) {
  var el = getElementById(options.el, options.context);

  options.position = new google.maps.LatLng(options.lat, options.lng);

  delete options.el;
  delete options.context;
  delete options.lat;
  delete options.lng;

  var streetview_events = ['closeclick', 'links_changed', 'pano_changed', 'position_changed', 'pov_changed', 'resize', 'visible_changed'],
      streetview_options = extend_object({visible : true}, options);

  for (var i = 0; i < streetview_events.length; i++) {
    delete streetview_options[streetview_events[i]];
  }

  var panorama = new google.maps.StreetViewPanorama(el, streetview_options);

  for (var i = 0; i < streetview_events.length; i++) {
    (function(object, name) {
      if (options[name]) {
        google.maps.event.addListener(object, name, function(){
          options[name].apply(this);
        });
      }
    })(panorama, streetview_events[i]);
  }

  return panorama;
};

GMaps.prototype.on = function(event_name, handler) {
  return GMaps.on(event_name, this, handler);
};

GMaps.prototype.off = function(event_name) {
  GMaps.off(event_name, this);
};

GMaps.custom_events = ['marker_added', 'marker_removed', 'polyline_added', 'polyline_removed', 'polygon_added', 'polygon_removed', 'geolocated', 'geolocation_failed'];

GMaps.on = function(event_name, object, handler) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map; 
    return google.maps.event.addListener(object, event_name, handler);
  }
  else {
    var registered_event = {
      handler : handler,
      eventName : event_name
    };

    object.registered_events[event_name] = object.registered_events[event_name] || [];
    object.registered_events[event_name].push(registered_event);

    return registered_event;
  }
};

GMaps.off = function(event_name, object) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    if(object instanceof GMaps) object = object.map; 
    google.maps.event.clearListeners(object, event_name);
  }
  else {
    object.registered_events[event_name] = [];
  }
};

GMaps.fire = function(event_name, object, scope) {
  if (GMaps.custom_events.indexOf(event_name) == -1) {
    google.maps.event.trigger(object, event_name, Array.prototype.slice.apply(arguments).slice(2));
  }
  else {
    if(event_name in scope.registered_events) {
      var firing_events = scope.registered_events[event_name];

      for(var i = 0; i < firing_events.length; i++) {
        (function(handler, scope, object) {
          handler.apply(scope, [object]);
        })(firing_events[i]['handler'], scope, object);
      }
    }
  }
};

GMaps.geolocate = function(options) {
  var complete_callback = options.always || options.complete;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      options.success(position);

      if (complete_callback) {
        complete_callback();
      }
    }, function(error) {
      options.error(error);

      if (complete_callback) {
        complete_callback();
      }
    }, options.options);
  }
  else {
    options.not_supported();

    if (complete_callback) {
      complete_callback();
    }
  }
};

GMaps.geocode = function(options) {
  this.geocoder = new google.maps.Geocoder();
  var callback = options.callback;
  if (options.hasOwnProperty('lat') && options.hasOwnProperty('lng')) {
    options.latLng = new google.maps.LatLng(options.lat, options.lng);
  }

  delete options.lat;
  delete options.lng;
  delete options.callback;
  
  this.geocoder.geocode(options, function(results, status) {
    callback(results, status);
  });
};

//==========================
// Polygon containsLatLng
// https://github.com/tparkin/Google-Maps-Point-in-Polygon
// Poygon getBounds extension - google-maps-extensions
// http://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
if (!google.maps.Polygon.prototype.getBounds) {
  google.maps.Polygon.prototype.getBounds = function(latLng) {
    var bounds = new google.maps.LatLngBounds();
    var paths = this.getPaths();
    var path;

    for (var p = 0; p < paths.getLength(); p++) {
      path = paths.getAt(p);
      for (var i = 0; i < path.getLength(); i++) {
        bounds.extend(path.getAt(i));
      }
    }

    return bounds;
  };
}

if (!google.maps.Polygon.prototype.containsLatLng) {
  // Polygon containsLatLng - method to determine if a latLng is within a polygon
  google.maps.Polygon.prototype.containsLatLng = function(latLng) {
    // Exclude points outside of bounds as there is no way they are in the poly
    var bounds = this.getBounds();

    if (bounds !== null && !bounds.contains(latLng)) {
      return false;
    }

    // Raycast point in polygon method
    var inPoly = false;

    var numPaths = this.getPaths().getLength();
    for (var p = 0; p < numPaths; p++) {
      var path = this.getPaths().getAt(p);
      var numPoints = path.getLength();
      var j = numPoints - 1;

      for (var i = 0; i < numPoints; i++) {
        var vertex1 = path.getAt(i);
        var vertex2 = path.getAt(j);

        if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng()) {
          if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
            inPoly = !inPoly;
          }
        }

        j = i;
      }
    }

    return inPoly;
  };
}

google.maps.LatLngBounds.prototype.containsLatLng = function(latLng) {
  return this.contains(latLng);
};

google.maps.Marker.prototype.setFences = function(fences) {
  this.fences = fences;
};

google.maps.Marker.prototype.addFence = function(fence) {
  this.fences.push(fence);
};

google.maps.Marker.prototype.getId = function() {
  return this['__gm_id'];
};

//==========================
// Array indexOf
// https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
          throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
          return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
          n = Number(arguments[1]);
          if (n != n) { // shortcut for verifying if it's NaN
              n = 0;
          } else if (n != 0 && n != Infinity && n != -Infinity) {
              n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
          if (k in t && t[k] === searchElement) {
              return k;
          }
      }
      return -1;
  }
}
  
return GMaps;
}));
///#source 1 1 /source/assets/myJs/plugins/jquery.videoBG.js
/**
 * @preserve Copyright 2011 Syd Lawrence ( www.sydlawrence.com ).
 * Version: 0.2
 *
 * Licensed under MIT and GPLv2.
 *
 * Usage: $('body').videoBG(options);
 *
 */

(function ($) {

    $.fn.videoBG = function (selector, options) {
        if (options === undefined) {
            options = {};
        }
        if (typeof selector === "object") {
            options = $.extend({}, $.fn.videoBG.defaults, selector);
        }
        else if (!selector) {
            options = $.fn.videoBG.defaults;
        }
        else {
            return $(selector).videoBG(options);
        }

        var container = $(this);

        // check if elements available otherwise it will cause issues
        if (!container.length) {
            return;
        }

        // container to be at least relative
        if (container.css('position') == 'static' || !container.css('position')) {
            container.css('position', 'relative');
        }

        // we need a width
        if (options.width === 0) {
            options.width = container.width();
        }

        // we need a height
        if (options.height === 0) {
            options.height = container.height();
        }

        // get the wrapper
        var wrap = $.fn.videoBG.wrapper();
        wrap.height(options.height)
                .width(options.width);

        // if is a text replacement
        if (options.textReplacement) {

            // force sizes
            options.scale = true;

            // set sizes and forcing text out
            container.width(options.width)
                    .height(options.height)
                    .css('text-indent', '-9999px');
        }
        else {

            // set the wrapper above the video
            wrap.css('z-index', options.zIndex + 1);
        }

        // move the contents into the wrapper
        wrap.html(container.clone(true));

        // get the video
        var video = $.fn.videoBG.video(options);

        // if we are forcing width / height
        if (options.scale) {

            // overlay wrapper
            wrap.height(options.height)
                    .width(options.width);

            // video
            video.height(options.height)
                    .width(options.width);
        }

        // add it all to the container
        container.html(wrap);
        container.append(video);

        return video.find("video")[0];
    };

    // set to fullscreen
    $.fn.videoBG.setFullscreen = function ($el) {
        var windowWidth = $(window).width(),
                windowHeight = $(window).height();

        $el.css('min-height', 0).css('min-width', 0);
        $el.parent().width(windowWidth).height(windowHeight);
        // if by width
        var shift = 0;
        if (windowWidth / windowHeight > $el.aspectRatio) {
            $el.width(windowWidth).height('auto');
            // shift the element up
            var height = $el.height();
            shift = (height - windowHeight) / 2;
            if (shift < 0) {
                shift = 0;
            }
            $el.css("top", -shift);
        } else {
            $el.width('auto').height(windowHeight);
            // shift the element left
            var width = $el.width();
            shift = (width - windowWidth) / 2;
            if (shift < 0) {
                shift = 0;
            }
            $el.css("left", -shift);

            // this is a hack mainly due to the iphone
            if (shift === 0) {
                var t = setTimeout(function () {
                    $.fn.videoBG.setFullscreen($el);
                }, 500);
            }
        }

        $('body > .videoBG_wrapper').width(windowWidth).height(windowHeight);

    };

    // get the formatted video element
    $.fn.videoBG.video = function (options) {

        $('html, body').scrollTop(-1);

        // video container
        var $div = $('<div/>');
        $div.addClass('videoBG')
                .css('position', options.position)
                .css('z-index', options.zIndex)
                .css('top', 0)
                .css('left', 0)
                .css('height', options.height)
                .css('width', options.width)
                .css('opacity', options.opacity)
                .css('overflow', 'hidden');

        // video element
        var $video = $('<video/>');
        $video.attr('id', "video-bg")
                .css('position', 'absolute')
                .css('z-index', options.zIndex)
                .attr('poster', options.poster)
                .css('top', 0)
                .css('left', 0)
                .css('min-width', '100%')
                .css('min-height', '100%');

        if (options.autoplay) {
            $video.attr('autoplay', options.autoplay);
        }

        // if fullscreen
        if (options.fullscreen) {
            $video.bind('canplay', function () {
                // set the aspect ratio
                $video.aspectRatio = $video.width() / $video.height();
                $.fn.videoBG.setFullscreen($video);
            });

            // listen out for screenresize
            var resizeTimeout;
            $(window).resize(function () {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(function () {
                    $.fn.videoBG.setFullscreen($video);
                }, 100);
            });
            $.fn.videoBG.setFullscreen($video);
        }


        // video standard element
        var v = $video[0];

        // if meant to loop
        if (options.loop) {
            loops_left = options.loop;

            // cant use the loop attribute as firefox doesnt support it
            $video.bind('ended', function () {

                // if we have some loops to throw
                if (loops_left) {
                    // replay that bad boy
                    v.play();
                }

                // if not forever
                if (loops_left !== true) {
                    // one less loop
                    loops_left--;
                }
            });
        }

        // when can play, play
        $video.bind('canplay', function () {

            if (options.autoplay) {
                // replay that bad boy
                v.play();
            }

        });


        // if supports video
        if ($.fn.videoBG.supportsVideo()) {

            // supports webm
            if ($.fn.videoBG.supportType('webm')) {

                // play webm
                $video.attr('src', options.webm);
            }
            // supports mp4
            else if ($.fn.videoBG.supportType('mp4')) {

                // play mp4
                $video.attr('src', options.mp4);
            }
            // throw ogv at it then
            else {

                // play ogv
                $video.attr('src', options.ogv);
            }

        }

        // image for those that dont support the video
        var $img = $('<img/>');
        $img.attr('src', options.poster)
                .css('position', 'absolute')
                .css('z-index', options.zIndex)
                .css('top', 0)
                .css('left', 0)
                .css('min-width', '100%')
                .css('min-height', '100%');

        // add the image to the video
        // if suuports video
        if ($.fn.videoBG.supportsVideo()) {
            // add the video to the wrapper
            $div.html($video);
        }

        // nope - whoa old skool
        else {

            // add the image instead
            $div.html($img);
        }

        // if text replacement
        if (options.textReplacement) {

            // force the heights and widths
            $div.css('min-height', 1).css('min-width', 1);
            $video.css('min-height', 1).css('min-width', 1);
            $img.css('min-height', 1).css('min-width', 1);

            $div.height(options.height).width(options.width);
            $video.height(options.height).width(options.width);
            $img.height(options.height).width(options.width);
        }

        if ($.fn.videoBG.supportsVideo()) {
            v.play();
        }
        return $div;
    };

    // check if suuports video
    $.fn.videoBG.supportsVideo = function () {
        return (document.createElement('video').canPlayType);
    };

    // check which type is supported
    $.fn.videoBG.supportType = function (str) {

        // if not at all supported
        if (!$.fn.videoBG.supportsVideo()) {
            return false;
        }

        // create video
        var v = document.createElement('video');

        // check which?
        switch (str) {
            case 'webm' :
                return (v.canPlayType('video/webm; codecs="vp8, vorbis"'));
            case 'mp4' :
                return (v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
            case 'ogv' :
                return (v.canPlayType('video/ogg; codecs="theora, vorbis"'));
        }
        // nope
        return false;
    };

    // get the overlay wrapper
    $.fn.videoBG.wrapper = function () {
        var $wrap = $('<div/>');
        $wrap.addClass('videoBG_wrapper')
                .css('position', 'absolute')
                .css('top', 0)
                .css('left', 0);
        return $wrap;
    };

    // these are the defaults
    $.fn.videoBG.defaults = {
        mp4: '',
        ogv: '',
        webm: '',
        poster: '',
        autoplay: true,
        loop: true,
        scale: false,
        position: "absolute",
        opacity: 1,
        textReplacement: false,
        zIndex: 0,
        width: 0,
        height: 0,
        fullscreen: false,
        imgFallback: true
    };

})(jQuery);
///#source 1 1 /source/assets/myJs/plugins/lazyImages.js
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function ($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function (options) {
        var elements = this;
        var $container;
        var settings = {
            threshold: 0,
            failure_limit: 0,
            event: "scroll",
            effect: "show",
            container: window,
            data_attribute: "original",
            skip_invisible: false,
            appear: null,
            load: null,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
        };

        function update() {
            var counter = 0;

            elements.each(function () {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                    /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                    $this.trigger("appear");
                    /* if we found an image we'll load, reset the counter */
                    counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if (options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function () {
                return update();
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function () {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function (element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function () {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function () {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function (event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function () {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function () {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
               !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold": function (a) { return $.belowthefold(a, { threshold: 0 }); },
        "above-the-top": function (a) { return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-screen": function (a) { return $.rightoffold(a, { threshold: 0 }); },
        "left-of-screen": function (a) { return !$.rightoffold(a, { threshold: 0 }); },
        "in-viewport": function (a) { return $.inviewport(a, { threshold: 0 }); },
        /* Maintain BC for couple of versions. */
        "above-the-fold": function (a) { return !$.belowthefold(a, { threshold: 0 }); },
        "right-of-fold": function (a) { return $.rightoffold(a, { threshold: 0 }); },
        "left-of-fold": function (a) { return !$.rightoffold(a, { threshold: 0 }); }
    });

})(jQuery, window, document);
///#source 1 1 /source/pages/galeria/js/blueimp-helper.js
/*
 * blueimp helper JS 1.2.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function () {
    'use strict';

    function extend(obj1, obj2) {
        var prop;
        for (prop in obj2) {
            if (obj2.hasOwnProperty(prop)) {
                obj1[prop] = obj2[prop];
            }
        }
        return obj1;
    }

    function Helper(query) {
        if (!this || this.find !== Helper.prototype.find) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Helper(query);
        }
        this.length = 0;
        if (query) {
            if (typeof query === 'string') {
                query = this.find(query);
            }
            if (query.nodeType || query === query.window) {
                // Single HTML element
                this.length = 1;
                this[0] = query;
            } else {
                // HTML element collection
                var i = query.length;
                this.length = i;
                while (i) {
                    i -= 1;
                    this[i] = query[i];
                }
            }
        }
    }

    Helper.extend = extend;

    Helper.contains = function (container, element) {
        do {
            element = element.parentNode;
            if (element === container) {
                return true;
            }
        } while (element);
        return false;
    };

    Helper.parseJSON = function (string) {
        return window.JSON && JSON.parse(string);
    };

    extend(Helper.prototype, {

        find: function (query) {
            var container = this[0] || document;
            if (typeof query === 'string') {
                if (container.querySelectorAll) {
                    query = container.querySelectorAll(query);
                } else if (query.charAt(0) === '#') {
                    query = container.getElementById(query.slice(1));
                } else {
                    query = container.getElementsByTagName(query);
                }
            }
            return new Helper(query);
        },

        hasClass: function (className) {
            if (!this[0]) {
                return false;
            }
            return new RegExp('(^|\\s+)' + className +
                '(\\s+|$)').test(this[0].className);
        },

        addClass: function (className) {
            var i = this.length,
                element;
            while (i) {
                i -= 1;
                element = this[i];
                if (!element.className) {
                    element.className = className;
                    return this;
                }
                if (this.hasClass(className)) {
                    return this;
                }
                element.className += ' ' + className;
            }
            return this;
        },

        removeClass: function (className) {
            var regexp = new RegExp('(^|\\s+)' + className + '(\\s+|$)'),
                i = this.length,
                element;
            while (i) {
                i -= 1;
                element = this[i];
                element.className = element.className.replace(regexp, ' ');
            }
            return this;
        },

        on: function (eventName, handler) {
            var eventNames = eventName.split(/\s+/),
                i,
                element;
            while (eventNames.length) {
                eventName = eventNames.shift();
                i = this.length;
                while (i) {
                    i -= 1;
                    element = this[i];
                    if (element.addEventListener) {
                        element.addEventListener(eventName, handler, false);
                    } else if (element.attachEvent) {
                        element.attachEvent('on' + eventName, handler);
                    }
                }
            }
            return this;
        },

        off: function (eventName, handler) {
            var eventNames = eventName.split(/\s+/),
                i,
                element;
            while (eventNames.length) {
                eventName = eventNames.shift();
                i = this.length;
                while (i) {
                    i -= 1;
                    element = this[i];
                    if (element.removeEventListener) {
                        element.removeEventListener(eventName, handler, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + eventName, handler);
                    }
                }
            }
            return this;
        },

        empty: function () {
            var i = this.length,
                element;
            while (i) {
                i -= 1;
                element = this[i];
                while (element.hasChildNodes()) {
                    element.removeChild(element.lastChild);
                }
            }
            return this;
        },

        first: function () {
            return new Helper(this[0]);
        }

    });

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Helper;
        });
    } else {
        window.blueimp = window.blueimp || {};
        window.blueimp.helper = Helper;
    }
}());

///#source 1 1 /source/pages/galeria/js/blueimp-gallery.js
/*
 * blueimp Gallery JS 2.14.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Swipe implementation based on
 * https://github.com/bradbirdsall/Swipe
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document, DocumentTouch */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define(['./blueimp-helper'], factory);
    } else {
        // Browser globals:
        window.blueimp = window.blueimp || {};
        window.blueimp.Gallery = factory(
            window.blueimp.helper || window.jQuery
        );
    }
}(function ($) {
    'use strict';

    function Gallery(list, options) {
        if (document.body.style.maxHeight === undefined) {
            // document.body.style.maxHeight is undefined on IE6 and lower
            return null;
        }
        if (!this || this.options !== Gallery.prototype.options) {
            // Called as function instead of as constructor,
            // so we simply return a new instance:
            return new Gallery(list, options);
        }
        if (!list || !list.length) {
            this.console.log(
                'blueimp Gallery: No or empty list provided as first argument.',
                list
            );
            return;
        }
        this.list = list;
        this.num = list.length;
        this.initOptions(options);
        this.initialize();
    }

    $.extend(Gallery.prototype, {

        options: {
            // The Id, element or querySelector of the gallery widget:
            container: '#blueimp-gallery',
            // The tag name, Id, element or querySelector of the slides container:
            slidesContainer: 'div',
            // The tag name, Id, element or querySelector of the title element:
            titleElement: 'h3',
            // The class to add when the gallery is visible:
            displayClass: 'blueimp-gallery-display',
            // The class to add when the gallery controls are visible:
            controlsClass: 'blueimp-gallery-controls',
            // The class to add when the gallery only displays one element:
            singleClass: 'blueimp-gallery-single',
            // The class to add when the left edge has been reached:
            leftEdgeClass: 'blueimp-gallery-left',
            // The class to add when the right edge has been reached:
            rightEdgeClass: 'blueimp-gallery-right',
            // The class to add when the automatic slideshow is active:
            playingClass: 'blueimp-gallery-playing',
            // The class for all slides:
            slideClass: 'slide',
            // The slide class for loading elements:
            slideLoadingClass: 'slide-loading',
            // The slide class for elements that failed to load:
            slideErrorClass: 'slide-error',
            // The class for the content element loaded into each slide:
            slideContentClass: 'slide-content',
            // The class for the "toggle" control:
            toggleClass: 'toggle',
            // The class for the "prev" control:
            prevClass: 'prev',
            // The class for the "next" control:
            nextClass: 'next',
            // The class for the "close" control:
            closeClass: 'close',
            // The class for the "play-pause" toggle control:
            playPauseClass: 'play-pause',
            // The list object property (or data attribute) with the object type:
            typeProperty: 'type',
            // The list object property (or data attribute) with the object title:
            titleProperty: 'title',
            // The list object property (or data attribute) with the object URL:
            urlProperty: 'href',
            // The gallery listens for transitionend events before triggering the
            // opened and closed events, unless the following option is set to false:
            displayTransition: true,
            // Defines if the gallery slides are cleared from the gallery modal,
            // or reused for the next gallery initialization:
            clearSlides: true,
            // Defines if images should be stretched to fill the available space,
            // while maintaining their aspect ratio (will only be enabled for browsers
            // supporting background-size="contain", which excludes IE < 9).
            // Set to "cover", to make images cover all available space (requires
            // support for background-size="cover", which excludes IE < 9):
            stretchImages: false,
            // Toggle the controls on pressing the Return key:
            toggleControlsOnReturn: true,
            // Toggle the automatic slideshow interval on pressing the Space key:
            toggleSlideshowOnSpace: true,
            // Navigate the gallery by pressing left and right on the keyboard:
            enableKeyboardNavigation: true,
            // Close the gallery on pressing the Esc key:
            closeOnEscape: true,
            // Close the gallery when clicking on an empty slide area:
            closeOnSlideClick: true,
            // Close the gallery by swiping up or down:
            closeOnSwipeUpOrDown: true,
            // Emulate touch events on mouse-pointer devices such as desktop browsers:
            emulateTouchEvents: true,
            // Stop touch events from bubbling up to ancestor elements of the Gallery:
            stopTouchEventsPropagation: false,
            // Hide the page scrollbars: 
            hidePageScrollbars: true,
            // Stops any touches on the container from scrolling the page:
            disableScroll: true,
            // Carousel mode (shortcut for carousel specific options):
            carousel: false,
            // Allow continuous navigation, moving from last to first
            // and from first to last slide:
            continuous: true,
            // Remove elements outside of the preload range from the DOM:
            unloadElements: true,
            // Start with the automatic slideshow:
            startSlideshow: false,
            // Delay in milliseconds between slides for the automatic slideshow:
            slideshowInterval: 5000,
            // The starting index as integer.
            // Can also be an object of the given list,
            // or an equal object with the same url property:
            index: 0,
            // The number of elements to load around the current index:
            preloadRange: 2,
            // The transition speed between slide changes in milliseconds:
            transitionSpeed: 400,
            // The transition speed for automatic slide changes, set to an integer
            // greater 0 to override the default transition speed:
            slideshowTransitionSpeed: undefined,
            // The event object for which the default action will be canceled
            // on Gallery initialization (e.g. the click event to open the Gallery):
            event: undefined,
            // Callback function executed when the Gallery is initialized.
            // Is called with the gallery instance as "this" object:
            onopen: undefined,
            // Callback function executed when the Gallery has been initialized
            // and the initialization transition has been completed.
            // Is called with the gallery instance as "this" object:
            onopened: undefined,
            // Callback function executed on slide change.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslide: undefined,
            // Callback function executed after the slide change transition.
            // Is called with the gallery instance as "this" object and the
            // current index and slide as arguments:
            onslideend: undefined,
            // Callback function executed on slide content load.
            // Is called with the gallery instance as "this" object and the
            // slide index and slide element as arguments:
            onslidecomplete: undefined,
            // Callback function executed when the Gallery is about to be closed.
            // Is called with the gallery instance as "this" object:
            onclose: undefined,
            // Callback function executed when the Gallery has been closed
            // and the closing transition has been completed.
            // Is called with the gallery instance as "this" object:
            onclosed: undefined
        },

        carouselOptions: {
            hidePageScrollbars: false,
            toggleControlsOnReturn: false,
            toggleSlideshowOnSpace: false,
            enableKeyboardNavigation: false,
            closeOnEscape: false,
            closeOnSlideClick: false,
            closeOnSwipeUpOrDown: false,
            disableScroll: false,
            startSlideshow: true
        },

        console: window.console && typeof window.console.log === 'function' ?
            window.console :
            {log: function () {}},

        // Detect touch, transition, transform and background-size support:
        support: (function (element) {
            var support = {
                    touch: window.ontouchstart !== undefined ||
                        (window.DocumentTouch && document instanceof DocumentTouch)
                },
                transitions = {
                    webkitTransition: {
                        end: 'webkitTransitionEnd',
                        prefix: '-webkit-'
                    },
                    MozTransition: {
                        end: 'transitionend',
                        prefix: '-moz-'
                    },
                    OTransition: {
                        end: 'otransitionend',
                        prefix: '-o-'
                    },
                    transition: {
                        end: 'transitionend',
                        prefix: ''
                    }
                },
                elementTests = function () {
                    var transition = support.transition,
                        prop,
                        translateZ;
                    document.body.appendChild(element);
                    if (transition) {
                        prop = transition.name.slice(0, -9) + 'ransform';
                        if (element.style[prop] !== undefined) {
                            element.style[prop] = 'translateZ(0)';
                            translateZ = window.getComputedStyle(element)
                                .getPropertyValue(transition.prefix + 'transform');
                            support.transform = {
                                prefix: transition.prefix,
                                name: prop,
                                translate: true,
                                translateZ: !!translateZ && translateZ !== 'none'
                            };
                        }
                    }
                    if (element.style.backgroundSize !== undefined) {
                        support.backgroundSize = {};
                        element.style.backgroundSize = 'contain';
                        support.backgroundSize.contain = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'contain';
                        element.style.backgroundSize = 'cover';
                        support.backgroundSize.cover = window
                                .getComputedStyle(element)
                                .getPropertyValue('background-size') === 'cover';
                    }
                    document.body.removeChild(element);
                };
            (function (support, transitions) {
                var prop;
                for (prop in transitions) {
                    if (transitions.hasOwnProperty(prop) &&
                            element.style[prop] !== undefined) {
                        support.transition = transitions[prop];
                        support.transition.name = prop;
                        break;
                    }
                }
            }(support, transitions));
            if (document.body) {
                elementTests();
            } else {
                $(document).on('DOMContentLoaded', elementTests);
            }
            return support;
            // Test element, has to be standard HTML and must not be hidden
            // for the CSS3 tests using window.getComputedStyle to be applicable:
        }(document.createElement('div'))),

        requestAnimationFrame: window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame,

        initialize: function () {
            this.initStartIndex();
            if (this.initWidget() === false) {
                return false;
            }
            this.initEventListeners();
            // Load the slide at the given index:
            this.onslide(this.index);
            // Manually trigger the slideend event for the initial slide:
            this.ontransitionend();
            // Start the automatic slideshow if applicable:
            if (this.options.startSlideshow) {
                this.play();
            }
        },

        slide: function (to, speed) {
            window.clearTimeout(this.timeout);
            var index = this.index,
                direction,
                naturalDirection,
                diff;
            if (index === to || this.num === 1) {
                return;
            }
            if (!speed) {
                speed = this.options.transitionSpeed;
            }
            if (this.support.transition) {
                if (!this.options.continuous) {
                    to = this.circle(to);
                }
                // 1: backward, -1: forward:
                direction = Math.abs(index - to) / (index - to);
                // Get the actual position of the slide:
                if (this.options.continuous) {
                    naturalDirection = direction;
                    direction = -this.positions[this.circle(to)] / this.slideWidth;
                    // If going forward but to < index, use to = slides.length + to
                    // If going backward but to > index, use to = -slides.length + to
                    if (direction !== naturalDirection) {
                        to = -direction * this.num + to;
                    }
                }
                diff = Math.abs(index - to) - 1;
                // Move all the slides between index and to in the right direction:
                while (diff) {
                    diff -= 1;
                    this.move(
                        this.circle((to > index ? to : index) - diff - 1),
                        this.slideWidth * direction,
                        0
                    );
                }
                to = this.circle(to);
                this.move(index, this.slideWidth * direction, speed);
                this.move(to, 0, speed);
                if (this.options.continuous) {
                    this.move(
                        this.circle(to - direction),
                        -(this.slideWidth * direction),
                        0
                    );
                }
            } else {
                to = this.circle(to);
                this.animate(index * -this.slideWidth, to * -this.slideWidth, speed);
            }
            this.onslide(to);
        },

        getIndex: function () {
            return this.index;
        },

        getNumber: function () {
            return this.num;
        },

        prev: function () {
            if (this.options.continuous || this.index) {
                this.slide(this.index - 1);
            }
        },

        next: function () {
            if (this.options.continuous || this.index < this.num - 1) {
                this.slide(this.index + 1);
            }
        },

        play: function (time) {
            var that = this;
            window.clearTimeout(this.timeout);
            this.interval = time || this.options.slideshowInterval;
            if (this.elements[this.index] > 1) {
                this.timeout = this.setTimeout(
                    (!this.requestAnimationFrame && this.slide) || function (to, speed) {
                        that.animationFrameId = that.requestAnimationFrame.call(
                            window,
                            function () {
                                that.slide(to, speed);
                            }
                        );
                    },
                    [this.index + 1, this.options.slideshowTransitionSpeed],
                    this.interval
                );
            }
            this.container.addClass(this.options.playingClass);
        },

        pause: function () {
            window.clearTimeout(this.timeout);
            this.interval = null;
            this.container.removeClass(this.options.playingClass);
        },

        add: function (list) {
            var i;
            if (!list.concat) {
                // Make a real array out of the list to add:
                list = Array.prototype.slice.call(list);
            }
            if (!this.list.concat) {
                // Make a real array out of the Gallery list:
                this.list = Array.prototype.slice.call(this.list);
            }
            this.list = this.list.concat(list);
            this.num = this.list.length;
            if (this.num > 2 && this.options.continuous === null) {
                this.options.continuous = true;
                this.container.removeClass(this.options.leftEdgeClass);
            }
            this.container
                .removeClass(this.options.rightEdgeClass)
                .removeClass(this.options.singleClass);
            for (i = this.num - list.length; i < this.num; i += 1) {
                this.addSlide(i);
                this.positionSlide(i);
            }
            this.positions.length = this.num;
            this.initSlides(true);
        },

        resetSlides: function () {
            this.slidesContainer.empty();
            this.slides = [];
        },

        handleClose: function () {
            var options = this.options;
            this.destroyEventListeners();
            // Cancel the slideshow:
            this.pause();
            this.container[0].style.display = 'none';
            this.container
                .removeClass(options.displayClass)
                .removeClass(options.singleClass)
                .removeClass(options.leftEdgeClass)
                .removeClass(options.rightEdgeClass);
            if (options.hidePageScrollbars) {
                document.body.style.overflow = this.bodyOverflowStyle;
            }
            if (this.options.clearSlides) {
                this.resetSlides();
            }
            if (this.options.onclosed) {
                this.options.onclosed.call(this);
            }
        },

        close: function () {
            var that = this,
                closeHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            closeHandler
                        );
                        that.handleClose();
                    }
                };
            if (this.options.onclose) {
                this.options.onclose.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    closeHandler
                );
                this.container.removeClass(this.options.displayClass);
            } else {
                this.handleClose();
            }
        },

        circle: function (index) {
            // Always return a number inside of the slides index range:
            return (this.num + (index % this.num)) % this.num;
        },

        move: function (index, dist, speed) {
            this.translateX(index, dist, speed);
            this.positions[index] = dist;
        },

        translate: function (index, x, y, speed) {
            var style = this.slides[index].style,
                transition = this.support.transition,
                transform = this.support.transform;
            style[transition.name + 'Duration'] = speed + 'ms';
            style[transform.name] = 'translate(' + x + 'px, ' + y + 'px)' +
                (transform.translateZ ? ' translateZ(0)' : '');
        },

        translateX: function (index, x, speed) {
            this.translate(index, x, 0, speed);
        },

        translateY: function (index, y, speed) {
            this.translate(index, 0, y, speed);
        },

        animate: function (from, to, speed) {
            if (!speed) {
                this.slidesContainer[0].style.left = to + 'px';
                return;
            }
            var that = this,
                start = new Date().getTime(),
                timer = window.setInterval(function () {
                    var timeElap = new Date().getTime() - start;
                    if (timeElap > speed) {
                        that.slidesContainer[0].style.left = to + 'px';
                        that.ontransitionend();
                        window.clearInterval(timer);
                        return;
                    }
                    that.slidesContainer[0].style.left = (((to - from) *
                        (Math.floor((timeElap / speed) * 100) / 100)) +
                            from) + 'px';
                }, 4);
        },

        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        },

        onresize: function () {
            this.initSlides(true);
        },

        onmousedown: function (event) {
            // Trigger on clicks of the left mouse button only
            // and exclude video elements:
            if (event.which && event.which === 1 &&
                    event.target.nodeName !== 'VIDEO') {
                // Preventing the default mousedown action is required
                // to make touch emulation work with Firefox:
                event.preventDefault();
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchstart(event);
            }
        },

        onmousemove: function (event) {
            if (this.touchStart) {
                (event.originalEvent || event).touches = [{
                    pageX: event.pageX,
                    pageY: event.pageY
                }];
                this.ontouchmove(event);
            }
        },

        onmouseup: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        onmouseout: function (event) {
            if (this.touchStart) {
                var target = event.target,
                    related = event.relatedTarget;
                if (!related || (related !== target &&
                        !$.contains(target, related))) {
                    this.onmouseup(event);
                }
            }
        },

        ontouchstart: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0];
            this.touchStart = {
                // Remember the initial touch coordinates:
                x: touches.pageX,
                y: touches.pageY,
                // Store the time to determine touch duration:
                time: Date.now()
            };
            // Helper variable to detect scroll movement:
            this.isScrolling = undefined;
            // Reset delta values:
            this.touchDelta = {};
        },

        ontouchmove: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            // jQuery doesn't copy touch event properties by default,
            // so we have to access the originalEvent object:
            var touches = (event.originalEvent || event).touches[0],
                scale = (event.originalEvent || event).scale,
                index = this.index,
                touchDeltaX,
                indices;
            // Ensure this is a one touch swipe and not, e.g. a pinch:
            if (touches.length > 1 || (scale && scale !== 1)) {
                return;
            }
            if (this.options.disableScroll) {
                event.preventDefault();
            }
            // Measure change in x and y coordinates:
            this.touchDelta = {
                x: touches.pageX - this.touchStart.x,
                y: touches.pageY - this.touchStart.y
            };
            touchDeltaX = this.touchDelta.x;
            // Detect if this is a vertical scroll movement (run only once per touch):
            if (this.isScrolling === undefined) {
                this.isScrolling = this.isScrolling ||
                    Math.abs(touchDeltaX) < Math.abs(this.touchDelta.y);
            }
            if (!this.isScrolling) {
                // Always prevent horizontal scroll:
                event.preventDefault();
                // Stop the slideshow:
                window.clearTimeout(this.timeout);
                if (this.options.continuous) {
                    indices = [
                        this.circle(index + 1),
                        index,
                        this.circle(index - 1)
                    ];
                } else {
                    // Increase resistance if first slide and sliding left
                    // or last slide and sliding right:
                    this.touchDelta.x = touchDeltaX =
                        touchDeltaX /
                        (((!index && touchDeltaX > 0) ||
                            (index === this.num - 1 && touchDeltaX < 0)) ?
                                (Math.abs(touchDeltaX) / this.slideWidth + 1) : 1);
                    indices = [index];
                    if (index) {
                        indices.push(index - 1);
                    }
                    if (index < this.num - 1) {
                        indices.unshift(index + 1);
                    }
                }
                while (indices.length) {
                    index = indices.pop();
                    this.translateX(index, touchDeltaX + this.positions[index], 0);
                }
            } else if (this.options.closeOnSwipeUpOrDown) {
                this.translateY(index, this.touchDelta.y + this.positions[index], 0);
            }
        },

        ontouchend: function (event) {
            if (this.options.stopTouchEventsPropagation) {
                this.stopPropagation(event);
            }
            var index = this.index,
                speed = this.options.transitionSpeed,
                slideWidth = this.slideWidth,
                isShortDuration = Number(Date.now() - this.touchStart.time) < 250,
                // Determine if slide attempt triggers next/prev slide:
                isValidSlide = (isShortDuration && Math.abs(this.touchDelta.x) > 20) ||
                    Math.abs(this.touchDelta.x) > slideWidth / 2,
                // Determine if slide attempt is past start or end:
                isPastBounds = (!index && this.touchDelta.x > 0) ||
                        (index === this.num - 1 && this.touchDelta.x < 0),
                isValidClose = !isValidSlide && this.options.closeOnSwipeUpOrDown &&
                    ((isShortDuration && Math.abs(this.touchDelta.y) > 20) ||
                        Math.abs(this.touchDelta.y) > this.slideHeight / 2),
                direction,
                indexForward,
                indexBackward,
                distanceForward,
                distanceBackward;
            if (this.options.continuous) {
                isPastBounds = false;
            }
            // Determine direction of swipe (true: right, false: left):
            direction = this.touchDelta.x < 0 ? -1 : 1;
            if (!this.isScrolling) {
                if (isValidSlide && !isPastBounds) {
                    indexForward = index + direction;
                    indexBackward = index - direction;
                    distanceForward = slideWidth * direction;
                    distanceBackward = -slideWidth * direction;
                    if (this.options.continuous) {
                        this.move(this.circle(indexForward), distanceForward, 0);
                        this.move(this.circle(index - 2 * direction), distanceBackward, 0);
                    } else if (indexForward >= 0 &&
                            indexForward < this.num) {
                        this.move(indexForward, distanceForward, 0);
                    }
                    this.move(index, this.positions[index] + distanceForward, speed);
                    this.move(
                        this.circle(indexBackward),
                        this.positions[this.circle(indexBackward)] + distanceForward,
                        speed
                    );
                    index = this.circle(indexBackward);
                    this.onslide(index);
                } else {
                    // Move back into position
                    if (this.options.continuous) {
                        this.move(this.circle(index - 1), -slideWidth, speed);
                        this.move(index, 0, speed);
                        this.move(this.circle(index + 1), slideWidth, speed);
                    } else {
                        if (index) {
                            this.move(index - 1, -slideWidth, speed);
                        }
                        this.move(index, 0, speed);
                        if (index < this.num - 1) {
                            this.move(index + 1, slideWidth, speed);
                        }
                    }
                }
            } else {
                if (isValidClose) {
                    this.close();
                } else {
                    // Move back into position
                    this.translateY(index, 0, speed);
                }
            }
        },

        ontouchcancel: function (event) {
            if (this.touchStart) {
                this.ontouchend(event);
                delete this.touchStart;
            }
        },

        ontransitionend: function (event) {
            var slide = this.slides[this.index];
            if (!event || slide === event.target) {
                if (this.interval) {
                    this.play();
                }
                this.setTimeout(
                    this.options.onslideend,
                    [this.index, slide]
                );
            }
        },

        oncomplete: function (event) {
            var target = event.target || event.srcElement,
                parent = target && target.parentNode,
                index;
            if (!target || !parent) {
                return;
            }
            index = this.getNodeIndex(parent);
            $(parent).removeClass(this.options.slideLoadingClass);
            if (event.type === 'error') {
                $(parent).addClass(this.options.slideErrorClass);
                this.elements[index] = 3; // Fail
            } else {
                this.elements[index] = 2; // Done
            }
            // Fix for IE7's lack of support for percentage max-height:
            if (target.clientHeight > this.container[0].clientHeight) {
                target.style.maxHeight = this.container[0].clientHeight;
            }
            if (this.interval && this.slides[this.index] === parent) {
                this.play();
            }
            this.setTimeout(
                this.options.onslidecomplete,
                [index, parent]
            );
        },

        onload: function (event) {
            this.oncomplete(event);
        },

        onerror: function (event) {
            this.oncomplete(event);
        },

        onkeydown: function (event) {
            switch (event.which || event.keyCode) {
            case 13: // Return
                if (this.options.toggleControlsOnReturn) {
                    this.preventDefault(event);
                    this.toggleControls();
                }
                break;
            case 27: // Esc
                if (this.options.closeOnEscape) {
                    this.close();
                }
                break;
            case 32: // Space
                if (this.options.toggleSlideshowOnSpace) {
                    this.preventDefault(event);
                    this.toggleSlideshow();
                }
                break;
            case 37: // Left
                if (this.options.enableKeyboardNavigation) {
                    this.preventDefault(event);
                    this.prev();
                }
                break;
            case 39: // Right
                if (this.options.enableKeyboardNavigation) {
                    this.preventDefault(event);
                    this.next();
                }
                break;
            }
        },

        handleClick: function (event) {
            var options = this.options,
                target = event.target || event.srcElement,
                parent = target.parentNode,
                isTarget = function (className) {
                    return $(target).hasClass(className) ||
                        $(parent).hasClass(className);
                };
            if (isTarget(options.toggleClass)) {
                // Click on "toggle" control
                this.preventDefault(event);
                this.toggleControls();
            } else if (isTarget(options.prevClass)) {
                // Click on "prev" control
                this.preventDefault(event);
                this.prev();
            } else if (isTarget(options.nextClass)) {
                // Click on "next" control
                this.preventDefault(event);
                this.next();
            } else if (isTarget(options.closeClass)) {
                // Click on "close" control
                this.preventDefault(event);
                this.close();
            } else if (isTarget(options.playPauseClass)) {
                // Click on "play-pause" control
                this.preventDefault(event);
                this.toggleSlideshow();
            } else if (parent === this.slidesContainer[0]) {
                // Click on slide background
                this.preventDefault(event);
                if (options.closeOnSlideClick) {
                    this.close();
                } else {
                    this.toggleControls();
                }
            } else if (parent.parentNode &&
                    parent.parentNode === this.slidesContainer[0]) {
                // Click on displayed element
                this.preventDefault(event);
                this.toggleControls();
            }
        },

        onclick: function (event) {
            if (this.options.emulateTouchEvents &&
                    this.touchDelta && (Math.abs(this.touchDelta.x) > 20 ||
                        Math.abs(this.touchDelta.y) > 20)) {
                delete this.touchDelta;
                return;
            }
            return this.handleClick(event);
        },

        updateEdgeClasses: function (index) {
            if (!index) {
                this.container.addClass(this.options.leftEdgeClass);
            } else {
                this.container.removeClass(this.options.leftEdgeClass);
            }
            if (index === this.num - 1) {
                this.container.addClass(this.options.rightEdgeClass);
            } else {
                this.container.removeClass(this.options.rightEdgeClass);
            }
        },

        handleSlide: function (index) {
            if (!this.options.continuous) {
                this.updateEdgeClasses(index);
            }
            this.loadElements(index);
            if (this.options.unloadElements) {
                this.unloadElements(index);
            }
            this.setTitle(index);
        },

        onslide: function (index) {
            this.index = index;
            this.handleSlide(index);
            this.setTimeout(this.options.onslide, [index, this.slides[index]]);
        },

        setTitle: function (index) {
            var text = this.slides[index].firstChild.title,
                titleElement = this.titleElement;
            if (titleElement.length) {
                this.titleElement.empty();
                if (text) {
                    titleElement[0].appendChild(document.createTextNode(text));
                }
            }
        },

        setTimeout: function (func, args, wait) {
            var that = this;
            return func && window.setTimeout(function () {
                func.apply(that, args || []);
            }, wait || 0);
        },

        imageFactory: function (obj, callback) {
            var that = this,
                img = this.imagePrototype.cloneNode(false),
                url = obj,
                backgroundSize = this.options.stretchImages,
                called,
                element,
                callbackWrapper = function (event) {
                    if (!called) {
                        event = {
                            type: event.type,
                            target: element
                        };
                        if (!element.parentNode) {
                            // Fix for IE7 firing the load event for
                            // cached images before the element could
                            // be added to the DOM:
                            return that.setTimeout(callbackWrapper, [event]);
                        }
                        called = true;
                        $(img).off('load error', callbackWrapper);
                        if (backgroundSize) {
                            if (event.type === 'load') {
                                element.style.background = 'url("' + url +
                                    '") center no-repeat';
                                element.style.backgroundSize = backgroundSize;
                            }
                        }
                        callback(event);
                    }
                },
                title;
            if (typeof url !== 'string') {
                url = this.getItemProperty(obj, this.options.urlProperty);
                title = this.getItemProperty(obj, this.options.titleProperty);
            }
            if (backgroundSize === true) {
                backgroundSize = 'contain';
            }
            backgroundSize = this.support.backgroundSize &&
                this.support.backgroundSize[backgroundSize] && backgroundSize;
            if (backgroundSize) {
                element = this.elementPrototype.cloneNode(false);
            } else {
                element = img;
                img.draggable = false;
            }
            if (title) {
                element.title = title;
            }
            $(img).on('load error', callbackWrapper);
            img.src = url;
            return element;
        },

        createElement: function (obj, callback) {
            var type = obj && this.getItemProperty(obj, this.options.typeProperty),
                factory = (type && this[type.split('/')[0] + 'Factory']) ||
                    this.imageFactory,
                element = obj && factory.call(this, obj, callback);
            if (!element) {
                element = this.elementPrototype.cloneNode(false);
                this.setTimeout(callback, [{
                    type: 'error',
                    target: element
                }]);
            }
            $(element).addClass(this.options.slideContentClass);
            return element;
        },

        loadElement: function (index) {
            if (!this.elements[index]) {
                if (this.slides[index].firstChild) {
                    this.elements[index] = $(this.slides[index])
                        .hasClass(this.options.slideErrorClass) ? 3 : 2;
                } else {
                    this.elements[index] = 1; // Loading
                    $(this.slides[index]).addClass(this.options.slideLoadingClass);
                    this.slides[index].appendChild(this.createElement(
                        this.list[index],
                        this.proxyListener
                    ));
                }
            }
        },

        loadElements: function (index) {
            var limit = Math.min(this.num, this.options.preloadRange * 2 + 1),
                j = index,
                i;
            for (i = 0; i < limit; i += 1) {
                // First load the current slide element (0),
                // then the next one (+1),
                // then the previous one (-2),
                // then the next after next (+2), etc.:
                j += i * (i % 2 === 0 ? -1 : 1);
                // Connect the ends of the list to load slide elements for
                // continuous navigation:
                j = this.circle(j);
                this.loadElement(j);
            }
        },

        unloadElements: function (index) {
            var i,
                slide,
                diff;
            for (i in this.elements) {
                if (this.elements.hasOwnProperty(i)) {
                    diff = Math.abs(index - i);
                    if (diff > this.options.preloadRange &&
                            diff + this.options.preloadRange < this.num) {
                        slide = this.slides[i];
                        slide.removeChild(slide.firstChild);
                        delete this.elements[i];
                    }
                }
            }
        },

        addSlide: function (index) {
            var slide = this.slidePrototype.cloneNode(false);
            slide.setAttribute('data-index', index);
            this.slidesContainer[0].appendChild(slide);
            this.slides.push(slide);
        },

        positionSlide: function (index) {
            var slide = this.slides[index];
            slide.style.width = this.slideWidth + 'px';
            if (this.support.transition) {
                slide.style.left = (index * -this.slideWidth) + 'px';
                this.move(index, this.index > index ? -this.slideWidth :
                        (this.index < index ? this.slideWidth : 0), 0);
            }
        },

        initSlides: function (reload) {
            var clearSlides,
                i;
            if (!reload) {
                this.positions = [];
                this.positions.length = this.num;
                this.elements = {};
                this.imagePrototype = document.createElement('img');
                this.elementPrototype = document.createElement('div');
                this.slidePrototype = document.createElement('div');
                $(this.slidePrototype).addClass(this.options.slideClass);
                this.slides = this.slidesContainer[0].children;
                clearSlides = this.options.clearSlides ||
                    this.slides.length !== this.num;
            }
            this.slideWidth = this.container[0].offsetWidth;
            this.slideHeight = this.container[0].offsetHeight;
            this.slidesContainer[0].style.width =
                (this.num * this.slideWidth) + 'px';
            if (clearSlides) {
                this.resetSlides();
            }
            for (i = 0; i < this.num; i += 1) {
                if (clearSlides) {
                    this.addSlide(i);
                }
                this.positionSlide(i);
            }
            // Reposition the slides before and after the given index:
            if (this.options.continuous && this.support.transition) {
                this.move(this.circle(this.index - 1), -this.slideWidth, 0);
                this.move(this.circle(this.index + 1), this.slideWidth, 0);
            }
            if (!this.support.transition) {
                this.slidesContainer[0].style.left =
                    (this.index * -this.slideWidth) + 'px';
            }
        },

        toggleControls: function () {
            var controlsClass = this.options.controlsClass;
            if (this.container.hasClass(controlsClass)) {
                this.container.removeClass(controlsClass);
            } else {
                this.container.addClass(controlsClass);
            }
        },

        toggleSlideshow: function () {
            if (!this.interval) {
                this.play();
            } else {
                this.pause();
            }
        },

        getNodeIndex: function (element) {
            return parseInt(element.getAttribute('data-index'), 10);
        },

        getNestedProperty: function (obj, property) {
            property.replace(
                // Matches native JavaScript notation in a String,
                // e.g. '["doubleQuoteProp"].dotProp[2]'
                /\[(?:'([^']+)'|"([^"]+)"|(\d+))\]|(?:(?:^|\.)([^\.\[]+))/g,
                function (str, singleQuoteProp, doubleQuoteProp, arrayIndex, dotProp) {
                    var prop = dotProp || singleQuoteProp || doubleQuoteProp ||
                            (arrayIndex && parseInt(arrayIndex, 10));
                    if (str && obj) {
                        obj = obj[prop];
                    }
                }
            );
            return obj;
        },

        getDataProperty: function (obj, property) {
            if (obj.getAttribute) {
                var prop = obj.getAttribute('data-' +
                        property.replace(/([A-Z])/g, '-$1').toLowerCase());
                if (typeof prop === 'string') {
                    if (/^(true|false|null|-?\d+(\.\d+)?|\{[\s\S]*\}|\[[\s\S]*\])$/
                            .test(prop)) {
                        try {
                            return $.parseJSON(prop);
                        } catch (ignore) {}
                    }
                    return prop;
                }
            }
        },

        getItemProperty: function (obj, property) {
            var prop = obj[property];
            if (prop === undefined) {
                prop = this.getDataProperty(obj, property);
                if (prop === undefined) {
                    prop = this.getNestedProperty(obj, property);
                }
            }
            return prop;
        },

        initStartIndex: function () {
            var index = this.options.index,
                urlProperty = this.options.urlProperty,
                i;
            // Check if the index is given as a list object:
            if (index && typeof index !== 'number') {
                for (i = 0; i < this.num; i += 1) {
                    if (this.list[i] === index ||
                            this.getItemProperty(this.list[i], urlProperty) ===
                                this.getItemProperty(index, urlProperty)) {
                        index  = i;
                        break;
                    }
                }
            }
            // Make sure the index is in the list range:
            this.index = this.circle(parseInt(index, 10) || 0);
        },

        initEventListeners: function () {
            var that = this,
                slidesContainer = this.slidesContainer,
                proxyListener = function (event) {
                    var type = that.support.transition &&
                            that.support.transition.end === event.type ?
                                    'transitionend' : event.type;
                    that['on' + type](event);
                };
            $(window).on('resize', proxyListener);
            $(document.body).on('keydown', proxyListener);
            this.container.on('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .on('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                    this.support.transition) {
                slidesContainer
                    .on('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.on(
                    this.support.transition.end,
                    proxyListener
                );
            }
            this.proxyListener = proxyListener;
        },

        destroyEventListeners: function () {
            var slidesContainer = this.slidesContainer,
                proxyListener = this.proxyListener;
            $(window).off('resize', proxyListener);
            $(document.body).off('keydown', proxyListener);
            this.container.off('click', proxyListener);
            if (this.support.touch) {
                slidesContainer
                    .off('touchstart touchmove touchend touchcancel', proxyListener);
            } else if (this.options.emulateTouchEvents &&
                    this.support.transition) {
                slidesContainer
                    .off('mousedown mousemove mouseup mouseout', proxyListener);
            }
            if (this.support.transition) {
                slidesContainer.off(
                    this.support.transition.end,
                    proxyListener
                );
            }
        },

        handleOpen: function () {
            if (this.options.onopened) {
                this.options.onopened.call(this);
            }
        },

        initWidget: function () {
            var that = this,
                openHandler = function (event) {
                    if (event.target === that.container[0]) {
                        that.container.off(
                            that.support.transition.end,
                            openHandler
                        );
                        that.handleOpen();
                    }
                };
            this.container = $(this.options.container);
            if (!this.container.length) {
                this.console.log(
                    'blueimp Gallery: Widget container not found.',
                    this.options.container
                );
                return false;
            }
            this.slidesContainer = this.container.find(
                this.options.slidesContainer
            ).first();
            if (!this.slidesContainer.length) {
                this.console.log(
                    'blueimp Gallery: Slides container not found.',
                    this.options.slidesContainer
                );
                return false;
            }
            this.titleElement = this.container.find(
                this.options.titleElement
            ).first();
            if (this.num === 1) {
                this.container.addClass(this.options.singleClass);
            }
            if (this.options.onopen) {
                this.options.onopen.call(this);
            }
            if (this.support.transition && this.options.displayTransition) {
                this.container.on(
                    this.support.transition.end,
                    openHandler
                );
            } else {
                this.handleOpen();
            }
            if (this.options.hidePageScrollbars) {
                // Hide the page scrollbars:
                this.bodyOverflowStyle = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
            }
            this.container[0].style.display = 'block';
            this.initSlides();
            this.container.addClass(this.options.displayClass);
        },

        initOptions: function (options) {
            // Create a copy of the prototype options:
            this.options = $.extend({}, this.options);
            // Check if carousel mode is enabled:
            if ((options && options.carousel) ||
                    (this.options.carousel && (!options || options.carousel !== false))) {
                $.extend(this.options, this.carouselOptions);
            }
            // Override any given options:
            $.extend(this.options, options);
            if (this.num < 3) {
                // 1 or 2 slides cannot be displayed continuous,
                // remember the original option by setting to null instead of false:
                this.options.continuous = this.options.continuous ? null : false;
            }
            if (!this.support.transition) {
                this.options.emulateTouchEvents = false;
            }
            if (this.options.event) {
                this.preventDefault(this.options.event);
            }
        }

    });

    return Gallery;
}));

///#source 1 1 /source/pages/galeria/js/blueimp-gallery-indicator.js
/*
 * blueimp Gallery Indicator JS 1.1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // The tag name, Id, element or querySelector of the indicator container:
        indicatorContainer: 'ol',
        // The class for the active indicator:
        activeIndicatorClass: 'active',
        // The list object property (or data attribute) with the thumbnail URL,
        // used as alternative to a thumbnail child element:
        thumbnailProperty: 'thumbnail',
        // Defines if the gallery indicators should display a thumbnail:
        thumbnailIndicators: true
    });

    var initSlides = Gallery.prototype.initSlides,
        addSlide = Gallery.prototype.addSlide,
        resetSlides = Gallery.prototype.resetSlides,
        handleClick = Gallery.prototype.handleClick,
        handleSlide = Gallery.prototype.handleSlide,
        handleClose = Gallery.prototype.handleClose;

    $.extend(Gallery.prototype, {

        createIndicator: function (obj) {
            var indicator = this.indicatorPrototype.cloneNode(false),
                title = this.getItemProperty(obj, this.options.titleProperty),
                thumbnailProperty = this.options.thumbnailProperty,
                thumbnailUrl,
                thumbnail;
            if (this.options.thumbnailIndicators) {
                thumbnail = obj.getElementsByTagName && $(obj).find('img')[0];
                if (thumbnail) {
                    thumbnailUrl = thumbnail.src;
                } else if (thumbnailProperty) {
                    thumbnailUrl = this.getItemProperty(obj, thumbnailProperty);
                }
                if (thumbnailUrl) {
                    indicator.style.backgroundImage = 'url("' + thumbnailUrl + '")';
                }
            }
            if (title) {
                indicator.title = title;
            }
            return indicator;
        },

        addIndicator: function (index) {
            if (this.indicatorContainer.length) {
                var indicator = this.createIndicator(this.list[index]);
                indicator.setAttribute('data-index', index);
                this.indicatorContainer[0].appendChild(indicator);
                this.indicators.push(indicator);
            }
        },

        setActiveIndicator: function (index) {
            if (this.indicators) {
                if (this.activeIndicator) {
                    this.activeIndicator
                        .removeClass(this.options.activeIndicatorClass);
                }
                this.activeIndicator = $(this.indicators[index]);
                this.activeIndicator
                    .addClass(this.options.activeIndicatorClass);
            }
        },

        initSlides: function (reload) {
            if (!reload) {
                this.indicatorContainer = this.container.find(
                    this.options.indicatorContainer
                );
                if (this.indicatorContainer.length) {
                    this.indicatorPrototype = document.createElement('li');
                    this.indicators = this.indicatorContainer[0].children;
                }
            }
            initSlides.call(this, reload);
        },

        addSlide: function (index) {
            addSlide.call(this, index);
            this.addIndicator(index);
        },

        resetSlides: function () {
            resetSlides.call(this);
            this.indicatorContainer.empty();
            this.indicators = [];
        },

        handleClick: function (event) {
            var target = event.target || event.srcElement,
                parent = target.parentNode;
            if (parent === this.indicatorContainer[0]) {
                // Click on indicator element
                this.preventDefault(event);
                this.slide(this.getNodeIndex(target));
            } else if (parent.parentNode === this.indicatorContainer[0]) {
                // Click on indicator child element
                this.preventDefault(event);
                this.slide(this.getNodeIndex(parent));
            } else {
                return handleClick.call(this, event);
            }
        },

        handleSlide: function (index) {
            handleSlide.call(this, index);
            this.setActiveIndicator(index);
        },

        handleClose: function () {
            if (this.activeIndicator) {
                this.activeIndicator
                    .removeClass(this.options.activeIndicatorClass);
            }
            handleClose.call(this);
        }

    });

    return Gallery;
}));

