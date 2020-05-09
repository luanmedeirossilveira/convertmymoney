const api = require('./api.bcb')
const axios = require('axios')

jest.mock('axios')

test('getCotacaoAPI', () => {
    const res = {
        data: {
            USD: 3.90
        }
    }    
});
