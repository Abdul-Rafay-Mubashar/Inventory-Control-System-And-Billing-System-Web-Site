import React, { useEffect, useState } from 'react'
import InvoiceBill from './InvoiceBill';
import { useHistory } from 'react-router-dom';


export default function BillItemsAdd() {
    var BillJSON = sessionStorage.getItem("Bill_Id");
    var Bill = JSON.parse(BillJSON);
    console.log(Bill);
    const id = Bill._id
    const Name = Bill.firstname + " " + Bill.lastname
    console.log(id, Name)
    var totel1 = 0;
    const [Search, setSearch] = useState(null)
    const [invoce, setInvoice] = useState(false)
    const [SearchData, setSearchData] = useState(null)
    const [Check, setCheck] = useState(false)
    const [CheckTotel, setCheckTotel] = useState(false)
    const [For_Items, setFor_Items] = useState(false)
    const [CheckQuantaty, setCheckQuantaty] = useState({})
    const [totel, setTotel] = useState(null)
    const [name, setName] = useState(null)
    const [p, setP] = useState(null)
    const [cal, setCul] = useState(0)
    const [Item, setItem] = useState([])
    const [Bills, setBills] = useState([])

    const [Send, setSend] = useState([])
    const [Quantaty, setQuantaty] = useState(null)
    const [Remain, setRemain] = useState(null)

    const [Amount, setAmount] = useState(null)
    const [Num, setNum] = useState({})
    const history=useHistory()
    const Ok=()=>{
        sessionStorage.clear()
        history.push("/AddCustomer")
        window.location.reload();
    }
    
    var Quantaty_For_Button;
    var Quantaty_Button;
    var o = 0;
    var w=100;
    var i = 0;

    var cle
    const slide=() => {
        document.getElementsByClassName("Streacher")[0].style.height=w+"vh"
        w=w-3
        if(w===0||w<0)
        {
            clearInterval(cle)
        }
    };

    const Cencel_Bill = async () => {
        const ok = {
            id: id
        }
        const Sends = await fetch("http://localhost:5000/api/Customer/Del", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ok)
        })
        const Wait = await Sends.json()
        console.log(Wait)
        sessionStorage.clear()
        history.push("/AddCustomer")
        window.location.reload();
    }
    const Add_Totel = async () => {
        const Body = {
            customerid: id,
            totel: cal
        }
        console.log(cal, id, Body)
        const Sendings = await fetch("http://localhost:5000/api/Bills/Add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Body)
        })
        const Response = await Sendings.json()
        console.log(Response)
        setInvoice(true)
        cle=setInterval(() => {
            slide()
        }, 1);
    }
    const Calculate = () => {
        var a = Amount;
        var b = cal
        var c = a - b;
        console.log(c)
        setRemain(c)
        
        document.getElementsByClassName("Totel_Complete_Bill_Button")[0].style.display="flex"
    }

    const AmountCheck = (event) => {
        setAmount(event.target.value)
    }
    useEffect(() => {
        if (Amount === null) {
            return
        }
        console.log(Amount, cal)
        if (Amount >= cal) {
            console.log("Ok")
            document.getElementsByClassName("Totel_Complete_Bill_Button1")[0].style.display = "flex"
        }
        else {
            document.getElementsByClassName("Totel_Complete_Bill_Button1")[0].style.display = "none"
        }
    }, [Amount])
    const Update_Item = async () => {
        console.log(Item)
        const Sends = await fetch("http://localhost:5000/api/Item/Update/Sale", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Item)
        })
        const Response = await Sends.json()
        console.log(Response)
        Add_Totel()
    }
    const Add_Bill = async () => {
        console.log(Send)
        const Sends = await fetch("http://localhost:5000/api/BillsItems/Add", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Send)
        })
        const Response = await Sends.json()
        console.log(Response)
        Update_Item()
    }

    const close = (index) => {
        var two = cal - Bills[index].ammount
        console.log(two)
        setCul(two)
        setTotel("Your Totel = " + two)
        var arr = [1, 2, 3, 4]
        console.log(Bills)
        var d = Bills.slice(0, index)
        var e = Bills.slice(index + 1)
        var f = d.concat(e)
        setBills(f)
        d = Send.slice(0, index)
        e = Send.slice(index + 1)
        f = d.concat(e)
        setSend(f)
        d = Item.slice(0, index)
        e = Item.slice(index + 1)
        f = d.concat(e)
        setItem(f)
        console.log(Item)
    }
    const ADD = () => {
        setFor_Items(false)
        var trimmedNum = Number(Num.trim());
        var L = {
            name: document.getElementsByClassName("For_input")[0].value,
            noofproduct: trimmedNum,
        }

        console.log(SearchData[i].name,i,p)
        console.log(SearchData,L.noofproduct * SearchData[i].price,i)
        var b = L.noofproduct * p
        setName(b);
        console.log(name)
        var tol = b + cal
        console.log(tol)
        setCul(tol)
        setTotel("Your Totel = " + tol)
        console.log(totel)
        var A = {
            name: document.getElementsByClassName("For_input")[0].value,
            noofproduct: L.noofproduct,
        }
        Item.push(A)
        console.log(Item)
        var B = {
            name: document.getElementsByClassName("For_input")[0].value,
            noofproduct: trimmedNum,
            ammount: b,
            price: p
        }
        Bills.push(B)
        setFor_Items(true)
        console.log(Bills)
        var c = {
            billno: id,
            name: document.getElementsByClassName("For_input")[0].value,
            noofproduct: trimmedNum,
            ammount: b

        }
        Send.push(c)
        console.log(Send)
        document.getElementsByClassName("For_input_Ammount")[0].value = ""
        document.getElementsByClassName("For_input")[0].value = ""
        document.getElementsByClassName("Customer_Submit_Button1")[0].style.display = "none"
    }
    const Quantaty_Estimate = (n, ind) => {
        console.log(n, ind)
        document.getElementsByClassName("For_input")[0].value = n
        const Quantaty = SearchData[ind].totel;
        Quantaty_For_Button = Quantaty;
        console.log(Quantaty)
        var Beauti = " Pices Are Availibale"
        setQuantaty(Quantaty + Beauti + " " + SearchData[ind].price + " Rs Each")
        setCheck(false)
        setCheckQuantaty(true)
        setP(SearchData[ind].price)
        i=SearchData[ind].price;
        console.log(i,p)
    }
    const Button = () => {
        console.log(Quantaty)
        if (Quantaty === null) {
            return
        }
        var a = Quantaty
        var b = a.slice(0, a.indexOf("P"))
        var convertedNum = Number(Num);
        var convertedB = Number(b);
        console.log(convertedNum);
        console.log(convertedB);
        if (Num === "") {
            console.log("Ok")
            document.getElementsByClassName("Customer_Submit_Button1")[0].style.display = "none"
            return

        }
        if (convertedNum <= 0) {
            document.getElementsByClassName("For_input_Ammount")[0].value = ""
            return
        }
        if (convertedNum <= convertedB) {
            console.log(convertedNum);
            console.log(convertedB);
            document.getElementsByClassName("Customer_Submit_Button1")[0].style.display = "flex"
        }
        else if (convertedNum > convertedB) {
            console.log(convertedNum);
            console.log(convertedB);
            document.getElementsByClassName("Customer_Submit_Button1")[0].style.display = "none"
        }
    }

    const SearchEvent = () => {
        console.log(Search)
        // if(SearchData===null)
        // {
        //     return
        // }
        setCheckQuantaty(false)
        if (Search === "" || Search === null) {
            setCheck(null)
            setSearchData(null)
            return
        }
        var Pick = {
            search: Search
        }
        fetch("http://localhost:5000/api/Item/Search", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Pick)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setSearchData(data)
                if (data.length > 0) {
                    setCheck(1)
                }
            })
    }
    useEffect(() => {
        setCheckTotel(true)
    }, [totel])
    useEffect(() => {
        SearchEvent()
    }, [Search])
    useEffect(() => {
        Button()
    }, [Num])
    return (
        <>
            <div className='BillItem_Outline'>
                <div className='BillItem_Inside'>
                    {/* <div className='BillItem_Inside_Part1'>

                </div> */}
                    <div className='BillItem_Inside_Part2'>
                        <div className='Bilitem_Cus_Name_Box'>
                            <div className='Bilitem_Cus_Name'>
                                {Name}
                            </div>
                            <div className='Bilitem_Cus_Line'>
                                Use The Search Bar To Add The Items You Want To Add
                            </div>
                        </div>
                        <div className='BillItem_Search'>
                            <div className='BillItem_Search_Pic'>
                                <img src='https://icones.pro/wp-content/uploads/2021/02/loupe-et-icone-de-recherche-de-couleur-grise.png' alt='Pic' className='Search_pic' />
                            </div>
                            <div className='For_input_Items'>
                                <input className='For_input' placeholder='Search Name' onChange={(event) => { setSearch(event.target.value) }} onClick={SearchEvent}>

                                </input>
                            </div>
                        </div>
                        <div className='BillItem_Search_Box'>
                            {Check === 1 ?
                                <div className='BillItem_Search_Items'>
                                    {Check === 1 ? SearchData.map((res, index) => {

                                        const name = res.name
                                        return (
                                            <button key={index} className='BillItem_Search_Items_Com' onClick={() => { Quantaty_Estimate(name, index) }}>
                                                {res.name}
                                            </button>
                                        )
                                    }) : null
                                    }
                                </div> : null
                            }
                        </div>
                        <div className='BillItem_Item'>
                            <div className='BillItem_Item_Heading'>
                                You Order
                            </div>
                            <div className='Item_Inside'>
                                {For_Items === true ? Bills.map((res, index) => {
                                    console.log(Bills)
                                    const a=p;
                                    return (
                                        <div className='GreenError_OutLine1'>
                                            <div className='RedError_OutLine_Part1'>
                                                {res.noofproduct + " " + res.name + " : " + res.noofproduct + " * " + res.price + " = " + res.ammount}
                                            </div>
                                            <div className='RedError_OutLine_Part2'>
                                                <button className='Cross_Error_Outline_For_Green' onClick={() => { close(index) }}>
                                                    <img src='https://www.freeiconspng.com/thumbs/close-icon/close-icon-39.png' className='Cross_Error_Outline_Pic' />
                                                </button>
                                            </div>
                                        </div>)
                                })
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className='BillItem_Inside_Part2_Border'>

                    </div>
                    <div className='BillItem_Inside_Part3'>
                        <div className='Totel_Pices'>
                            {CheckQuantaty === true ?
                                Quantaty : null

                            }
                        </div>
                        <div className='Totel_Pices'>
                            <input className='For_input_Ammount' placeholder='Add Quantaty' onChange={(event) => { setNum(event.target.value) }} />
                        </div>
                        <div className='Totel_Pices'>
                            <button className='Totel_Cencel_Button' onClick={Cencel_Bill}>
                                Cencel Bill
                            </button>
                            <button className='Customer_Submit_Button1' onClick={ADD}>
                                ADD
                            </button>
                        </div>
                        <div className='Totel_Pices'>
                            {CheckTotel === true ?
                                totel : null
                            }
                        </div>
                        <div className='Totel_Pices1'>
                            {/* <button className='Totel_Complete_Bill_Button' onClick={Add_Bill}>
                            Complete
                        </button> */}
                        </div>
                        <div className='Totel_Pices'>
                            <input className='For_input_Ammount' placeholder='Customer Ammount' onChange={AmountCheck} />
                            <button className='Totel_Complete_Bill_Button1' onClick={Calculate}>
                                OK
                            </button>
                        </div>
                        <div className='Totel_Pices'>
                            {Remain !== null ?
                                Remain + " Rs To Return" : null
                            }
                        </div>
                        <button className='Totel_Complete_Bill_Button' onClick={Add_Bill}>
                            Done
                        </button>
                    </div>
                </div>
            </div>
            {invoce === true ?
                <>
                    <div className='Streacher'>
                    </div>
                    <InvoiceBill id={id} Ok={Ok} />
                </>
                : null}
        </>
    )
}
