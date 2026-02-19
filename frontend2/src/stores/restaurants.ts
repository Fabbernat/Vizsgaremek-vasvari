import { defineStore } from "pinia";

const restaurants = [
  { name: 'Király Risztró', description: 'Finom és friss ételek várnak minden látogatót!', image: 'src/assets/pizza-margherita.jpg', meals: [
    { name: 'Margherita Pizza', description: 'Friss paradicsom, mozzarella és bazsalikom', price: 1500 },
    { name: 'Caesar Saláta', description: 'Ropogós saláta csirkével és krutonnal', price: 1200 },
    { name: 'Spaghetti Carbonara', description: 'Klasszikus olasz tészta szalonnával és tojással', price: 1300 }
  ] },
  { name: 'Pizza Mester', description: 'A legjobb pizzák a városban, friss alapanyagokból!', image: 'src/assets/hamburger.jpg', meals: [
    { name: 'Pepperoni Pizza', description: 'Szaftos pepperoni és olvadt sajt', price: 1600 },
    { name: 'Hawaii Pizza', description: 'Ananász és sonka egy különleges kombinációban', price: 1700 },
    { name: 'Vegetáriánus Pizza', description: 'Friss zöldségek és sajt egy egészséges választás', price: 1400 }
  ]
  },
  { name: 'Sushi Szamuráj', description: 'Autentikus japán sushi, amit imádni fogsz!', image: 'src/assets/caesar-salad.jpg', meals: [
    { name: 'California Roll', description: 'Rák, avokádó és uborka egy finom tekercsben', price: 2000 },
    { name: 'Spicy Tuna Roll', description: 'Fűszeres tonhal és avokádó egy ízletes kombinációban', price: 2200 },
    { name: 'Salmon Nigiri', description: 'Friss lazac egy szelet rizs tetején', price: 1800 }
  ] }
];


export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    restaurants: restaurants,
    selectedRestaurant: null as { name: string; description: string; image: string; meals: any[]; } | null,
    }),
    actions: {
        addRestaurant(restaurant: { name: string; description: string; image: string; meals: any[] }) {
            restaurants.push(restaurant);
        },
        showRestaurant(restaurant: {
         name: string; description: string; image: string;  meals: any[];
        }) {
          this.selectedRestaurant = restaurant;
          return restaurant.meals;
        }
    }
});

