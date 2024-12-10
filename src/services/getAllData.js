const { Firestore } = require('@google-cloud/firestore');

async function getAllData() {
    const db = new Firestore();
    const imageCollection = db.collection('Images');
    
    const allData = await imageCollection.get();
    return allData;
}

module.exports = getAllData;