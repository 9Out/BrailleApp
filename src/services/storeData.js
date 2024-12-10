const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
 
  const imageCollection = db.collection('Images');
  return imageCollection.doc(id).set(data);
}
 
module.exports = storeData;