const express = require('express')
const app = express()
const path = require('path') // tratamento do caminho
var porta = process.env.PORT || 3000
const convert = require('./lib/convert')
const apiBCB = require('./lib/api.bcb')
//utilizar o ejs
app.set('view engine', 'ejs')
//para utilizar no now
app.set('views', path.join(__dirname, 'views'))

//lugar para colocar nossos arquivos
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async(req, res)=>{
    const cotacao = await apiBCB.getCotacao(res)
    console.log('cotacao', cotacao)
    res.render('home', {
        cotacao
    })
})

app.get('/cotacao', (req, res)=>{
    //extrai o valor
    const {cotacao, quantidade } = req.query 
    if(cotacao && quantidade){
        const conversao = convert.convert(cotacao, quantidade)
        res.render('cotacao', {
            error: false,
            cotacao: convert.toMoney(cotacao),
            quantidade: convert.toMoney(quantidade),
            conversao: convert.toMoney(conversao)
        })
    }else{
        res.render('cotacao', {
            error: 'valores inválidos'
        })
    }
})

app.listen(porta, err=>{
    if(err){
        console.log('nao foi possivel iniciar')
    }else{
        console.log('ConvertMyMoney is online em http://localhost:3000/')
    }
})