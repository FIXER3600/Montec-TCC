
function currentUser(){
    try{
        let u = firebase.auth().currentUser;
        return u.email;
    }catch(e){
        return e;
    }
    
}

function signup(){
    try {

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    document.getElementById('new-request').classList.add('open');
    if(email.length == 0) {
        alert ("Digite um email");
        return false;
    }
    
    if(senha.length == 0){
        alert ("Digite uma senha");
        return false;
    }
	firebase.auth().createUserWithEmailAndPassword(email, senha);
    setAccountData();
} catch (error) {
    console.log(error.message);
    alert(error);
}
}

function setAccountData(){
	let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    firebase.auth().signInWithEmailAndPassword(email, senha);
    let nome = document.getElementById("nome").value;
    let tele = document.getElementById("fone").value;
    let nasci = document.getElementById("data").value;
    let ende = document.getElementById("endereco").value;

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.sendEmailVerification().then(function() {
                // Email sent.
              }).catch(function(error) {
                // An error happened.
              });
            var db = firebase.firestore();
            db.collection("users").doc(user.email).set({
                nome: nome,
                email: email,
                tel : tele,
                nasc: nasci,
                end: ende
            })
        .then(function() {
            console.log("Document successfully written!");
            document.getElementById('new-request').classList.remove('open');
            document.getElementById('new-request2').classList.add('open');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        }); 
        } else {} });
    }
    

function login(){
    console.log("Login iniciado");
    try{

        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        document.getElementById('new-request').classList.add('open');

        if(email.length == 0) {
            alert ("Digite um email");
            document.getElementById('new-request').classList.remove('open');
            return false;
        }
        
        if(senha.length == 0){
            alert ("Digite uma senha");
            document.getElementById('new-request').classList.remove('open');
            return false;
        }
        
        firebase.auth().signInWithEmailAndPassword(email, senha).then(function(user){
            console.log("tentando logar");
            var user = firebase.auth().currentUser;
            var emailVerified = user.emailVerified;
            if(emailVerified){
                connect();
            } else {
                document.getElementById('new-request').classList.remove('open');
                document.getElementById('new-request2').classList.add('open');
            }
        }).catch(function(error) {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
                alert('Senha errada!');
                document.getElementById('new-request').classList.remove('open');
            } else {
                alert(errorMessage);
                document.getElementById('new-request').classList.remove('open');
            }           
        });
    }catch(e){
        console.log(e);
    }
}

function mudarSenha(){

    var email = document.getElementById('email').value;
    
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        alert('Pedido de alteracao de senha enviado!');
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/invalid-email') {
          alert("Email informado invalido");
        } else if (errorCode == 'auth/user-not-found') {
          alert("Email nao encontrado");
        }
      });
}

function logout(){
    try{
        firebase.auth().signOut();
        window.location.replace("login.html");
    }catch(e){
        alert(e);
    }
}

function connect(){
    window.location.replace("main.html");
    console.log("Logado!");
    
}

function mandarVerify(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        // Email sent.
        firebase.auth().signOut();
        document.getElementById('new-request2').classList.remove('open');
      }).catch(function(error) {
        // An error happened.
      });
}

function naoMandar(){
    document.getElementById('new-request2').classList.remove('open');
    firebase.auth().signOut();
}

function fecharVerify(){
    window.location.replace("login.html");
}