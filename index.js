const {
  validateRoute,
  searchLinks,
  getAllFile,
  getStatusLinks,
} = require('./metodos.js');



const ruta = process.argv[2];


const mdLinks = (paths, options) =>
  new Promise((resolve, reject) => {
    //const validRuta = validateRoute(path);
    //console.log({validRuta});
    if (validateRoute(paths)) {
      //console.log('ok'); 
      if (getAllFile(paths).length > 0) {
        //console.log('ok'); 
        if (options == undefined || options.validate === true) {
          const getAllLinks = getStatusLinks(searchLinks(paths))
          return resolve(getAllLinks);
        } else {
          return resolve(searchLinks(paths));
        }
      }
    } else {
      const msj = 'does not exist';
      return reject(msj);
    };
  });

//console.log(mdLinks(ruta));
//mdLinks(ruta).then(res => console.log(res));



module.exports = { mdLinks };
