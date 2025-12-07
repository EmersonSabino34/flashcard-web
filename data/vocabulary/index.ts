import airport from "./airport.json";
import directions from "./directions.json";
import doctor from "./doctor.json";
import greetings from "./greetings.json";
import hotel from "./hotel.json";
import pharmacy from "./pharmacy.json";
import restaurant from "./restaurant.json";
import shopping from "./shopping.json";
import { VocabularyCard, VocabularyCategory } from "@/types";

export const vocabularyCategories: Array<{
  id: VocabularyCategory;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    id: "greetings",
    title: "Greetings",
    description: "Introduce yourself, be polite, and connect quickly.",
    icon: "👋"
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Ask for sizes, deals, and shop with confidence.",
    icon: "🛍️"
  },
  {
    id: "restaurant",
    title: "Restaurants",
    description: "Order meals, ask for recommendations, pay smoothly.",
    icon: "🍽️"
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description: "Explain symptoms and understand prescriptions.",
    icon: "💊"
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Describe your health and follow medical advice.",
    icon: "🩺"
  },
  {
    id: "hotel",
    title: "Hotels",
    description: "Check in, find amenities, and solve issues.",
    icon: "🏨"
  },
  {
    id: "airport",
    title: "Airports",
    description: "Board flights, handle baggage, and avoid stress.",
    icon: "✈️"
  },
  {
    id: "directions",
    title: "Directions",
    description: "Ask for help and navigate Brazilian cities.",
    icon: "🗺️"
  }
];

export const vocabularyMap: Record<
  VocabularyCategory,
  VocabularyCard[]
> = {
  airport,
  directions,
  doctor,
  greetings,
  hotel,
  pharmacy,
  restaurant,
  shopping
};
