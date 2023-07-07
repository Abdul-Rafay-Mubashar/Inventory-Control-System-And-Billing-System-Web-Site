import React from 'react'
import { Link } from 'react-router-dom';



var i=0;
var j=0;
export default function SideBar() {
    
    const Slide=()=>{
        if(j==0)
        {
            document.getElementsByClassName("SlidBar_Container")[0].style.display="flex"
            var cle=setInterval(() => {
                i++;
                document.getElementsByClassName("SlidBar_Container")[0].style.width=i+"%";
                if(i===40)
                {
                    clearInterval(cle)
                    j=1
                }
            }, 1);
        }
        else
        {
            var cle=setInterval(() => {
                i--;
                document.getElementsByClassName("SlidBar_Container")[0].style.width=i+"%";
                if(i===0)
                {
                    clearInterval(cle)
                    document.getElementsByClassName("SlidBar_Container")[0].style.display="none"

                    j=0
                }
            }, 1);
        }

    }
  return (
    <>
    <div className='SliderBar_Outline'>
      <div className='SliderBar_Outline_InSide'>
        <button className='SlideBar_Button 'onClick={Slide}>
            <img src='https://icons.veryicon.com/png/o/miscellaneous/general-icon-library/menu-bar-1.png' className='SlideBar_Button_Pic'/>
        </button>
      </div>
    </div>
    <div className='SlidBar_Container'>
        <div className='SlidBar_Container_Inside'>
            <Link to="/" className='SideBar_Component'>
                Add Item
            </Link>
            <Link to="/UpdateItem" className='SideBar_Component'>
                Update Item
            </Link>
            <Link to="/ViewBills" className='SideBar_Component'>
                View All Items
            </Link>
            <Link to="/AddCustomer" className='SideBar_Component'>
                Add Bill
            </Link>
            <Link to="/SearchByPhone" className='SideBar_Component'>
                Search Bill By Phone
            </Link>
            <Link to="/SearchByEmail" className='SideBar_Component'>
                Search Bill By Email
            </Link>
            <Link to="/SearchByName" className='SideBar_Component'>
                Search Bill By Name
            </Link>
            <Link to="/SearchByID" className='SideBar_Component'>
                Search Bill By ID
            </Link>
        </div>
    </div>
    </>
  )
}

