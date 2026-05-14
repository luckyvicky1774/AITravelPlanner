import React, { useEffect } from 'react'
import { Button } from '../../components/ui/button'
import { IoIosSend } from 'react-icons/io'
import { GetPlacesDetails } from '../../service/GlobalApi'
import { useState } from 'react'
import { PHOTO_REF_URL } from '../../service/GlobalApi'

function InfoSection({trip}) {

    const [photoUrl, setPhotoUrl] = useState()

    useEffect(() => {
        trip && GetPlacePhotos()
    }, [trip])

    const GetPlacePhotos = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await GetPlacesDetails(data).then(resp => {


            const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[1].name)
            setPhotoUrl(photoUrl)

        }).catch(err => {
            console.log(err)
        })
    }


  return (
    <div>
        <img src={photoUrl} className='h-[400px] w-full object-cover rounded-xl' />

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                    📆  {trip?.userSelection?.nofdays} Day
                    </h2>

                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                    💸  {trip?.userSelection?.budget} Budget
                    </h2>

                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
                    👥  No. of Traveler: {trip?.userSelection?.travelers}
                    </h2>
                </div>
            </div>

            <Button>
                <IoIosSend />
            </Button>

        </div>


    </div>
  )
}

export default InfoSection