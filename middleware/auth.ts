import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyTokenMiddleware = (
  req: Request,
  res: Response,
  next: () => void,
) => {
  const secretKey = 'TEST';
  // Obtener el token del encabezado de la solicitud
  const token = req.headers.authorization;

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: 'No token send' });
  }

  try {
    const tokenValue = token?.split(' ')[1];
    // Verificar y decodificar el token utilizando la clave secreta
    jwt.verify(tokenValue, secretKey);
    next();
  } catch (error) {
    // Si el token es inválido, devolver un error de autenticación
    return res.status(401).json({ message: 'Invalid token' });
  }
};
