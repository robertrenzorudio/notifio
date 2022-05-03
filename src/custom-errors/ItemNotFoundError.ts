class ItemNotFoundError extends Error {
  errorCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'ItemNotFoundError';
    this.errorCode = 404;
  }
}

export default ItemNotFoundError;
