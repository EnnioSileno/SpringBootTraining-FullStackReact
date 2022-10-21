import fetch from 'unfetch';
import { IUnfetchResponse, IUnfetchError } from './interfaces';

const checkStatus = (response: IUnfetchResponse): Promise<IUnfetchResponse | never> => {
    if(response.ok) {
        return Promise.resolve(response);
    }
    //needs to create a reject manually bc an 404 for example is no recognized as a reject;
    //see https://www.npmjs.com/package/unfetch
    var error: IUnfetchError = {
        error: new Error(response.statusText),
        errorObject: response,
    };
    return Promise.reject(error);
}

export const getAllStudents = (): Promise<IUnfetchResponse | never> =>
    fetch('api/v1/students')
        .then(checkStatus);