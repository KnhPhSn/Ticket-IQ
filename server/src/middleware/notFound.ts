import { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `${req.method} ${req.originalUrl} does not exist`,
    path: req.originalUrl
  });
};

export default notFoundHandler;