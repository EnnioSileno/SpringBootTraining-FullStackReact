import { IUnfetchResponse } from ".";

interface IUnfetchError {
    error: Error;
    errorObject: IUnfetchResponse;
}

export default IUnfetchError;