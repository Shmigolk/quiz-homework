import React from "react";

export default function StartPage(props){
    return (
        <div className="start-page">
        <h2>Quizzical</h2>
        <h3>Just a description</h3>
        <button
            onClick={props.clickHandler}
            className="btn"
            Start quiz>
            Start the quiz
        </button>
    </div>
    )
}