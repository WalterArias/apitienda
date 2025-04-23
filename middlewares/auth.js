const { expressjwt: jwt } = require("express-jwt");

function authJwt(
  app,
  secretKey = "seCreTo",
  excludedPaths = ["/api/usuarios/login"]
) {
  app.use(
    "/api",
    jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
      path: excludedPaths,
    })
  );
}

module.exports = authJwt;
