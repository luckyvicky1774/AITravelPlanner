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
    const [foodPhotoUrls, setFoodPhotoUrls] = useState({})

    useEffect(() => {
        place && GetPlacePhotos()
        place?.nearbyFood && GetFoodPhotos()
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
    
    const GetFoodPhotos = async () => {
        const urls = {}
        await Promise.all(
            place.nearbyFood.map(async (food, index) => {
                const data = { textQuery: food?.restaurantName }
                await GetPlacesDetails(data).then(resp => {
                    urls[index] = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                }).catch(err => console.log(err))
            })
        )
        setFoodPhotoUrls(urls)
    }


  return (

    <div className='rounded-xl mt-2'>
        {/* Place Card Item */}
        <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
            <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='w-[150px] h-[150px] rounded-xl object-cover' />

                <div>
                    <h2 className='font-bold text-lg'>📍 {place?.placeName}</h2>
                    <p className='text-sm text-primary-500'>{place?.placeDetails}</p>
                    <p className='text-sm text-gray-500'> 🎫 {place?.ticketPricing}</p>
                    <h2 className='mt-2'>🕖 {place?.duration}</h2>
                </div>

            </div>
        </Link>

        {/* Nearby Food */}
        {place?.nearbyFood?.length > 0 && (
      <div className='bg-red-50 px-3 py-2 rounded-xl'>
        <h3 className='text-sm font-semibold text-primary-700 mb-2'>🍽️ Nearby Restaurants</h3>

        <div className='flex flex-col gap-2'>
          {place.nearbyFood.map((food, index) => (
            <Link
              key={index}
              to={'https://www.google.com/maps/search/?api=1&query='+food?.restaurantName}
              target='_blank'
            >
              <div className='flex items-center gap-3 bg-white rounded-lg p-2 hover:scale-105 transition-all cursor-pointer'>
                <img src={foodPhotoUrls[index] || '/placeholder.jpg'} className='w-12 h-12 rounded-lg object-cover' />
                <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-1'>
                        <h4 className='font-medium text-sm truncate'>{food?.restaurantName}</h4>
                        <p className='text-xs text-slate-400'>· {food?.cuisine}</p>
                    </div>
                
                    <p className='text-xs text-primary-100 font-medium'>💡 Must Try: {food?.mustTry}</p>
            
                </div>
                

              </div>
            </Link>
          ))}
        </div>
      </div>
    )}



    </div>
        
  )
}

export default PlaceCardItem