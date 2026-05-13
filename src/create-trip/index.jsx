import React, { useState, useEffect }from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input'
import { SelectBudgetOptions, SelectTravelList } from '../constants/options'
import { Button } from '../components/ui/button'
import { toast } from 'sonner'
import { AI_PROMPT_OPTIONS } from '../constants/options'
import { chatSession } from '../service/AIModel'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { FcGoogle } from 'react-icons/fc'
  import { useGoogleLogin } from '@react-oauth/google'
  import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
  import axios from 'axios'
  import { db } from '../service/firebaseConfig'
  import { setDoc, doc } from 'firebase/firestore'
  import { AiOutlineLoading3Quarters } from 'react-icons/ai'
  import { useNavigate } from 'react-router-dom'


function CreateTrip() {

    const [place, setPlace] = useState()
    const [formData, setFormData] = useState([])

    const [openDailog, setOpenDailog] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        
        setFormData({ ...formData, [name]: value })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        flow: 'implicit', 
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => {
            console.log(error)
        }
    })

    const OnGenerateTrip = async () => {


        const user = localStorage.getItem('user')
        if(!user) {
            setOpenDailog(true)
            return
        }

        if(formData?.nofdays > 7 && !formData?.location || !formData?.budget || !formData?.travelers) {
            toast("Please enter all the fields")
            return
        }

        setIsLoading(true)
        
        const FINAL_PROMPT = AI_PROMPT_OPTIONS
            .replace('{location}', formData?.location.label)
            .replace('{budget}', formData?.budget)
            .replace('{days}', formData?.nofdays)
            .replace('{travelers}', formData?.travelers)
            .replace('{totaldays}', formData?.nofdays)


        const result = await chatSession.sendMessage(FINAL_PROMPT)

        setIsLoading(false)
    
        SaveAITrip(result?.response?.text())
    }

    const SaveAITrip = async (TripData) => {

        setIsLoading(true)

        const user = JSON.parse(localStorage.getItem('user'))
        const docId = Date.now().toString();
        await setDoc(doc(db, 'AITripPlans', docId), {
            userSelection: formData,
            tripPlan: JSON.parse(TripData),
            userEmail: user?.email,
            id: docId,
        })

        setIsLoading(false)
        navigate(`/view-trip/${docId}`)

    }

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
                OnGenerateTrip();
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='text-3xl font-bold'> Tell Us About Your Trip Preferences 🌄 🌆 🏖 </h2>
            <p className='text-gray-600 text-xl mt-3'>
                We'll use this information to creatde a personalized trip plan for you.
            </p>


            <div className='mt-20 flex flex-col gap-10'>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is destination of choice? 📍</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                        selectProps={{
                                place,
                                onChange:(v) => {setPlace(v); handleInputChange('location', v)},
                        }}
                    />
                    <p className='text-gray-600 text-xl mt-3'>
                        We'll use this information to create a personalized trip plan for you.
                    </p>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How many days are you planning to stay? 🕑</h2>
                    <Input placeholder={'Ex.3'} type='number'
                        onChange={(e) => handleInputChange('nofdays', e.target.value)}/>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your budget for this trip?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectBudgetOptions.map((items, index) => (
                            <div key={index} 
                            onClick={() => handleInputChange('budget', items.title)}
                            className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget == items.title && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{items.icon}</h2>
                                <h2 className='text-lg font-bold'>{items.title}</h2>
                                <h2 className='text-gray-600 text-sm'>{items.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>Who is coming with you?</h2>
                    <div className='grid grid-cols-3 gap-5 mt-5'>
                        {SelectTravelList.map((items, index) => (
                            <div key={index} 
                            onClick={() => handleInputChange('travelers', items.people)}
                                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.travelers == items.people && 'shadow-lg border-black'}`}>
                                <h2 className='text-4xl'>{items.icon}</h2>
                                <h2 className='text-lg font-bold'>{items.title}</h2>
                                <h2 className='text-gray-600 text-sm'>{items.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

            <div className='my-15 flex justify-end'>   
                <Button
                disabled={isLoading}
                onClick={OnGenerateTrip}>
                    {isLoading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip Plan'}
                </Button>
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

export default CreateTrip