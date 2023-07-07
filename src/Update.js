import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import UpdateStock from './UpdateStock';
import UpdatePrice from './UpdatePrice';
import DeleteItem from './DeleteItem';
import Image from './Image';


export default function Update() {
    var i = 100
    var j = 0;
    var c=0
    const [Price, setPrice] = useState(false)
    const price = () => {
        setPrice(true)
            document.getElementsByClassName("Streacher")[0].style.height= i + "vh"
        const cle = setInterval(() => {
                i--;
                document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
                if (i === 0) {
                    j = 2
                    console.log(j,c)
                    clearInterval(cle)
                    document.getElementsByClassName("Update_Outline_Component")[0].style.display = "none"
                    document.getElementsByClassName("Update_Outline_Component1")[0].style.display = "flex"
                    return
                }
                console.log(j)
        }, 1);
    }
    const Stock = () => {
        setPrice(1)
            document.getElementsByClassName("Streacher")[0].style.height= i + "vh"
        const cle = setInterval(() => {
                i--;
                document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
                if (i === 0) {
                    j = 2
                    console.log(j,c)
                    clearInterval(cle)
                    document.getElementsByClassName("Update_Outline_Component")[1].style.display = "none"
                    document.getElementsByClassName("Update_Outline_Component1")[1].style.display = "flex"
                    return
                }
                console.log(j)
        }, 1);
    }
    const Delete = () => {
        setPrice(2)
            document.getElementsByClassName("Streacher")[0].style.height= i + "vh"
        const cle = setInterval(() => {
                i--;
                document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
                if (i === 0) {
                    j = 2
                    console.log(j,c)
                    clearInterval(cle)
                    document.getElementsByClassName("Update_Outline_Component")[2].style.display = "none"
                    document.getElementsByClassName("Update_Outline_Component1")[2].style.display = "flex"
                    return
                }
                console.log(j)
        }, 1);
    }
    const priceBack=(id)=>{
        i=0
        const clw = setInterval(() => {
            i++;
            document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
            if (i === 100) {
                j = 2
                console.log(j,c)
                document.getElementsByClassName("Update_Outline_Component")[0].style.display = "flex"
                document.getElementsByClassName("Update_Outline_Component1")[0].style.display = "none"
                setPrice(false)
                clearInterval(clw)
                return
            }
            console.log(j)
    }, 1);
    }
    const StockBack=()=>{
        i=0
        const clw = setInterval(() => {
            i++;
            document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
            if (i === 100) {
                j = 2
                console.log(j,c)
                document.getElementsByClassName("Update_Outline_Component")[1].style.display = "flex"
                document.getElementsByClassName("Update_Outline_Component1")[1].style.display = "none"
                setPrice(false)
                clearInterval(clw)
                return
            }
            console.log(j)
    }, 1);
    }
    const DeleteBack=()=>{
        i=0
        const clw = setInterval(() => {
            i++;
            document.getElementsByClassName("Streacher")[0].style.height = i + "vh"
            if (i === 100) {
                j = 2
                console.log(j,c)
                document.getElementsByClassName("Update_Outline_Component")[2].style.display = "flex"
                document.getElementsByClassName("Update_Outline_Component1")[2].style.display = "none"
                setPrice(false)
                clearInterval(clw)
                return
            }
            console.log(j)
    }, 1);
    }
    return (
        <>
            <SideBar />
            <div className='Update_Outline'>
                <div className='Update_Outline_Option'>
                    <div className='Update_Outline_Component' onClick={price}>
                        Price
                    </div>
                    <div className='Update_Outline_Component1' key={0} onClick={priceBack}>
                        Close
                    </div>
                    <div className='Update_Outline_Component'  onClick={Stock}>
                        Stock
                    </div>
                    <div className='Update_Outline_Component1' key={1} onClick={StockBack} >
                        Close
                    </div>
                    <div className='Update_Outline_Component' onClick={Delete}>
                        Delete
                    </div>
                    <div className='Update_Outline_Component1' key={2} onClick={DeleteBack} >
                        Close
                    </div>
                </div>
            </div>
            <div className='Streacher'>
                <Image/>
            </div>
            {Price === true ? <UpdatePrice /> :Price===1? <UpdateStock/>:Price===2? <DeleteItem/>:null

            }
        </>
    )
}
