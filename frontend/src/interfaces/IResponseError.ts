interface IResponseError {
  response: {
    data: {
      message: string | string[];
    };
  };
}

export default IResponseError;
