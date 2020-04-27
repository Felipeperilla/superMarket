// const admin = require('firebase-admin');
// let serviceAccount = require('../evident-factor-259411-b98fa5a771fb.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// const getSuperMarkets = async (req,res,next) => {

//     let db = admin.firestore();
//     let superMarkets = []
//     let collection = req.body.type

//     try {
//         let snapshot = await db.collection('superMarkets').get();
//         snapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//             superMarkets.push(doc.data());
//         });        
//     } catch (error) {
//         console.log('Error getting documents', error);
//     }
  
//     res.render('index', { title: 'Gestión de productos para Tu Super Mercado', secondTitle: 'Manage your Products', superMarkets: superMarkets });
// }

// module.exports = getSuperMarkets;
