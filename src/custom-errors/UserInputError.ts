class UserInputError extends Error {
  errorCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'UserInputError';
    this.errorCode = 400;
  }
}

export default UserInputError;
