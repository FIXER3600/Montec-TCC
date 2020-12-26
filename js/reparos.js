firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var db = firebase.firestore();
        const ChaList = document.querySelector("#cha-list");

        function renderCh(doc){
            let li = document.createElement('li');
            let modelo = document.createElement('span');
            let categoria = document.createElement('span');
            let data = document.createElement('span');
            let info = document.createElement('div');

            li.setAttribute('data-id', doc.id);
            modelo.textContent = doc.data().modelo;
            categoria.textContent = doc.data().categ;
            data.textContent = doc.data().data;
            info.textContent = 'Status';

            li.appendChild(modelo);
            li.appendChild(categoria);
            li.appendChild(data);
            li.appendChild(info);

            ChaList.appendChild(li);
            var conCheck = doc.data().concluido;
            if(conCheck == "Não"){
                info.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const requestModal = document.querySelector('.new-request');
                        requestModal.classList.add('open');
                        const head = document.querySelector(".modal2");
                        head.innerHTML = "<div class='infosdiv col'><h3>Status</h3><br><h4>Iniciado</h4><div id='Progresso'><div id='Barra'></div></div><br><h4>Reparando no momento:</h4><p>"+ doc.data().remo +"</p><br><h4>Prazo estimado:</h4><p>"+ doc.data().prazo +"</p><br><h4>Concluido:</h4><p>"+ doc.data().concluido +"</p><br><h4>Informações</h4><p>Data: "+ doc.data().data +"</p><p>Hora: "+ doc.data().hora +"</p><p>Categ: "+ doc.data().categ +"</p><p>Marca: "+ doc.data().marca +"</p><p>Modelo: "+ doc.data().modelo +"</p><p>Problema: "+ doc.data().relato +"</p></div>";
                        var inic = doc.data().iniciado;
                        if(inic == "sim") {
                            document.getElementById('Barra').style.width = "100%";
                        }
                        // fechar
                        requestModal.addEventListener('click', (e) => {
                        if (e.target.classList.contains('new-request')) {
                        requestModal.classList.remove('open');
                        }
                        });
                });
            } else {
                modelo.style.color = "#389aff";
                info.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const requestModal = document.querySelector('.new-request');
                        requestModal.classList.add('open');
                        const head = document.querySelector(".modal2");
                        head.innerHTML = "<div class='infosdiv col'><h3>Status</h3><br><h4>Concluido</h4><div id='Progresso'><div id='Barra'></div></div><br><br><h4>Informações</h4><p>Data: "+ doc.data().data +"</p><p>Hora: "+ doc.data().hora +"</p><p>Categ: "+ doc.data().categ +"</p><p>Marca: "+ doc.data().marca +"</p><p>Modelo: "+ doc.data().modelo +"</p><p>Problema: "+ doc.data().relato +"</p></div>";
                        document.getElementById('Barra').style.width = "100%";
                        document.getElementById('Barra').style.backgroundColor = "#389aff";
                        // fechar
                        requestModal.addEventListener('click', (e) => {
                        if (e.target.classList.contains('new-request')) {
                        requestModal.classList.remove('open');
                        }
                        });
                });
            }

        }

        db.collection("users/"+user.email+"/reparos").get().then((snapshot) => {
                if (snapshot.empty){
                console.log("Nenhum reparo");
                const ChaList = document.querySelector("#cha-list");
                ChaList.innerHTML = "<p>Você não possui nenhum reparo cadastrado.</p>"
                } else { 
            snapshot.docs.forEach(doc => {
                renderCh(doc); 
                })};
    });
    } else {} }); 
