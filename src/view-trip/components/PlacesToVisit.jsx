import React from 'react'
import PlaceCardItem from './PlaceCardItem'
function PlacesToVisit({trip}) {
  return (
    <div>
        <h2 className='text-xl font-bold'>Places to Visit</h2>


        <div>
            {trip?.tripPlan?.itinerary?.map((plan, index) => (
                <div className='mt-5'>
                        <h2 className='font-medium text-lg'>Day {plan?.day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {plan?.activities?.map((place, index) => (
                                <div className='my-3'>
                                    <h2 className='text-sm font-medium text-pink-500'>{place?.bestTime}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit