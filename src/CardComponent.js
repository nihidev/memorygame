import React from 'react';
import './index.css';

const CardComponent = ({question,text, handleClick,color}) => {
    console.log(color);
    if(question === true){
    return (
        <div className='card-component' onClick={handleClick}>   
            <div className='memoryImg' style={{background:color }}>{text}</div>
        </div>)
    }
    else {
    return (
        <div className='card-component' onClick={handleClick}>   
            <div className='memoryImg' style={{background:color }}>{text}</div>
        </div>)
    }

};

export default CardComponent;