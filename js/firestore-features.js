console.log("[firestore-features.js] --> firestore-features.js loaded sucessfully!!!");

class FirestoreFeatures {

    constructor(firebaseObject, enablePersistence) {
        console.log("[firestore-features.js] --> class FirestoreFeatures{... constructor(firebaseObject){");

        this._firebase = firebaseObject;
        this._db = this._firebase.firestore();
        this._db.settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });

        if (enablePersistence === false) this._db.enablePersistence()
            .catch(function (err) {
                if (err.code == 'failed-precondition') {
                    alert(err.code)
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } else if (err.code == 'unimplemented') {
                    alert(err.code);
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
            });

        this._db.collection("chamados").doc(u.email).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    criaColecao(nomeDaColecao, conta) {
        let u = firebase.auth().currentUser;
        this._db.collection(nomeDaColecao).doc(u.uid).add(conta)
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            })
    }


}
