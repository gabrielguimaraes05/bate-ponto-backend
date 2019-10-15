/**
 * Nesse arquivo estão as validações de cada 
 * rota do módulo. As validações interrompem
 * a requisição à uma rota caso tenha algum
 * erro na checagem dos dados de entrada.
 * 
 */
module.exports = {
    checaLogin(req,res,next){
        const {email,senha} = req.body;
        let erros = [];
    
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email) erros.push({erro:"E-mail obrigatório"});
        if(!emailRegex.test(email)) erros.push({erro: "E-mail inválido"});
    
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if(!senha) erros.push({erro:"Senha obrigatória"});
        if(!senhaRegex.test(senha)) erros.push({erro: "Senha inválida"});

        if (erros.length > 0) {
            res.status(400).json({erros: erros});
        }else{
            next();
        }
    }
}; 