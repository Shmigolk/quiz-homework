import React from "react";
import Styles from "./Styles.css"
import StartPage from "./startPage";
import QuizComp from "./quizComp";
import {nanoid} from "nanoid"

export default function App(){
    const [quest, setQuest] = React.useState([])
    const [start, setStart] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [check, setCheck] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)

    React.useEffect(  () => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json()).then(res => setQuest(res.results.map(item => {
            return {question: item.question, correct_answer: item.correct_answer,
                options: shuffle([...item.incorrect_answers.map(answ => ({value: answ, id: nanoid(),
                    select: false, corr: false})), {value: item.correct_answer, id: nanoid(),
                    select: false, corr: true}]),
                id: nanoid()}
        })))
    }, [newGame])

    function clickHandler(){
        setStart(prev => !prev)
    }

    function selectClick(item, elem){
        setQuest(quest.map(
            quest => quest.question === item.question ? ({...item, options: item.options.map(
                option => option === elem ? ({...option, select: true}) : ({...option,  select: false})
                )}) : quest
        ))
    }
    function checkClick(){
        quest.map(item => (
            item.options.map(option => {
                    if (option.select) {
                        if (option.value === item.correct_answer) return setCount(prev => prev += 1)
                    }
                }
            )
        ))
        setCheck(true)
    }

    function newGameClick(){
        setCheck(false)
        setNewGame(prev => !prev)
        setCount(0)
    }

    let questions = quest.map(item => (
        <QuizComp
            key={item.id}
            qustionContent={item.question}
            options={item.options.map(elem => {
                let styles
                if (check){
                        if (elem.select) {
                            if (elem.corr){
                            styles = {backgroundColor: "#94D7A2"}} else{
                                styles = {backgroundColor: "#F8BCBC"}
                            }
                        } else if (elem.corr){
                            styles = {backgroundColor: "#94D7A2"}
                        }
                            } else {styles = {backgroundColor: elem.select ? "#D6DBF5" : '#ffffff'}}

                return (<div className="answer"
                             key={elem.id}
                             onClick={() => selectClick(item, elem)}
                             style={styles}
                >{elem.value}</div>)})}
        /> ))

    return (
        <main>
            {!start && <StartPage
                clickHandler={clickHandler}/>}
            {start && questions}
            {start && !check && <button
                onClick={checkClick}
                className="btn">
                Check answers
            </button>}
            {check && <span>
                <h4>You scored {count}/{quest.length} correct answers</h4>
                <button
                className="btn"
                onClick={newGameClick}
                >
                Play again
            </button>
                </span>}
        </main>
    )}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

function chooseColor(elem, check){
    let styles
    if (check){
        if (elem.select) {
            if (elem.corr){
                styles = {backgroundColor: "#94D7A2"}} else{
                styles = {backgroundColor: "#F8BCBC"}
            }
        } else if (elem.corr){
            styles = {backgroundColor: "#94D7A2"}
        }
    } else {styles = {backgroundColor: elem.select ? "#D6DBF5" : '#ffffff'}}
}
