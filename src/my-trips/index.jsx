import React from 'react'
import { useNavigation } from 'react-router-dom'
import { useEffect } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../service/firebaseConfig'
import { useState } from 'react'
import UserTripCardItem from './components/UserTripCardItem'



function MyTrips() {

    const navigation = useNavigation()
    const [userTrips, setUserTrips] = useState([])


    useEffect(() => {
        GetUserTrips()
    }, [])

    /**
     * Get the user trips from the database
     */
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(!user) {

            navigation('/')
            return
        }

        
        const q = query(collection(db, 'AITripPlans'), where('userEmail', '==', user?.email))
        const querySnapshot = await getDocs(q)
        setUserTrips([])
        querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data())
            setUserTrips(prevVal => [...prevVal, doc.data()])
        })
    }



  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='text-3xl font-bold'> My Trips</h2>

        <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
            {userTrips?.length > 0 ? userTrips?.map((trip, index) => (
                <UserTripCardItem trip={trip} key={index} />
            )): [1,2,3,4,5,6].map((item,index)=>{
                <div key={index} className='animate-pulse h-[220px] w-full bg-slate-200 rounded-xl'></div>
            })}
        </div>
    </div>
  )
}

export default MyTrips