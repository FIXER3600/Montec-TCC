firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(user.email);
    docRef.get().then(function(doc) {
        const list_div = document.querySelector("#list_div");
        list_div.innerHTML += "<div class='list-item'><h3>"+ doc.data().nome +"</h3><p>Email:<br>"+ doc.data().email +"</p><br><p>Endereço:<br>"+ doc.data().end +"</p><br><p>Nascimento:<br>"+ doc.data().nasc +"</p><br><p>Telefone:<br>"+ doc.data().tel +"</div>"
}).catch(function(error) {
    console.log("Error getting document:", error);
});
} else {} });
