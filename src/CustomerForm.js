import React, { useState } from 'react'
import RedError from './RedError'
import GreenError from './GreenError'
import SideBar from './SideBar'

import { useHistory } from 'react-router-dom';


export default function CustomerForm() {
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [no, setNo] = useState(null)
    const [email, setEmail] = useState(null)
    const [msg, setMsg] = useState(null)
    const [check, setCheck] = useState(false)
    const [send, setSend] = useState(false)
    const history=useHistory()

    const AddCustomer = async () => {
        setMsg(null)
        setCheck(false)
        const Send_Item = {
            firstname: fname,
            lastname: lname,
            phoneno: no,
            email: email
        }
        const Add = await fetch("http://localhost:5000/api/Customer/Add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Send_Item)
        })
        const response = await Add.json();
        console.log(response)
        if (response.errors === undefined) {
            var Sucess = response.firstname + " " + response.lastname + " Is Created"
            setMsg(Sucess)
            setCheck(true)
            sessionStorage.setItem("Bill_Id", JSON.stringify(response))
            history.push("/AddBill")
            window.location.reload();
        }
        else {
            setMsg(response.errors[0].msg)
            setCheck(1)
        }
    }
    return (
        <>
        <SideBar/>
            <div className='Customer_Form_Outline'>
                <div className='Customer_Form_Outine_Inside'>
                    <div className='Customer_Form_Outine_Inside_Heading_Component'>
                        <div className='Customer_Heading_Com'>
                            Customer Detail
                        </div>
                    </div>
                    <div className='Form_Ouline_For_Cus_Info'>
                        {check === 1 ? <RedError msg={msg} /> : check === true ? <GreenError msg={msg} /> : null

                        }
                        <div className='Customer_Form_Com'>
                            <div className='Customer_Form_Com_Name'>
                                First Name
                            </div>
                            <div className='Input_For_Customer'>
                                <input type='text' className='Input_For_Customer_Bar' placeholder='First Name' onChange={(event) => { setFname(event.target.value) }} />
                            </div>
                        </div>
                        <div className='Customer_Form_Com'>
                            <div className='Customer_Form_Com_Name'>
                                Last Name
                            </div>
                            <div className='Input_For_Customer'>
                                <input type='text' className='Input_For_Customer_Bar' placeholder='Last Name' onChange={(event) => { setLname(event.target.value) }} />
                            </div>
                        </div>
                        <div className='Customer_Form_Com1'>
                            <div className='Customer_Form_Com_Name'>
                                Phone No
                            </div>
                            <div className='Input_For_Customer'>
                                <input type='text' className='Input_For_Customer_Bar' placeholder='Phone No' onChange={(event) => { setNo(event.target.value) }} />
                            </div>
                        </div>
                        <div className='Customer_Form_Com1'>
                            <div className='Customer_Form_Com_Name'>
                                Email
                            </div>
                            <div className='Input_For_Customer'>
                                <input type='text' className='Input_For_Customer_Bar' placeholder='Email' onChange={(event) => { setEmail(event.target.value) }} />
                            </div>
                        </div>
                        <div className='Customer_Form_Com2'>
                            <button className='Customer_Submit_Button' onClick={AddCustomer}> Submit </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}