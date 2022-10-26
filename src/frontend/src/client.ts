import fetch from 'unfetch';
import { IUnfetchResponse, IUnfetchError } from './interfaces';

const checkStatus = (response: IUnfetchResponse): Promise<IUnfetchResponse | never> => {
    console.log('check status');
    console.log(response);
    if(response.ok) {
        return Promise.resolve(response);
    }
    //needs to create a reject manually bc an non-2xx HHTP request is not recoginized automatically;
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

export const addNewStudent = (student: any) =>
    fetch('api/v1/students', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(student)
        }
    ).then(checkStatus);

export const deleteStudent = (studentID: number) => 
        fetch(`api/v1/students/${studentID}`, {
            method: 'DELETE'
        })
        .then(checkStatus);
