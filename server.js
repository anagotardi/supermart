const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/supermart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String
    }
});
const ProdutomercadoSchema = new mongoose.Schema({
    id_produtomercado: {
        type: String,
        required: true
    },
    descricao: {
        type: String
    },
    marca: {
        type: String
    },
    dataValidade: {
        type: Date
    },
    quantidadeEstoque: {
        type: Number
    }
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Produtomercado = mongoose.model("Produtomercado", ProdutomercadoSchema)

//cadastramento usuario

app.post("/cadastrousuario", async (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const usuario = new Usuario({
        email: email,
        senha: senha
    });
    try {
        const newUsuario = await usuario.save();
        res.json({
            error: null,
            msg: "Cadastro ok",
            UsuarioId: newUsuario._id
        });
    } catch (error) {}
});

app.post("/cadastroprodutomercado", async (req, res) => {
    const id_produtomercado = req.body.id_produtomercado;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const dataValidade = req.body.dataValidade;
    const quantidadeEstoque = req.body.quantidadeEstoque;
    const Produtomercado = new Produtocmercado({
        id_produtomercado: id_produtomercado,
        descricao: descricao,
        marca: marca,
        dataValidade: dataValidade,
        quantidadeEstoque: quantidadeEstoque
    });
    try {
        const newProdutomercado = await produtomercado.save();
        res.json({
            error: null,
            msg: "Cadastro ok",
            ProdutomercadoId: newProdutomercado._id
        });
    } catch (error) {}
});