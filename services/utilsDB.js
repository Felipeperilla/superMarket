const admin = require('firebase-admin');
let serviceAccount = require('../evident-factor-259411-b98fa5a771fb.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const DB = {

    getCollection: async (collection) => {

        let db = admin.firestore();
        let data = []
    
        try {
            let snapshot = await db.collection(collection).get();
            snapshot.forEach((doc) => {
                data.push(doc.data());
            });        
        } catch (error) {
            console.log('Error getting documents', error);
        }
        return data
    },
    
    addDocument: async (collection, props) => {
    
        let db = admin.firestore();
    
        try {
            let obj = {}
            props.map(prop => obj[prop.propName] = prop.propValue)
            let docRef = await db.collection(collection).doc();
            let setAda = await docRef.set(obj);
        } catch (error) {
            console.log('Error getting documents', error);
        }
        return
    }

}

module.exports = DB;