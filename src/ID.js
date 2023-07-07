import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Image from './Image';
import InvoiceBill from './InvoiceBill';
import { useHistory } from 'react-router-dom';




export default function ViewBills() {
    const [Items, setItem] = useState([])
    const [Check, setCheck] = useState(false)
    const [SearchCheck, setSearchCheck] = useState(false)
    const [Id, setId] = useState(false)
    const [Search, setSearch] = useState({})
    const [SearchData, setSearchData] = useState({})
    const history=useHistory()

    const Ok=()=>{
        history.goBack()
        window.location.reload();
    }
    const SearchByName = (event) => {
        setSearch(event.target.value)
        console.log(Search)
    }
    const Touch1 = (id) => {
        setSearchCheck(true)
        setId(id)
    }
    const SearchEvent = (event) => {

        var Pick = {
            search: Search
        }
        fetch("http://localhost:5000/api/Customer/ID", {
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
                console.log(data.length)
                if(data.length===undefined)
                {
                    console.log("ok")

                    return
                }
                setSearchData(data)
                setCheck(1)
                //   setSearchCheck(true)
                //   setId(data[0]._id)
            })
    }

    useEffect(() => {
        console.log(Items)

    }, [Items])
    return (
        <>
            {SearchCheck === false ?
                <>
                    <SideBar />

                    <div className='ViewBills_OutLine'>
                        <Image />
                    </div>
                    <div className='ViewBills_OutLine_Real'>
                        <div className='ViewBills_OutLine_Real_Inside'>
                            <div className='For_Search'>
                                <div className='For_Search_Inside'>
                                    <input type='text' className='Search_Text' placeholder='Search By Id' onChange={SearchByName} />
                                    <button onClick={SearchEvent} className='Search_Button'> Search </button>
                                </div>
                            </div>
                            <div className='ViewBills_OutLine_Real_Inside_Container'>

                                {Check === 1 ? SearchData.map((res) => {
                                    return (
                                        <div className='ViewBills_OutLine_Real_Data_Container' onClick={() => { Touch1(res._id) }}>
                                            <div className='ViewBills_OutLine_Real_Data_Container_Name'>
                                                {res._id}
                                            </div>
                                            <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                                                {res.firstname}  {res.lastname}
                                            </div>
                                            <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                                                Phone No : {res.phoneno}
                                            </div>
                                            <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                                                Email : {res.email}
                                            </div>


                                        </div>)
                                }) : null

                                }
                            </div>
                        </div>
                    </div>
                </>
                : null}
            {SearchCheck === true ?
                <InvoiceBill id={Id} Ok={Ok} />
                : null}
        </>
    )
}
