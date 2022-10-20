import { useState, useEffect, useRef } from 'react';
import { getAllStudents } from './client';
import { IStudent, IUnfetchError, IUnfetchResponse } from './interfaces';
import './App.css';

function App() {
	const [students, setStudents] = useState<IStudent[]>([])
	const hasToFetchTheFirstTime = useRef(true);

	const fetchStudents = () => {
		getAllStudents()
			.then((response: IUnfetchResponse) => {
				return response.json()})
			.then((students: IStudent[]) => {
				console.log(students);
				setStudents(students);
			})
			.catch((reason: IUnfetchError) => {
				console.log(reason);
			});
	}

	useEffect(() => {
		if(hasToFetchTheFirstTime.current) {
			hasToFetchTheFirstTime.current = false;
			fetchStudents();
		}
	}, []);
	return (<div>{students.length}</div>);
}

export default App;
