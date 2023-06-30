"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenMiddleware = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY; // Acceder a la variable de entorno SECRET_KEY
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization;
    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'No token send' });
    }
    try {
        const tokenValue = token?.split(' ')[1];
        // Verificar y decodificar el token utilizando la clave secreta
        jsonwebtoken_1.default.verify(tokenValue, secretKey);
        next();
    }
    catch (error) {
        // Si el token es inválido, devolver un error de autenticación
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
