import React, { useEffect } from 'react'
import { useState } from 'react'
import RedError from './RedError'
import GreenError from './GreenError'
import SideBar from './SideBar'
import Image from './Image';
import Slider from './Slider';
import Loading from './Loading'



export default function AddNewInventry() {
    // var arr=['https://st.depositphotos.com/1007373/3908/i/450/depositphotos_39089807-stock-photo-cliffs-of-moher-at-sunset.jpg','https://st3.depositphotos.com/2550635/19234/i/600/depositphotos_192341498-stock-photo-neist-point-lighthouse-on-rocky.jpg','https://i.pinimg.com/550x/fc/f4/d7/fcf4d7b1383623ed23a6b57e90d230a4.jpg']
    // var i=0;
    const [Pic, setPic] = useState(null)
    const [Id, setId] = useState(null)
    const [name, setName] = useState(null)
    const [quantatiy, setQuantaty] = useState(null)
    const [price, setPrice] = useState(null)
    const [error, setError] = useState(null)
    const [pass, setPass] = useState(null)
    const [CheckForError, setCheckForError] = useState(false)
    const [Load, setLoad] = useState(false)
    // var j=100
    // function OneSlide()
    // {
    //     i++;
    //     document.getElementsByClassName('ViewBill_Slider')[0].style.marginLeft="-"+i+"%"
    //     if(i===j)
    //     {
    //         j=j+100;
    //         clearInterval(cle)
    //     }
    // }
    // var  cle;
    // function Slider(){
    //     cle=setInterval(OneSlide,1)
    //     if(i===200)
    //     {
    //         i=-100
    //         j=0
    //     }
    // }
    //     var clw=setInterval(Slider,3000)


    const ADDItem = async () => {
        setLoad(true)
        setCheckForError(false)
        setError(false)
        const Add = {
            name: name,
            price: price,
            totel: quantatiy,
            item_id: Id
        }
        const SendNewItem = await fetch("http://localhost:5000/api/Item/ADD", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Add)
        })
        const response = await SendNewItem.json()
        console.log(response)
            setLoad(false)

        if (response.errors === undefined) {
            setPass(response)
            console.log(pass)
            setCheckForError(1)
            // setTimeout(() => {
                // setCheckForError(false)
                document.getElementsByClassName("AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper")[0].value=""
                document.getElementsByClassName("AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper")[1].value=""
                document.getElementsByClassName("AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper")[2].value=""
                document.getElementsByClassName("AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper")[3].value=""
            // }, 2000);
        }
        else
        {
            if (response.errors.msg === undefined) { 
                setError(response.errors[0].msg)
                setCheckForError(true)
                // setTimeout(() => {
                //     setCheckForError(false)
                // }, 2000);
            }  
            else{
                setError(response.errors.msg)
                setCheckForError(true)
                // setTimeout(() => {
                //     setCheckForError(false)
                // }, 2000);
            }
        }
    }
    return (
        <>
        <SideBar/>
            <div className='AddNewInventry_Outline'>
                {/* <img src='https://wallpapers.com/images/featured/3ao0esn9qknhdudj.jpg' className='AddNewInventry_Outline_Pic'>

                </img> */}
                <Image/>

            </div>
            <div className='AddNewInventry_Outline_Real'>
                {CheckForError === 1 ?<GreenError msg={pass}/> : CheckForError === true ? <RedError msg={error} /> : null}

                <div className='AddNewInventry_Outline_Inside'>
                    <div className='AddNewInventry_Outline_Inside_Part1'>
                        <div className='AddNewInventry_Outline_Inside_Part1_Slider_Outline'>
                            <div className='AddNewInventry_Outline_Inside_Part1_Slider_Component'>
                                <Slider/>
                            </div>

                        </div>


                    </div>
                    <div className='AddNewInventry_Outline_Inside_Part2'>
                        <div className='AddNewInventry_Outline_Inside_Part2_Inside'>
                            <div className='AddNewInventry_Outline_Inside_Part2_Inside_Heading'>
                                Add New Item
                            </div>
                            <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component'>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Heading'>
                                    Alot ID
                                </div>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input'>
                                    <input type='text' className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper' onChange={(event) => { setId(event.target.value) }} placeholder='Alot New ID'>

                                    </input>
                                </div>
                            </div>
                            <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component'>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Heading'>
                                    Name
                                </div>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input'>
                                    <input type='text' className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper' onChange={(event) => { setName(event.target.value) }} placeholder='Name'>

                                    </input>
                                </div>
                            </div>
                            <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Last'>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Last_Part'>
                                    <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Heading'>
                                        Price
                                    </div>
                                    <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input'>
                                        <input type='text' className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper' onChange={(event) => { setPrice(event.target.value) }} placeholder='Price'>

                                        </input>
                                    </div>
                                </div>
                                <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Last_Part'>
                                    <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Heading'>
                                        Quantatiy
                                    </div>
                                    <div className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input'>
                                        <input type='text' className='AddNewInventry_Outline_Inside_Part2_Inside_Component_Input_Proper' onChange={(event) => { setQuantaty(event.target.value) }} placeholder='Quantatiy'>

                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className='Last_Button_OutLine'>
                                <button className='Last_Button' onClick={ADDItem}>
                                    ADD
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {Load===true?
                <Loading/>:null
            } 
        </>

    )
}
