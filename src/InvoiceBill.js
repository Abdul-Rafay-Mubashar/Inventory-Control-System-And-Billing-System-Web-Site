import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';


export default function InvoiceBill(props) {
    const customerid = props.id
    const [Personal, setPersonal] = useState(null)
    const [Totel, setTotel] = useState(null)
    const [Billitems, setBillitems] = useState(null)
    const history=useHistory()

    const Ok=()=>{
        sessionStorage.clear()
        history.push("/AddCustomer")
        window.location.reload();
    }

    const get_Cus = async () => {
        const go = {
            customerid: customerid
        }
        const Cus = await fetch("http://localhost:5000/api/Customer/Get", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(go)
        })
        const Response = await Cus.json();
        console.log(Response)
        setPersonal(Response)
    }
    const get_bills = async () => {
        const go = {
            customerid: customerid
        }
        const Cus = await fetch("http://localhost:5000/api/Bills/Get", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(go)
        })
        const Response = await Cus.json();
        console.log(Response)
        setTotel(Response)
    }
    const get_billsitems = async () => {
        const go = {
            customerid: customerid
        }
        const Cus = await fetch("http://localhost:5000/api/BillsItems/Get", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(go)
        })
        const Response = await Cus.json();
        console.log(Response)
        setBillitems(Response)
    }
    useEffect(() => {
        get_Cus()
        get_bills()
        get_billsitems()
    }, [])
    return (
        <>
            <div className='InvoiceBill_LayOut'>

            </div>
            <div className='InvoiceBill_Outline'>
                <div className='Al_Top'>
            <div className='Bill_Id'>
                <div className='Totel_Bar'>
                    <div className='Totel_Bar1'>
                        Bill ID :
                    </div>
                    <div className='Totel_Bar2'>
                        {props.id}
                    </div>
                </div>
            </div>
                <div className='InvoiceBill_Outline_Inside'>
                    <div className='InvoiceBill_Header'>
                        <div className='InvoiceBill_Header_Inside'>
                            <div className='InvoiceBill_Header_Info'>
                                <div className='InvoiceBill_Header_Info_Con'>
                                    <div className='InvoiceBill_Header_Info_Inside'>
                                        Name :
                                    </div>
                                    {Personal !== null ?

                                        <div className='InvoiceBill_Header_Info_Inside1'>
                                            {Personal.firstname} {Personal.lastname}
                                        </div>
                                        : null}

                                </div>
                                <div className='InvoiceBill_Header_Info_Con'>
                                    <div className='InvoiceBill_Header_Info_Inside'>
                                        Phone :
                                    </div>
                                    {Personal !== null ?

                                        <div className='InvoiceBill_Header_Info_Inside1'>
                                            {Personal.phoneno}
                                        </div>
                                        : null}

                                </div>
                                <div className='InvoiceBill_Header_Info_Con'>
                                    <div className='InvoiceBill_Header_Info_Inside'>
                                        Email :
                                    </div>
                                    {Personal !== null ?

                                        <div className='InvoiceBill_Header_Info_Inside1'>
                                            {Personal.email}
                                        </div>
                                        : null}

                                </div>
                                <div className='InvoiceBill_Header_Info_Con'>
                                    <div className='InvoiceBill_Header_Info_Inside'>
                                        Date :
                                    </div>
                                    {Personal !== null ?
                                        <div className='InvoiceBill_Header_Info_Inside1'>
                                            {Personal.date}
                                        </div>
                                        : null}
                                </div>
                                <div className='InvoiceBill_Header_Info_Con'>
                                    <div className='InvoiceBill_Header_Info_Inside'>
                                        Time :
                                    </div>
                                    {Personal !== null ?
                                        <div className='InvoiceBill_Header_Info_Inside1'>
                                            {Personal.time}
                                        </div>
                                        : null}
                                </div>
                            </div>
                            {Totel !==null?
                            <div className='Totel_Invoice'>
                                Totel Invoice
                                <br></br>
                                <br></br>
                                {Totel.totel + " Rs"}
                            </div>:null
                            }
                        </div>
                    </div>
                </div>
                <div className='Item_Record_Container'>
                    <div className='Item_Des'>
                        <div className='Item_Des_Name'>
                            Name
                        </div>
                        <div className='Item_Des_Price'>
                            Price
                        </div>
                        <div className='Item_Des_Price'>
                            Ammount
                        </div>
                        <div className='Item_Des_Price'>
                            Sub Totel
                        </div>
                    </div>
                    <div className='Item_Com'>
                        {Billitems !==null? Billitems.map((res)=>{
                            return(
                        <div className='Item_Con'>
                            <div className='Item_Des_Name'>
                                {res.name}
                            </div>
                            <div className='Item_Des_Price'>
                                {res.ammount/res.noofproduct}
                            </div>
                            <div className='Item_Des_Price'>
                                {res.noofproduct}
                            </div>
                            <div className='Item_Des_Price'>
                                {res.ammount}
                            </div>
                        </div>)})
                        :null
                        }
                    </div>
                </div>
                <div className='Totel_Bar'>
                    <div className='Totel_Bar1'>
                        Totel
                    </div>
                    {Totel !==null?

                    <div className='Totel_Bar2'>
                        {Totel.totel + " Rs"}
                    </div>
                    :null}
                </div>
                <div className='Totel_Bar11'>
                    <div className='Totel_Bar1'>
                    </div>
                    <div className='Totel_Bar21'>
                        <button className='Ok_Button' onClick={props.Ok}> OK </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}
