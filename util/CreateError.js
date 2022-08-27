export const CreateError = (message, code) => {
    const err = new Error();
    err.statusCode = code;
    err.message = message;
    return err;
}

export default CreateError;

