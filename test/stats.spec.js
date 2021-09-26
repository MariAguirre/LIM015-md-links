const {totalLinks,
    uniqueLinks,
    brokenLinks,} = require('../stats.js');

describe('totalLinks', () => {
        it('Es una función', () => {
               expect(typeof totalLinks).toBe('function');
        }); 
        
});

describe('uniqueLinks', () => {
    it('Es una función', () => {
           expect(typeof uniqueLinks).toBe('function');
    }); 
    
});

describe('brokenLinks', () => {
    it('Es una función', () => {
           expect(typeof brokenLinks).toBe('function');
    }); 
    
});