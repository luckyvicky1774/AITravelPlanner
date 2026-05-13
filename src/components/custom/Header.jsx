import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useNavigation } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { FcGoogle } from "react-icons/fc"
import { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios'

const Header = () => {

    const user = JSON.parse(localStorage.getItem('user'))
    const [openDailog, setOpenDailog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const login = useGoogleLogin({
        flow: 'implicit', 
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => {
            console.log(error)
        }
    })

    const GetUserProfile = (tokenInfo) => {

        axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: 'application/json',
                },
            }
        ).then((res) => {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data));
                setOpenDailog(false);
                window.location.reload();
            }).catch((err) => {
                console.log(err)
            })
    }

    
    useEffect(() => {
        
    }, [])



  return (
    <div className='p-3 flex justify-between items-center px-5'>
        {/* <img src='/logo.svg' alt='logo' />  */}

        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <img src='/logo.svg' alt='logo' className='w-15 h-15' />
                <div className='flex flex-col'>
                <span className='text-sm font-medium leading-tight'>AI Trip Planner</span>
                <span className='text-xs text-gray-400 leading-tight'>Plan smarter, travel better</span>
                </div>
            </div>
        </div>


        <div>
        {user ? 
            <div className='flex items-center gap-3'>

                < a href='/create-trip'>
                <Button variant='outline' className='rounded-full'>Create Trip</Button>
                </a>

                < a href='/my-trips'>
                <Button variant='outline' className='rounded-full'>My Trips</Button>
                </a>
                
                <Popover>
                <PopoverTrigger asChild>
                   <img src={user?.picture} alt='user' className='w-[35px] h-[35px] rounded-full' />
                </PopoverTrigger>
                <PopoverContent>
                    <h2 className='cursor-pointer' onClick={()=>{
                        googleLogout();
                        localStorage.clear();
                        window.location.reload();
                    }}>Logout</h2>
                </PopoverContent>
                </Popover>

                </div> 
                : <Button onClick={()=>setOpenDailog(true)}>Get Started</Button>}
        </div>

        <Dialog open={openDailog} onOpenChange={setOpenDailog}>
            
            <DialogContent>
                <DialogHeader>
                <DialogTitle><VisuallyHidden>login</VisuallyHidden></DialogTitle>
                <DialogDescription asChild>
                    <div>
                        <img src="/logo.svg" alt="logo" />
                        <h2 className='text-lg font-bold mt-3'>
                            Login with your Google account
                        </h2>
                        <p>
                            We'll use your email to create your trip plan.
                        </p>
                        <Button 
                        disabled={isLoading}
                        onClick={login}
                        className='w-full mt-5 flex items-center justify-center gap-4'> <FcGoogle className='h-7 w-7' />
                            Sign In With Google
                        </Button>
                    </div>
                    
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
            </Dialog>
                    

    </div>





  )
}

export default Header