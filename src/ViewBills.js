import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import Image from './Image';


export default function ViewBills() {
  const [Items, setItem] = useState([])
  const [Check, setCheck] = useState(false)
  const [Search, setSearch] = useState({})
  const [SearchData, setSearchData] = useState({})
  const SearchByName=(event)=>{
    setSearch(event.target.value)
    console.log(Search)
  }
  const SearchEvent=(event)=>{
    var Pick={
      search:Search
    }
    fetch("http://localhost:5000/api/Item/Search", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(Pick)
    })
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      console.log(data)
      setSearchData(data)
      setCheck(1)
    })
  }
  useEffect(()=>{
    SearchEvent()
  },[Search])
  useEffect(() => {
    fetch("http://localhost:5000/api/Item/GetAll", {
      method: "post"
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setItem(data)
        setCheck(true)
      })

  }, [])
  useEffect(() => {
    console.log(Items)

  }, [Items])
  return (
    <>
      <SideBar />

      <div className='ViewBills_OutLine'>
        <Image/>
      </div>
      <div className='ViewBills_OutLine_Real'>
        <div className='ViewBills_OutLine_Real_Inside'>
          <div className='For_Search'>
            <div className='For_Search_Inside'>
              <input type='text' className='Search_Text' placeholder='Search By Name'onChange={SearchByName}/>
            </div>
          </div>
          <div className='ViewBills_OutLine_Real_Inside_Container'>
            {Check === true ? Items.map((res) => {
              return (
                <div className='ViewBills_OutLine_Real_Data_Container'>
                  <div className='ViewBills_OutLine_Real_Data_Container_Name'>
                    {res.name}
                  </div>
                  <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                    Price : {res.price}
                  </div>
                  <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                    Quantatiy : {res.totel}
                  </div>
                </div>)
            }) : null
            }
            {Check === 1 ? SearchData.map((res) => {
              return (
                <div className='ViewBills_OutLine_Real_Data_Container'>
                  <div className='ViewBills_OutLine_Real_Data_Container_Name'>
                    {res.name}
                  </div>
                  <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                    Price : {res.price}
                  </div>
                  <div className='ViewBills_OutLine_Real_Data_Container_Price'>
                    Quantatiy : {res.totel}
                  </div>

                </div>)
            }) : null

            }
          </div>
        </div>
      </div>
    </>
  )
}
