import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetPlacesDetails } from '../../service/GlobalApi'
import { PHOTO_REF_URL } from '../../service/GlobalApi'
import { Link } from 'react-router-dom'


function UserTripCardItem({ trip }) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        trip && GetPlacePhotos()
    }, [trip])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlacesDetails(data).then(resp => {


            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(photoUrl)

        }).catch(err => {
            console.log(err)
        })
    }


  return (
    <Link to={`/view-trip/${trip?.id}`}>    
    
    
    <div className='cursor-pointer hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} alt='trip' className='object-cover rounded-xl h-[220px] w-full' />
        <div>
            <h2 className='text-lg font-bold'>📍 {trip?.userSelection?.location?.label}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.nofdays} Days trip with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>

    </Link>
  )
}

export default UserTripCardItem