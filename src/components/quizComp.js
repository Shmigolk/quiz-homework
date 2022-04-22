import React from "react";

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

