import React from "react";

export const InputTask = (props) => {
	return (
		<div className="form d-flex justify-content-center">
			<div className="justify-content-center">
			<input
				type="text"
				placeholder="Your task"
				onChange={props.triggerChange}
				value={props.inputValue}
			/>
			</div>
			<button
				className="d-flex mx-2"
				onClick={props.addTask}>
				ADD
			</button>
		</div>
	);
};