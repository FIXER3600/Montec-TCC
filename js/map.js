document.addEventListener("deviceready", function() {
  var div = document.getElementById("map_canvas");
  plugin.google.maps.environment.setEnv({
  'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyCztnKh8ieT4MRYEpbTYFTBhLz8fOYB0Ag',
  'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyCztnKh8ieT4MRYEpbTYFTBhLz8fOYB0Ag'
  });


  // Create a Google Maps native view under the map_canvas div.
  var map = plugin.google.maps.Map.getMap(div, {
    controls: {
      compass: false,
      myLocationButton: true,
      myLocation: true,
      zoom: false
    },
    camera: {
      target: {lat: -23.528861, lng: -46.5379331},
      zoom: 12
    }
  });

  // Botão de voltar
  var voltar = document.getElementById("btnvoltar");
  voltar.addEventListener("click", function() {
   window.location.replace("main.html");
  });
  // Botão de filtro
  var filtro = document.getElementById("btnfiltro");
  filtro.addEventListener("click", function(){
    const requestModal = document.querySelector('.new-request');
    requestModal.classList.add('open');
    const head = document.querySelector(".modal2");
    head.innerHTML = "<h4>Tipo de assist&ecircncia</h4><select id='categoria' name='categoria'><option value='videogame'>VideoGames</option><option value='relogio'>Relógio</option><option value='computador'>Computador</option><option value='tv'>TV</option><option value='celular'>Celular</option></select><br><br><button id='pesq' class='btn'>Filtrar</button><br><br><button id='limpar' class='btn'>Limpar filtros</button>";
    document.getElementById('pesq').addEventListener('click', (e) => {
      map.clear();
      db.collection("assistencias").where('categoria', '==', document.getElementById('categoria').value).get().then(function(querySnapshot){querySnapshot.forEach(function(doc) {
        var categoria = doc.data().categoria;
        if(categoria == "celular"){var icone = "imgs/cel.png";var categInfo = "Smartphone";
        } if(categoria == "tv") {var icone = "imgs/tv.png";var categInfo = "TVs";
        } if(categoria == "videogame") {var icone = "imgs/videogame.png";var categInfo = "VideoGames";
        } if(categoria == "computador") {var icone = "imgs/pc.png";var categInfo = "Computadores";
        } if(categoria == "relogio") {var icone = "imgs/relogio.png";var categInfo = "Relógios";
        }
      const pos = {"lat": doc.data().latitude, "lng": doc.data().longitude};
      var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();
      var html = [
        '<link rel="stylesheet" href="css/map.css"><div id="mapaHTML"><h1>'+doc.id+'</h1><p>Categoria: '+categInfo+'<br><br>Horário: '+ doc.data().horario +'<br><br>Telefone: '+ doc.data().tel +'<br><br>Endereço: '+ doc.data().end +'</p><br></div>',
    
      ].join("");
      htmlInfoWindow.setBackgroundColor("#6c63ff");
      htmlInfoWindow.setContent(html);
      var marker = map.addMarker({'position': pos, 'icon' : {'url' : icone, 'size' : {width: 64, height: 64} }});marker.on(plugin.google.maps.event.MARKER_CLICK, function() {htmlInfoWindow.open(marker);});  ;})});
      requestModal.classList.remove('open');
    });

    document.getElementById('limpar').addEventListener('click', (e) => {
      map.clear();
      db.collection("assistencias").get().then(function(querySnapshot){querySnapshot.forEach(function(doc) {
        var categoria = doc.data().categoria;
        if(categoria == "celular"){var icone = "imgs/cel.png";var categInfo = "Smartphone";
        } if(categoria == "tv") {var icone = "imgs/tv.png";var categInfo = "TVs";
        } if(categoria == "videogame") {var icone = "imgs/videogame.png";var categInfo = "VideoGames";
        } if(categoria == "computador") {var icone = "imgs/pc.png";var categInfo = "Computadores";
        } if(categoria == "relogio") {var icone = "imgs/relogio.png";var categInfo = "Relógios";
        }
        const pos = {"lat": doc.data().latitude, "lng": doc.data().longitude};
        var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();
        var html = [
          '<link rel="stylesheet" href="css/map.css"><div id="mapaHTML"><h1>'+doc.id+'</h1><p>Categoria: '+categInfo+'<br><br>Horário: '+ doc.data().horario +'<br><br>Telefone: '+ doc.data().tel +'<br><br>Endereço: '+ doc.data().end +'</p><br></div>',
      
        ].join("");
        htmlInfoWindow.setBackgroundColor("#6c63ff");
        htmlInfoWindow.setContent(html);
        var marker = map.addMarker({'position': pos, 'icon' : {'url' : icone, 'size' : {width: 64, height: 64} }});marker.on(plugin.google.maps.event.MARKER_CLICK, function() {htmlInfoWindow.open(marker);});  ;})});
        requestModal.classList.remove('open');
    });
    // fechar lista
    requestModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('new-request')) {
      requestModal.classList.remove('open');
      }
      });
  })
    var db = firebase.firestore();
    var docRef = db.collection("assistencias");
    docRef.get().then(function(querySnapshot){
    //Pega cada assistencia e carrega ela
    querySnapshot.forEach(function(doc) {
      const pos = {"lat": doc.data().latitude, "lng": doc.data().longitude};
      if(doc.data().categoria == "celular"){
        var icone = "imgs/cel.png";
        var categInfo = "Smartphone";
      } if(doc.data().categoria == "tv") {
        var icone = "imgs/tv.png"
        var categInfo = "TVs";
      } if(doc.data().categoria == "videogame") {
        var icone = "imgs/videogame.png"
        var categInfo = "VideoGames";
      } if(doc.data().categoria == "computador") {
        var icone = "imgs/pc.png"
        var categInfo = "Computadores";
      } if(doc.data().categoria == "relogio") {
        var icone = "imgs/relogio.png"
        var categInfo = "Relógios";
      }
      ;
      var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();
      var html = [
        '<link rel="stylesheet" href="css/map.css"><div id="mapaHTML"><h1>'+doc.id+'</h1><p>Categoria: '+categInfo+'<br><br>Horário: '+ doc.data().horario +'<br><br>Telefone: '+ doc.data().tel +'<br><br>Endereço: '+ doc.data().end +'</p><br></div>',
    
      ].join("");
      htmlInfoWindow.setBackgroundColor("#6c63ff");
      htmlInfoWindow.setContent(html);
      var marker = map.addMarker({
        'position': pos,
        'icon': {
          'url': icone,
          'size': {
            width: 64,
            height: 64
          }
         }
      });
      marker.on(plugin.google.maps.event.MARKER_CLICK, function() {
        htmlInfoWindow.open(marker);
      });
  })});

}, false);