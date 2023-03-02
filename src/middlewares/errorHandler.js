exports.errorHandler = (err, req, res, next) => {
    const status = err.status || err.error?.statusCode || 500;
    const message = err.error?.message || "An error happened";
  
    if (err) {
      res.status(status).json({
        ok: false,
        data: null,
        status: status,
        message: message,
      });
    }
    next();
  };
  