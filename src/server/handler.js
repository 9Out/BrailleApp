const crypto = require('crypto');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');

async function postImageHandler(request, h) {
  try {
    const { Name, imageUrl } = request.payload; // Pastikan payload berisi 'Name' dan 'imageUrl'
    const id = crypto.randomUUID();

    const data = {
      id,
      Name,
      imageUrl,
    };

    await storeData(id, data);

    const response = h.response({
      status: 'success',
      message: 'Data has been stored successfully',
      data,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error('Error in postImageHandler:', error);
    const response = h.response({
      status: 'fail',
      message: 'Failed to store data',
    });
    response.code(500);
    return response;
  }
}

async function postImageHistoriesHandler(request, h) {
  try {
    const allData = await getAllData();

    const formatAllData = allData.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        Name: data.Name,
        imageLogo: data.imageUrl,
      };
    });

    const response = h.response({
      status: 'success',
      data: formatAllData,
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error in postImageHistoriesHandler:', error);
    const response = h.response({
      status: 'fail',
      message: 'Failed to retrieve data',
    });
    response.code(500);
    return response;
  }
}

module.exports = { postImageHandler, postImageHistoriesHandler };
