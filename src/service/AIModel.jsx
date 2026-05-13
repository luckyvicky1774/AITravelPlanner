// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } = require('@google/generative-ai')
import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
}

export const chatSession= model.startChat({
    generationConfig,
    history: [
        {
            role: 'user',
            parts: [
                {
                    text: 'Generate travel plan for Location: Las Vegas, for 3 days for couple with a cheap budget, give me a hotels options list with hotel name, hotel address, price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visit in Json format'
                }
            ]
        },
        {
            role: 'model',
            parts: [
                {
                    text: `\`\`\`json
{
  "location": "Las Vegas, NV",
  "duration": "3 Days",
  "budget": "Cheap / Budget-Friendly",
  "targetAudience": "Couple",
  "hotels": [
    {
      "name": "The STRAT Hotel, Casino & Tower",
      "address": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",
      "pricePerNight": "$25 - $60",
      "imageUrl": "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
      "geoCoordinates": {
        "lat": 36.1475,
        "lng": -115.1555
      },
      "rating": 4,
      "description": "Iconic tower with the best views in Vegas. Very affordable rooms and great thrill rides at the top."
    },
    {
      "name": "Flamingo Las Vegas",
      "address": "3555 S Las Vegas Blvd, Las Vegas, NV 89109",
      "pricePerNight": "$35 - $80",
      "imageUrl": "https://images.unsplash.com/photo-1582294435773-bf096739958a?auto=format&fit=crop&q=80&w=800",
      "geoCoordinates": {
        "lat": 36.115,
        "lng": -115.1718
      },
      "rating": 3.9,
      "description": "Classic Vegas vibe in the center of the Strip. Famous for its pink neon and wildlife habitat."
    },
    {
      "name": "Ellis Island Hotel",
      "address": "4178 Koval Ln, Las Vegas, NV 89109",
      "pricePerNight": "$40 - $70",
      "imageUrl": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800",
      "geoCoordinates": {
        "lat": 36.1128,
        "lng": -115.1633
      },
      "rating": 4.2,
      "description": "A hidden gem just off the strip. Known for cheap, delicious food and its own brewery."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "placeName": "Welcome to Fabulous Las Vegas Sign",
          "placeDetails": "The quintessential photo op. It's free and iconic.",
          "imageUrl": "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.082,
            "lng": -115.1728
          },
          "ticketPricing": "Free",
          "rating": 4.7,
          "timeToVisit": "30-45 minutes",
          "bestTime": "Early morning to avoid long lines"
        },
        {
          "placeName": "Bellagio Fountains & Conservatory",
          "placeDetails": "Stunning choreographed water show and seasonal garden display.",
          "imageUrl": "https://images.unsplash.com/photo-1581347648340-84cad5f14e93?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.1129,
            "lng": -115.1765
          },
          "ticketPricing": "Free",
          "rating": 4.9,
          "timeToVisit": "1-2 hours",
          "bestTime": "Evening for the show with lights"
        },
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "Downtown Vegas featuring the Viva Vision canopy and street performers.",
          "imageUrl": "https://images.unsplash.com/photo-1526017255743-432a67e41b9d?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.1708,
            "lng": -115.1436
          },
          "ticketPricing": "Free (Zip-lining extra)",
          "rating": 4.5,
          "timeToVisit": "2-3 hours",
          "bestTime": "After 8:00 PM for the overhead light shows"
        }
      ]
    },
    {
      "day": 2,
      "activities": [
        {
          "placeName": "Red Rock Canyon National Conservation Area",
          "placeDetails": "Beautiful desert scenery and hiking trails just west of the city.",
          "imageUrl": "https://images.unsplash.com/photo-1504192806294-f25b2907406c?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.1355,
            "lng": -115.4272
          },
          "ticketPricing": "$15 per vehicle",
          "rating": 4.8,
          "timeToVisit": "3-5 hours",
          "bestTime": "Morning before it gets too hot"
        },
        {
          "placeName": "Seven Magic Mountains",
          "placeDetails": "Colorful neon desert art installation by Ugo Rondinone.",
          "imageUrl": "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 35.8384,
            "lng": -115.2708
          },
          "ticketPricing": "Free",
          "rating": 4.3,
          "timeToVisit": "45 minutes",
          "bestTime": "Sunset for amazing photos"
        }
      ]
    },
    {
      "day": 3,
      "activities": [
        {
          "placeName": "Pinball Hall of Fame",
          "placeDetails": "Over 400 pinball and arcade games. Play for quarters!",
          "imageUrl": "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.095,
            "lng": -115.171
          },
          "ticketPricing": "Free Admission (Pay to play)",
          "rating": 4.7,
          "timeToVisit": "2 hours",
          "bestTime": "Afternoon"
        },
        {
          "placeName": "Ethel M Chocolate Factory & Cactus Garden",
          "placeDetails": "Self-guided chocolate viewing and a large desert botanical garden.",
          "imageUrl": "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&q=80&w=800",
          "geoCoordinates": {
            "lat": 36.0718,
            "lng": -115.021
          },
          "ticketPricing": "Free",
          "rating": 4.4,
          "timeToVisit": "1.5 hours",
          "bestTime": "Late afternoon"
        }
      ]
    }
  ]
}
\`\`\``
                }
            ]
        }
    ]})

