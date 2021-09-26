const mdLinks = require('../index.js');


const ruta = 'D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\prueba\\ejemplo1\\prueba.md';
const arrmdLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\prueba\\ejemplo1\\prueba.md'
  }
]

const arrStats = [
  {
    status: 200,
    statusText: 'OK',
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'D:\\MARIBEL\\Documents\\GitHub\\LIM015-md-links\\prueba\\ejemplo1\\prueba.md'
  }
]


describe('mdLinks(paths, options', () => {

  it('Es un funcion', () => {
    expect(typeof mdLinks.mdLinks).toBe('function');
  });

  it('Debe devolver un array de objetos con su estado', () => {
    mdLinks.mdLinks(ruta, {validate: true})
      .then((res) => {
             expect(res).toEqual(arrStats)
      })
  });

  it('Debe devolver un array de objetos ', () => {
    mdLinks.mdLinks(ruta, {validate: false})
      .then((res) => {
             expect(res).toEqual(arrmdLinks)
      })
  });

});
