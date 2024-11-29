class CustomError extends Error {
  /**
   * @param {string} message - Message décrivant l'erreur
   * @param {number} status - Code de statut HTTP (par défaut : 500)
   * @param {string} type - Type ou catégorie de l'erreur (par exemple : 'ValidationError', 'AuthError')
   * @param {object} data - Données supplémentaires associées à l'erreur
   */
  constructor(
    message = "Something went wrong",
    status = 500,
    type = "GenericError",
    data = {}
  ) {
    super(message); // Appelle le constructeur de la classe Error
    this.status = status; // Code de statut HTTP
    this.type = type; // Type d'erreur
    this.data = data; // Données supplémentaires pour le débogage
    Error.captureStackTrace(this, this.constructor); // Capture la stack trace propre
  }
}

module.exports = CustomError;
