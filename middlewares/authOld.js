// software intermedio que activa el acceso a las rutas solo con el token valido

const { expressjwt: jwt } = require("express-jwt");

function authJwt(
  app,
  secretKey = "seCreTo",
  excludedPaths = ["/api/usuarios/login", "/api/usuarios/registro"]
) {
  app.use(
    "/api",
    jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
      path: excludedPaths,
    })
  );
}

module.exports = authJwt;
