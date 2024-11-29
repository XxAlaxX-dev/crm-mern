const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Affiche la pile d'erreurs dans la console
  
    const statusCode = err.status || 500;
    const response = {
      success: false,
      message: err.message || 'Internal Server Error',
      type: err.type || 'GenericError',
    };
  
    // Inclure des données supplémentaires si disponibles
    if (err.data) {
      response.data = err.data;
    }
  
    // Ajouter la stack uniquement en développement
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }
  
    res.status(statusCode).json(response);
  };
  
  module.exports = errorHandler;
  