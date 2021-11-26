const db = require('../../database/models');

const Usuarios = db.Usuario;

function userLoggedMiddleware(req, res, next){
    console.log(req.session.userLogged);
    console.log(req.cookies);
    if(req.cookies.email){
        let cookieEmail = req.cookies.email;   

        Usuarios.findOne({    
            where:{
                email: cookieEmail
            }
        })
        .then(usuario => {
                if(usuario){
                    req.session.userLogged = usuario;
                }
            })
            .catch(error => res.send(error));
    }
    next();
}

module.exports = userLoggedMiddleware;