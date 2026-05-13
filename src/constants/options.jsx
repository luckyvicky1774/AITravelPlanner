export const SelectTravelList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler looking for exploration',
        icon: "👤",
        people: "1 person"
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'A couple looking for romance',
        icon: "💑",
        people: "2 people"
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A family looking for adventure',
        icon: "🏠",
        people: "3+ people"
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A group looking for fun',
        icon: "👥",
        people: "5 - 10 people"
    }
]

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs',
        icon: "🪙",
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balanced budget for a comfortable trip',
        icon: "💵",
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Maximize comfort and experience',
        icon: "💎",
    }
]

export const AI_PROMPT_OPTIONS = 'Generate Travel Plan for Location: {location}, for {days} days for {travelers} travelers with a {budget} budget, give me a hotels options(3-5) list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with 3-5 places per day with placeName, place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for {totaldays} days with each day plan with best time to visit in Json format'