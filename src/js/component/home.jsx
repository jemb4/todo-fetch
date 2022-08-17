import React, { useState, useEffect} from "react";
import { Header } from "./header.jsx";
import { InputTask } from "./input.jsx";
import { List } from "./list.jsx";

//create your first component
const Home = () => {
	const [item, setItem] = useState({
		label: "",
	});

	const [itemArray, setItemArray] = useState([]);
	const [hidden, setHidden] = useState(true);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jmar", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) {
					throw Error(res.statusText);
				}

				return res.json();
			})

			.then((data) => {
				setItemArray(data);
				console.log(data);
				setHidden(false);
			})

			.catch((error) => console.log(error));
	}, []);

	const handleChange = (e) => {
		const { value } = e.target;
		setItem({
			label: value,
		});
	}

	const addItem = () =>{
		if( itemArray.length == 1  && itemArray[0].label == "invisible task"){
			const aux = [{ label: item.label, done: false}];
			fetch("https://assets.breatheco.de/apis/fake/todos/user/jmar", {
				method: "PUT",
				body: JSON.stringify(aux),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res);
						throw Error(res.statusText);
					}

					return res.json();
				})
				.then((response) => {
					console.log("Exito en cambiar la lista", response);
					setItemArray(aux);
					setItem({ label: "" });
					setHidden(false);
				})
				.catch((error) => console.log(error));
		} else {
			const aux = [ ...itemArray, { label: item.label, done: false }];
			fetch("https://assets.breatheco.de/apis/fake/todos/user/jmar", {
				method: "PUT",
				body: JSON.stringify(aux),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res);
						throw Error(res.statusText);
					}

					return res.json();
				})
				.then((response) => {
					console.log("Exito en updatear la lista", response);
					setItemArray(aux);
					setItem({ label: "" });
					setHidden(false);
				})
				.catch((error) => console.log(error));
		}
	}

	const deleteAll = () => {
		setItemArray([]);
		console.log(itemArray + "hola item array");
		let emptyArray = [{ label: "invisible task", done: false }];

		console.log(itemArray.length + "itemArray length");
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jmar", {
			method: "PUT",
			body: JSON.stringify(emptyArray),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (!res.ok) {
					console.log(res);
					throw Error(res.statusText);
				}

				return res.json();
			})
			.then((response) => {
				console.log("Exito en borrar TODA la lista", response);

				setHidden(true);
			})
			.catch((error) => console.log(error));
	}

	const deleteTask = (key) => {
		if (itemArray.length == 1) {
			deleteAll();
		} else {
			const newItemArray = itemArray.filter(
				(itemInArray, index) => index != key
			);
			console.log({ newItemArray });

			fetch("https://assets.breatheco.de/apis/fake/todos/user/jmar", {
				method: "PUT",
				body: JSON.stringify(newItemArray),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res);
						throw Error(res.statusText);
					}

					return res.json();
				})
				.then((response) => {
					console.log("Exito en borrar la lista", response);
					setItemArray(newItemArray);
				})
				.catch((error) => console.log(error));
		}

		if (itemArray.length == 1) {
			setHidden(true);
		}
	}

	return (
		<div className="container text-center container-todo">
			<Header />
			<InputTask 
				triggerChange={handleChange}
				addTask={addItem}
				inputValue={item.label}/>
				<ul>
					<li className={hidden ? "visibilityClass" : "hiddenClass"}>
						<p className="pDefault">No task, add one</p>
					</li>
					{itemArray.map((taskItem, key) => {
						return (
							<List
								key={key}
								task={taskItem.label}
								delete={() => deleteTask(key)}
							/>
						);
					})}
				</ul>
				<p
					className={
						!hidden
							? "visibilityClass text-center mt-5"
							: "hiddenClass"
					}>
					{itemArray.length == 1 &&
					itemArray[0].label === "invisible task"
						? 0
						: itemArray.length}{" "}
					Item left
				</p>
			<button
					onClick={deleteAll}
					className="d-flex mx-auto mt-1">
					delete All
			</button>
		</div>
	);
};

export default Home;
