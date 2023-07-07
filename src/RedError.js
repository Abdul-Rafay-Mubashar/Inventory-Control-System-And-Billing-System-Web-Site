import React from 'react'

export default function RedError(props) {
    const Cross = () => {
        document.getElementsByClassName("RedError_OutLine")[0].style.display = "none";
    }
    return (
        <div className='RedError_OutLine'>
            <div className='RedError_OutLine_Part1'>
                {props.msg}
            </div>
            <div className='RedError_OutLine_Part2'>
                <button className='Cross_Error_Outline' onClick={Cross}>
                    <img src='https://www.freeiconspng.com/thumbs/close-icon/close-icon-39.png' className='Cross_Error_Outline_Pic'/>
                </button>
            </div>
        </div>
    )
}
