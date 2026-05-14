import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const getTimeSlotColor = (timeSlot) => {
    switch (timeSlot) {
        case 'morning': return 'bg-red-400'
        case 'late morning': return 'bg-yellow-400'
        case 'afternoon': return 'bg-blue-400'
        case 'evening': return 'bg-green-400'
        default: return 'bg-green-400'
    }
}



function PlacesToVisit({ trip }) {
    return (
        <div>
            <h2 className='text-xl font-bold mt-5'>Places to Visit</h2>

            <div className='mt-3'>
                {trip?.tripPlan?.itinerary?.map((plan, index) => (
                    <div key={index} className='mt-8'>

                        <div className='inline-block mb-4 px-4 py-1 bg-gray-100 rounded-full'>
                            <h2 className='font-bold text-lg'>Day {plan?.day}</h2>
                        </div>

                        <div className='relative ml-4'>
                            <div className='absolute left-[11px] top-0 bottom-0 w-0.5 bg-gray-200' />

                            {plan?.places?.map((place, idx) => (
                                <div key={idx} className='relative pl-10 pb-8 last:pb-0'>

                                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${getTimeSlotColor(place?.timeSlot)} border-2 border-primary-500 flex items-center justify-center text-xs leading-none`}></div>
                                    <p className='text-sm font-semibold text-primary-500 mb-2'>{place?.suggestedTime}</p>

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