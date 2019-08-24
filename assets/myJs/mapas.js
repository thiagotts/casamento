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