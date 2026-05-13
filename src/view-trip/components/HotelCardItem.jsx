import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetPlacesDetails } from '../../service/GlobalApi'
import { PHOTO_REF_URL } from '../../service/GlobalApi'


function HotelCardItem({hotel}) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        hotel && GetPlacePhotos()
    }, [hotel])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: hotel?.name
        }
        const result = await GetPlacesDetails(data).then(resp => {


            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(photoUrl)

        }).catch(err => {
            console.log(err)
        })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.name+','+hotel?.address} target='_blank'>
    <div className='hover:scale=105 transition-all cursor-pointer'>
        <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[200px] w-full object-cover' />
        <div className='my-2 flex flex-col gap-2'>
            <h2 className='font-medium'>{hotel?.name}</h2>
            <h2 className='text-xs text-gray-500'>📍 {hotel?.address}</h2>
            <h2 className='text-sm'>💰 {hotel?.pricePerNight} per night</h2>
            <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

        </div>
    </div>
    </Link>
  )
}

export default HotelCardItem