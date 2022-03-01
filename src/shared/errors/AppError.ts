class AppError {
  public readonly message: string;
  public readonly type: string;

  constructor(message: string, type = 'error') {
    this.message = message;
    this.type = type;
  }
}

export default AppError;
