const axios = require('axios')
const getUrl = `https://economia.awesomeapi.com.br/all/USD-BRL,EUR-BRL,BTC-BRL`

const getCotacaoAPI = () => axios.get(getUrl)
const extractCotacao = res => res.data.USD.high
const getCotacao = async() => {
    try{
        const res = await getCotacaoAPI()
        const cotacao = extractCotacao(res)
        return cotacao
    }catch(err){
        return ''
    }
    
}

console.log(getCotacao())

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao
}
