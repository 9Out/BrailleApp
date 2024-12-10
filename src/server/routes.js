const { postImageHandler, postImageHistoriesHandler } = require('./handlers');
 
const routes = [
  {
    path: '/image',
    method: 'POST',
    handler: postImageHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      }
    }
  },
  {
    path: '/image/histories',
    method: 'GET',
    handler: postImageHistoriesHandler,
  }
]
 
module.exports = routes;
