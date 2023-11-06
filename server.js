const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = require('express').Router();
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/supermart", {
    serverSelectionTimeoutMS: 20000
});


//criação de models

//model padrão:
const usuario = new mongoose.Schema({
    email: {type: String, required: true},
    senha: {type: String, required: true}
})

const user = mongoose.model('User',usuario);    

//model específica
const produtoMercado = new mongoose.Schema({
    id_produtomercado: {type: Number, required: true},
    descricao: {type: String, required: true},
    marca: {type: String, required: true},
    dataValidade: {type: String, required: true},
    quantidadeEstoque: {type: String, required: true},
})

const produto = mongoose.model('produtoMercado',produtoMercado); 

//criação de rotas 

//rota de teste

//criação de rota get
app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html")
});

//criação da rota de cadastro
app.post("/cadastrousuario", async (req, res)=>{
    const email = req.body.email;
    const senha = req.body.password;

    if(email = null || senha == null){
        return res.status(400).json({error: "Digite os campos!!!"});
    }

    const usuario = new usuario({

        email: email,
        senha: senha
    })

    try{
        const newusuario = await usuario.save();
        res.json({error: null, msg: "Cadastro ok!!!", usuarioId: newUser.id}) 
    }
    catch(error){
        res.status(400).json({error});
    }
});

//criação da rota de cadastro do produto
app.post("/cadastroprodutomercado", async (req, res)=>{
    const id_produtomercado = req.body.id_produtomercado;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataValidade = req.res.dataValidade;
    const quantidadeEstoque = req.res.quantidadeEstoque

    const produtomercado = new produtomercado({

        id_produtomercado: id_produtomercado,
        descricao: descricao,
        marca: marca,
        dataValidade: dataValidade,
        quantidadeEstoque: quantidadeEstoque
    })

    try{
        const newprodutomercado = await produtomercado.save();
        res.json({error: null, msg: "Cadastro de produto ok!!!", produtomercadoId: newprodutomercado.id}) 
    }
    catch(error){
        res.status(400).json({error});
    }
});

//faz a leitura de portas
app.listen(3000, ()=>{
    console.log("Rodando na porta 3000")
})