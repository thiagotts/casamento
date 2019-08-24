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
