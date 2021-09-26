const {pathAbsolute,
       routeExists,
       convetirRuta,
       validateRoute,
       arrayDirectory,
       verisFile,
       iSMD,
       getAllFile,
       searchLinks, 
       getStatusLinks,
       } = require('../metodos.js'); 

//const dirRelative = 'LIM015-md-links';

 describe('routeExists', () => {
       it('Es una función', () => {
              expect(typeof routeExists).toBe('function');
       });

       it('La ruta NO existe, deberia retornar false', () => {
              expect(routeExists("X:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md")).toBe(false);
       });
       it('La ruta SI existe, deberia retornar true', () => {
              expect(routeExists("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md")).toBe(true);
       });
});

describe('pathAbsolute', () => {
       it('Es una función', () => {
              expect(typeof pathAbsolute).toBe('function');
       });

       it('La ruta ES ABSOLUTA, deberia retornar true', () => {
              expect(routeExists("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md")).toBe(true);
       });
});
describe('convetirRuta', () => {
       it('Es una función', () => {
              expect(typeof convetirRuta).toBe('function');
       });

       it('La ruta relativa es README.md , deberia retornar D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md', () => {
              expect(convetirRuta("README.md")).toBe("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md");
       });
});

describe('validateRoute', () => {
       it('Es una función', () => {
              expect(typeof validateRoute).toBe('function');
       });

       it('Valida si la ruta existe y si es relativa, lo convierte en Absoluta', () => {
              expect(convetirRuta("README.md")).toBe("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md");
       });
});

describe('arrayDirectory', () => {

       const arrayDir = [
              '.editorconfig',     '.eslintrc',
              '.git',              '.gitignore',
              'API',               'cli.js',
              'coverage',          'index.js',
              'metodos.js',        'node_modules',
              'package-lock.json', 'package.json',
              'pb-mdlinks.js',     'prueba',
              'README.md',         'stats.js',
              'test'
            ];

       it('Es una función', () => {
              expect(typeof arrayDirectory).toBe('function');
       });

       it('La ruta es un directorio, deberia retornar el contenido del primer directorio que encontro', () => {
              expect(arrayDirectory("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links")).toEqual(arrayDir);
       });
});

describe('verisFile', () => {
       it('Es una función', () => {
              expect(typeof verisFile).toBe('function');
       });

       it('Es un ARCHIVO, deberia retornar true', () => {
              expect(verisFile(".//README.md")).toBe(true);
       });   
});

describe('iSMD', () => {
       it('Es una función', () => {
              expect(typeof iSMD).toBe('function');
       });

       it('Si es un archivo .MD, deberia retornar true', () => {
              expect(iSMD("D:\MARIBEL\Documents\GitHub\LIM015-md-links\README.md")).toBe(true);
       });
});
describe('getAllFile', () => {
       it('Es una función', () => {
              expect(typeof getAllFile).toBe('function');
       });

       it('Si es un Directorio debería retornar un array con los archivos .md de ese directorio', () => {
              expect(getAllFile("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md")).toEqual([ 'D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\README.md' ]);
       });
});

describe('searchLinks', () => {

       const arraySearch = [
                            {
                                   href: 'https://es.wikipedia.org/wiki/Markdown',
                                   text: 'Markdown',
                                   file: 'D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\prueba\\ejemplo1\\prueba.md'
                            }
                           ]

       it('Es una función', () => {
              expect(typeof searchLinks).toBe('function');
       });

       it('Al recorrer el rchivo MD debera retornar un Array de objetos de los links', () => {
              expect(searchLinks("D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\prueba\\ejemplo1\\prueba.md")).toEqual(arraySearch);
       });
});


const arrObj = [
       {
         href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
         text: 'recurso',
         file: 'README.md'
       }       
     ] 

const arrVal = [
       {
         status: 200,
         statusText: 'OK',
         href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
         text: 'recurso',
         file: 'README.md'
       }       
     ]
describe('getStatusLinks', () => {

       it('Es una función', () => {
              expect(typeof getStatusLinks).toBe('function');
       });

       it('Retorna los estados del link', () => {
              getStatusLinks([arrObj])
              .then((res) => {
                     expect(res).toEqual(...arrVal)
              })
       });
       it('Retorna los estados 400 del link', () => {
              getStatusLinks([arrObj])
              .catch((reject) => {
                     expect(reject).toEqual(...arrVal)
              })
       });
});









/* const sum = require('../pb-mdlinks.js');

test('adds 1 + 2 to equal 3', () => {
       expect(sum(1,2)).toBe(3);
}); */