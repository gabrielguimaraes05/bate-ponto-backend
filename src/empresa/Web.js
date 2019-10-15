/**
 * Nesse arquivo é feita a interface com a internet. 
 * Aqui são recebidas as requisições HTTP e onde são 
 * manipuladas as entradas e saídas das rotas.
 * 
 */
const router = require("express").Router();
const { checaCadastro } = require("./Validacoes");
const { criarEmpresa, criarUsuario, criarAdmin } = require("./Regras");

router.post("/", checaCadastro, async (req, res) => {
	const { cnpj, razao_social } = req.body;
	const { cpf, nome, email, senha, celular } = req.body;
	const empresa = await criarEmpresa(cnpj, razao_social);
	const usuario = await criarUsuario(empresa.codigo, cpf
		, nome, email, senha, celular);
	const admin = await criarAdmin(usuario.codigo);
	return res.status(201).json({
		empresa: empresa,
		admin: {
			...usuario,
			...admin
		}
	});
});

module.exports = app => app.use('/empresas', router);
