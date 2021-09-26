#!/usr/bin/env node

const { mdLinks } = require('./index.js');

const { totalLinks,
    uniqueLinks,
    brokenLinks } = require('./stats.js');


//para que tome a partir del tercer argumento como cero
//const [,, ...args] = process.argv;
//console.log(`Hello world ${args}`);

const ruta = process.argv[2];
const option = process.argv.slice(2);

const validate = option.includes('--validate');
const stats = option.includes('--stats');

if (option.length === 1) {
    mdLinks(ruta, { validate: false })
        .then(data => console.log(data))
} else {
    if (stats && validate) {
        mdLinks(ruta, { validate: true })
            .then(data => {
                console.log(totalLinks(data));
                console.log(uniqueLinks(data));
                console.log(brokenLinks(data));
            });
    } else if (stats) {
        mdLinks(ruta, { validate: true })
            .then(data => {
                console.log(totalLinks(data));
                console.log(uniqueLinks(data));
            });
    } else if (validate) {
        mdLinks(ruta, { validate: true })
            .then(data => console.log(data));
    }
}

/* const linkValidate = (link) => {
    if(validate){
        mdLinks(link, { validate: true })
        .then(data => console.log(data));
    }
}
linkValidate(ruta); */

/* const linkStats = (link) => {
    if(stats){
        mdLinks(link, { validate: true })
        .then((link) =>{
            console.log(totalLinks(link));
            console.log(uniqueLinks(link));   } );
    }
} */
//linkStats(ruta);

/*  const linkValidateStats = (link) => {
    if(process.argv[3] === '--stats' && process.argv[4]=== '--validate'){
        mdLinks(link, { validate: true })
        .then((link) =>{
            console.log(totalLinks(link));
            console.log(uniqueLinks(link));
            console.log(brokenLinks(link))
        });
    }
}
linkValidateStats(ruta); */