import React, { useState } from "react";

export const List = (props) => {
	const [buttonShown, setButtonShown] = useState(false);

	function mouseHover() {
		buttonShown === true ? setButtonShown(false) : setButtonShown(true);
	}

	return (
		<li
			key={props.id}
			className="liClass"
			onMouseEnter={mouseHover}
			onMouseLeave={mouseHover}>
			{props.task === "invisible task" ? "No task, add one" : props.task}

			{props.task !== "invisible task"
				? buttonShown && (
						<button
							className="mx-2"
							onClick={props.delete}>
							X
						</button>
				  )
				: null}
		</li>
	);
};