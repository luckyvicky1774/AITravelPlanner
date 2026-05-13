import React from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../service/firebaseConfig'
import InfoSection from '../components/InfoSection'
import { useState, useEffect } from 'react'
import Hotels from '../components/Hotels'
import PlacesToVisit from '../components/PlacesToVisit'
import Footer from '../components/Footer'
function ViewTrip() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState([])

  useEffect(() => {
    tripId && GetTripData()
  }, [tripId])
/**
 * Get the trip data from the database
 */
  const GetTripData = async () => {
    const docRef = doc(db, 'AITripPlans', tripId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log(docSnap.data())
      setTrip(docSnap.data())
    } else {
      console.log('No such document!')
    }
  }

  return (
    <div className='p-5 md:px-20 lg:px-44 xl:px-56'>
        {/* Innformation Section*/}
        <InfoSection trip={trip} />
        {/* Recommended Hotels*/}
        <Hotels trip={trip} />
        {/* Daily Plan*/}
        <PlacesToVisit trip={trip} />
        {/* Footer*/}
        <Footer trip={trip} />
    </div>
  )
}

export default ViewTrip