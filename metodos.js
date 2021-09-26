
//modulo para trabajr con rutas
const path = require('path');
//modulo para trabajar con directorios y archivos
const fs = require('fs');
//modulo para usar fetch en node.js
const fetch = require('node-fetch');

const ruta = process.argv[2];

//VERIFICAR SI EXITE RUTA
const routeExists = (route) => fs.existsSync(route);  
//console.log(routeExists(ruta));

//VERIFICAR SI LA RUTA ES ABSOLUTA
const pathAbsolute = (route) => path.isAbsolute(route);    
//console.log(verificRoute(ruta));

//CONVERTIR RUTA RELATIVA A ABSOLUTA
const convetirRuta = (route) => path.resolve(route);
//console.log(convetirRuta(ruta));
 
//union de las funciones routeExists + pathAbsolute + convetirRuta
//valida si la ruta exite, si es absoluta sino converirla
const validateRoute = (route) => {
  const routeString = route.toString();
  //const routeExists =  fs.existsSync(routeString); 
  if(routeExists){
    if(pathAbsolute(routeString)){
      return routeString;
    }else{
      return convetirRuta(routeString);
    }
  } 
  return '';
};
//console.log(converRoute(ruta));

//VERIFICAR SI ES DIRECTORIO
//const verificIsDirectory = (route) => fs.statSync(route).isDirectory();
//console.log(verificDirectory(ruta));

//LEER SI ES DIRECTORIO
const arrayDirectory = (route) => fs.readdirSync(route);
//console.log(arrayDirectory(ruta));

//VERIFICANDO SI ES UN ARCHIVO
const verisFile = (route) => fs.statSync(route).isFile();
//console.log(verisFile(ruta));

//VERIFICAR SI EL ARCHIVO ES EXTENSION .MD
const iSMD = (route) => (path.extname(route) === '.md');
//console.log(iSMD(ruta));
/*{
    const typeFile = path.extname(route);
    return typeFile === extension;
}console.log(extenTypeFile(ruta,'.md'));
*/
/*************************************************************************** */
//funcion para obtener todo los archivos .md desdeun archivo o direcctorio
//retornando un array de rutas
const getAllFile = (route) => {
  let arrFile = [];
  if(verisFile(route) && iSMD(route)){
    arrFile.push(route);
  }else {
    arrayDirectory(route).forEach((file) => {
      //path.join une segmentos de la ruta para formar una sola
      const newRoute = path.join(route, file);
      const recursive = getAllFile(newRoute);
      arrFile = arrFile.concat(recursive);
      //console.log(newRoute);
    });
  }
    return arrFile;
}
//console.log(getAllFile(ruta));

const searchLinks = (route) => {
  const dataMD = fs.readFileSync(route).toString();
  const linkRegExp = /\[((.+?))\]\((http|https).+?\)/g; //Expresion Regular para enlaces
  const onlyLinkRegExp = /\((http|https).+?\)/g; //Expresion Regular para Url
  const textLinkRegExp = /\[.+?\]/g; //Expresion Regular para texto
  const links = dataMD.match(linkRegExp);
  const arrLink = [];
  links.forEach((link) => {    
    const linkObject = {
      // match() => para obtener todas las ocurrencias de una expresión regular dentro de una cadena.
      // join() => para unir varios segementos de la ruta y formar una sola ruta.
      href: link.match(onlyLinkRegExp).join().replace(/[{()}]/g, ''),
      text: link.match(textLinkRegExp).join().replace(/[\[\]']+/g, ''),
      file: route,      
    };
    arrLink.push(linkObject);
  });
  return arrLink.filter((element) => element !== undefined);
};
//console.log(searchLinks(ruta));

const getStatusLinks = (arrayLinks) => {
  const arr = arrayLinks.map((link) => 
    //const newLinks = link.href;
    fetch(link.href)
    .then((res) => ({
      status: res.status,
      statusText: res.statusText === 'OK' ? 'OK' : 'Fail',
      ...link,
    }))
    .catch((res) => ({
      status: res.status ? res.status : 'Not defined',
      statusText: 'Fail',
      ...link,
    }))
  );

  return Promise.all(arr);
}

  const arrObj = [
  {
    href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
    text: 'recurso',
    file: 'README.md'
  },
  {
    href: 'https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e',
    text: 'Linea de comando CLI',
    file: 'README.md'
  },
  {
    href: 'https://nodejs.org/api/path.html',
    text: 'Path',
    file: 'README.md'
  },
  {
    href: 'https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback',
    text: 'Leer un directorio',
    file: 'README.md'
  }
]  
//getStatusLinks(arrObj).then((res)=>console.log(res,'VALIDATE STATUS')); 
 
/* const validateLinks = (url) => {
  const arrayLinks = getAllFile(url);
  const result = getStatusLinks(arrayLinks);

  return result;
}; */

module.exports = {
   routeExists,
   pathAbsolute,
   convetirRuta,
    validateRoute,
    arrayDirectory,
    verisFile,
    iSMD,
    getAllFile,
    searchLinks, 
    getStatusLinks,
  }



