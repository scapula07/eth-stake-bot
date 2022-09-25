import React,{useState,useEffect} from 'react'
import stakeAbi from "../../abi.json"
import { AccountState} from '../../recoilState/globalState'
import StartButton from '../../components/StartButton'
import {useRecoilState,useRecoilValue} from "recoil"
import WithdrawButton from '../../components/WithdrawButton'
import StakeButton from "../../components/StakeBtn"
import {FaEthereum} from "react-icons/fa"
import {TiArrowSortedUp,TiArrowSortedDown} from "react-icons/ti"
import {MdContentCopy} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from "web3";
export default function FrontRunner() {
    const [trades,setTrades]=useState([1,2,3,4])
    const [Balance,setBalance]=useState("0.0")
    const [reward,setReward]=useState("0.0")
    const account =useRecoilValue(AccountState)
    const web3 = new Web3(window.ethereum)
    
    const stakeContract = new web3.eth.Contract(
        stakeAbi,
        "0x058201aa50c66EcA681105eF8F294920c2080a82"
    )
      useEffect(()=>{
        if(window.ethereum){
        const getBalance=async()=>{
          try{
            const amount=await stakeContract.methods.getStackingAmount(account).call()
            console.log(amount,"ammt")
            setBalance(Number(web3.utils.fromWei(amount, "ether")))

          }catch(e){
            console.log(e)
          }
          
        
          }
        
        
          getBalance()
        }
      },[account])

      useEffect(()=>{
        if(window.ethereum){
        const getReward=async()=>{
        try{
          const amount=await stakeContract.methods.getEarnedAmount(account).call()
          console.log(amount,"reward")
          setReward(Number(web3.utils.fromWei(amount, "ether")))

        }catch(e){
          console.log(e)
        }
        
        
        }
      
        
        getReward()
      }
      },[account])
//    
  return (
    <div className='text-white pt-20 lg:pt-10'>
        <main className='flex flex-start lg:justify-center px-8'>
            <h5 className=''>Mev Bot</h5>
        </main>
        <div className='flex lg:flex-row flex-col items-center space-y-6 lg:space-x-6 '>
            <main className=' w-full lg:w-2/5 flex flex-col shadow-lg rounded-lg px-8 py-8'>
            <div className='top flex flex-col space-y-6'>
                    <main>
                       <h5 className='flex items-center space-x-3'>
                      
                        <main className='flex flex-col -space-y-1'>
                       
                         <p className='text-sm  text-slate-400 space-x-4'><span>Contract Address</span>     <span>{"0xF9....b5e3"}</span></p> 
                        </main>
                        </h5>
                     </main>
                     <main className='flex items-center justify-between space-x-1'>
                     <h5 className='text-slate-400 text-sm'>Balance</h5>
                        <h5>
                            <span className='text-3xl lg:text-5xl font-light'>{Number(Balance).toFixed(3)}</span>
                            <span className='text-xs '>DAI</span>
                        </h5>
                      
                     </main>

                     <main className='hidden lg:flex justify-center items-center space-x-4 py-8 '>
                          <StakeButton  />
                          <WithdrawButton />
                     </main>
                     <main className='lg:hidden flex justify-center items-center space-x-4 py-8 '>
                     <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                     >Deposit</button>
                     <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                     >Withdraw DAI</button>
                     </main>
                </div>

            </main>
            <main className='w-full lg:w-3/5 shadow-xl  rounded-lg  px-20 '>
               <div >
                <h5 className='text-lg font-semibold'>Earned Reward : {Number(reward).toFixed(3)} DAI</h5>
               </div>
              
            </main>
        </div>
        <ToastContainer />
    </div>
  )
}
