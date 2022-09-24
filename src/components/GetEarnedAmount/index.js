import React,{useState} from 'react'
import stakeAbi from "../../abi.json"
import { AccountState} from '../../recoilState/globalState'
import {useRecoilState,useRecoilValue} from "recoil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import {AiOutlineCloseCircle } from "react-icons/ai"
const Web3 =require("web3")



export default function GetEarnedAmount() {
    const account =useRecoilValue(AccountState)
    const web3 = new Web3(window.ethereum)
    const [trigger,setTrigger] =useState(false)
    const [deposit,setDeposit] =useState("")
    const stakeContract = new web3.eth.Contract(
        stakeAbi,
        "0x058201aa50c66EcA681105eF8F294920c2080a82"
    )
    console.log(web3)
  
    const getEarnedAmount=async()=>{
        console.log("starting trade")

       if(account.length===0) return toast.error("Connect to wallet");
       const _amount=web3.utils.toWei(deposit,'ether')
        try{
            const res =await stakeContract.methods.getEarnedAmount(account).send({from:account})
            console.log(res)
            toast.success(" successful!");
        }catch(e){
            console.log(e)
            toast.error("Something went wrong!");
        }

        setTrigger(false)
       
      }
    console.log(account,"startpae")
  return (
    <>
    <div>
        
        <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
         onClick={()=>setTrigger(true)}
        >Stake</button>
    </div>

    <Modal trigger={trigger} cname="h-44 w-1/4 shadow rounded-lg py-4 px-4 flex flex-col ">
             <main className='flex justify-end'>
                 <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
                </main>
            <div  className='flex flex-col items-center justify-center space-y-8'>
                    <input className='w-1/2 bg-black border border-slate-900 text-white rounded-md h-8 px-2 text-xs'
                    placeholder='Amount'
                    onChange={(e)=>setDeposit(e.target.value)}
                />
                <button className='border border-slate-700 w-1/2 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                onClick={getEarnedAmount}
                >Continue</button>
            </div>
          
 
     </Modal>

    </>
  )
}
