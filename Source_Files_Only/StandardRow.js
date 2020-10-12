import React from 'react';
import './CSS/StandardRow.css';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStateValue } from './StateProvider';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

function StandardRow({ text, id, indent }) {

    // Access to the Global State to use Dispatch Method
    const [{task, no},dispatch] = useStateValue();
    
    // To dynamically change the color and textsize based on the indent of the standard 
    let text_color;
    let text_size;
    switch(indent){
        case 0:
            text_color = "aqua";
            text_size = "18px";
            break;
        case 1:
            text_color = "black";
            text_size = "16px";
            break;
        default:
            text_color = "grey";
            text_size = "14px";
            break;
    }

    let num = indent*40;
    
    // Dispatch Methods for all type of 5 Operation, Left, Right, Up, Down and Delete
    const upchange = () => {
        dispatch({
            type: "UP-CHANGE",
            id: id,
        })
    }
    const downchange = () => {
        dispatch({
            type: "DOWN-CHANGE",
            id: id,
        })
    }
    const decrease = () => {
        dispatch({
            type: "DECREASE",
            id: id,
        })
    }
    const increase = () => {
        dispatch({
            type: "INCREASE",
            id: id,
        })
    }
    const deletetask = () => {
        dispatch({
            type: "DELETE",
            id: id,
        })
    }
   
    return (
        <>
            <div className="standardRow">
                <div className="standardRow_actions">
                    <IconButton onClick={upchange}><ArrowUpwardIcon /></IconButton>
                    <IconButton onClick={downchange}><ArrowDownwardIcon /></IconButton>
                    <IconButton onClick={decrease}><ArrowBackIcon /></IconButton>
                    <IconButton onClick={increase}><ArrowForwardIcon /></IconButton>
                    <IconButton onClick={deletetask}><DeleteIcon /></IconButton>
                </div>
                {/* To display grey moving Box before any Standard  */}
                <div className="standardRow_block" style={{ marginLeft: num.toString()+"px" }}>

                </div>
                {/* Actually Standard Text with input box to make it Changeable */}
                <div className="standardRow_standard">
                    <input type="text" value={text} 
                            className="standardRow_input"  
                            onChange={ e => dispatch({
                                type: "CHANGE_TEXT",
                                id: id,
                                value: e.target.value,
                            })} 
                            style={{color: text_color,fontSize: text_size}} />
                </div>
            </div>
            <hr />
        </>
    )
}

export default StandardRow;
