import React from "react";
import Option from "./option";

export default function QuizComp(props){

    return(
        <div className="question-container"
        >
            <h1>{props.qustionContent}</h1>

            {props.options}
            <hr/>
        </div>
    )
}

