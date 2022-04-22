import React from "react";
import Styles from "./Styles.css"
import StartPage from "./startPage";
import QuizComp from "./quizComp";
import {nanoid} from "nanoid"

export default function App(){
    const [quest, setQuest] = React.useState([])
    const [start, setStart] = React.useState(false)
    const [check, setCheck] = React.useState(0)

    React.useEffect(  () => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json()).then(res => setQuest(res.results.map(item => {
            return {question: item.question, correct_answer: item.correct_answer,
                options: shuffle([...item.incorrect_answers.map(answ => ({value: answ, id: nanoid(),
                    select: false})), {value: item.correct_answer, id: nanoid(),
                    select: true}]),
                id: nanoid()}
        })))
    }, [])

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
                        if (option.value === item.correct_answer) return setCheck(prev => prev += 1)
                    }
                }
            )
        ))
    }

    console.log(check)

    let questions = quest.map(item => (
        <QuizComp
            key={item.id}
            qustionContent={item.question}
            options={item.options.map(elem => {
                const styles = {
                    backgroundColor: elem.select ?  "#D6DBF5" : '#ffffff'
                }
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
            {start && <button
                onClick={checkClick}
                className="btn">
                Check answers
            </button>}
        </main>
    )}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
