import { expressjwt as jwt } from "express-jwt";

const authJwt = (
  app,
  secretKey = "seCreTo",
  excludedPaths = ["/api/usuarios/login", "/api/usuarios/registro"]
) => {
  app.use(
    "/api",
    jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
      path: excludedPaths,
    })
  );
};

export default authJwt;
