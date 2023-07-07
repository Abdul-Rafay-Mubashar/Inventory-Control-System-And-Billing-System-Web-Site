import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import RedError from './RedError'
import GreenError from './GreenError'



export default function UpdateStock() {
    const [Id, setId] = useState(null)
    const [Quantaty, setQuantaty] = useState(null)
    const [error, setError] = useState(false)
    const [msg, setMsg] = useState(null)
    const UpdateData = async () => {
        setError(false)
        console.log(Id, Quantaty)
        const Req = {
            item_id: Id,
            newprice: Quantaty
        }
        if(Req.item_id===null && Req.newprice===null)
        {
            return
        }
        console.log(Req)
        const Update = await fetch("http://localhost:5000/api/Item/Update/price", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Req)
        })
        const Response = await Update.json()
        console.log(Response)
        if (Response.errors === undefined) {
            setMsg(Response.msg)
            setError(true)
            document.getElementsByClassName('Update_Input')[0].value=""
            document.getElementsByClassName('Update_Input')[1].value=""
            setId(null)
            setQuantaty(null)
            // setTimeout(() => {
            //     setError(false)
            // }, 2000);
        }
        else{
            console.log("ok")
            setMsg(Response.errors.msg)
            setError("Ok")

            // setTimeout(() => {
            //     setError(false)
            // }, 2000);

        }
    }
    useEffect(() => {
        console.log(msg)
        console.log(error)

        // if (msg.errors === undefined) {
        //     setError(true)

        // }
        // else {
        //     setError(true)
        //     setTimeout(() => {
        //         setError(false)
        //     }, 2000);
        // }
    }, [msg,error])
    return (
        <>
            <div className='UpdatePrice_Outline'>
                {error == true ? <GreenError msg={msg} /> :error==="Ok" ?<RedError msg={msg}/>:null

                }
                <div className='UpdateStock1_Container'>
                    <div className='UpdateStock1_Part1'>
                        <div className='UpdateStock_Part1_Pic'>
                            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZhEBoivtArK7CVAWwYN4IlQBr6-rSPSGQRvw2QUPRRw&usqp=CAU&ec=48665701' className='Update_Pic'></img>
                        </div>
                    </div>
                    <div className='UpdateStock_Part2'>
                        <div className='Update_Form_Outline'>
                            <div className='Update_Heading'>
                                Update Price
                            </div>
                            <div className='Update_Input_Com'>
                                <div className='Update_Input_Com_Head'>
                                    ID
                                </div>
                                <div className='Update_Input_Com_Input'>
                                    <input type='text' className='Update_Input' placeholder='Enter ID' onChange={(event) => { setId(event.target.value) ; }}>

                                    </input>
                                </div>
                            </div>
                            <div className='Update_Input_Com'>
                                <div className='Update_Input_Com_Head'>
                                    Price
                                </div>
                                <div className='Update_Input_Com_Input'>
                                    <input type='text' className='Update_Input' placeholder='Enter New Price' onChange={(event) => { setQuantaty(event.target.value); }}>

                                    </input>
                                </div>
                            </div>
                            <div className='Update_Button_Outline'>
                                <button className='Update_Button' onClick={UpdateData}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
