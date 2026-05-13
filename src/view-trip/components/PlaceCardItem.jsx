import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import {FaMapLocationDot} from 'react-icons/fa6'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetPlacesDetails } from '../../service/GlobalApi'
import { PHOTO_REF_URL } from '../../service/GlobalApi'

function PlaceCardItem({place}) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        place && GetPlacePhotos()
    }, [place])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlacesDetails(data).then(resp => {

            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name)
            setPhotoUrl(photoUrl)

        }).catch(err => {
            console.log(err)
        })
    }


  return (
        <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[150px] h-[150px] rounded-xl object-cover' />

                <div>
                    <h2 className='font-bold text-lg'>📍 {place?.placeName}</h2>
                    <p2 className='text-sm text-gray-500'>{place?.placeDetails}</p2>
                    <h2 className='mt-2'>🕖 {place?.timeToVisit}</h2>
{/* 
                    <Button size='sm'>
                        <FaMapLocationDot />    
                    </Button>
                 */}

                </div>

            </div>
        </Link>
  )
}

export default PlaceCardItem