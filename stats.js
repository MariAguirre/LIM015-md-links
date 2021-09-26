const chalk = require('chalk');

const ruta= process.argv[2];

const totalLinks = (links) => (chalk.bold.cyanBright(`✔ Total : ${links.length}`));

//console.log(totalLinks(ruta));
  
const uniqueLinks = (links) => {
  const unique = new Set(links.map((link) => link.href));
  return (chalk.bold.greenBright(`✔ Unique : ${unique.size}`));
}
//console.log(uniqueLinks(ejemArrObj));

const brokenLinks = (links) => {
  const broken = links.filter((link) => link.status >= 400).length;
  return (chalk.bold.redBright(`x Broken : ${broken}`));
}
//console.log(brokenLinks(ejemArrObj));

  

const ejemArrObj = [
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
  ]; 
  //uniqueLinks(saveArrObj).then((res)=>console.log(res,'VALIDATE STATUS')); */

  module.exports = {
    totalLinks,
    uniqueLinks,
    brokenLinks,
   
  };