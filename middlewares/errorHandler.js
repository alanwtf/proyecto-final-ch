const error404Middleware = (req, res, next) => {
    return res.status(404).json({
        descripcion: `Ruta ${req.url} método ${req.method} no implementada`,
    });
};

const errorHandler = (err, req, res, next) => {};

module.exports = { error404Middleware };
