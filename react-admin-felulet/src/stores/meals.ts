import { useState } from "react";

const meals = [

    { name: 'Margherita Pizza', description: 'Friss paradicsom, mozzarella és bazsalikom', price: 1500 },
    { name: 'Caesar Saláta', description: 'Ropogós saláta csirkével és krutonnal', price: 1200 },
    { name: 'Spaghetti Carbonara', description: 'Klasszikus olasz tészta szalonnával és tojással', price: 1300 },
    { name: 'Pepperoni Pizza', description: 'Szaftos pepperoni és olvadt sajt', price: 1600 },
    { name: 'Hawaii Pizza', description: 'Ananász és sonka egy különleges kombinációban', price: 1700 },
    { name: 'Vegetáriánus Pizza', description: 'Friss zöldségek és sajt egy egészséges választás', price: 1400 },
    { name: 'California Roll', description: 'Rák, avokádó és uborka egy finom tekercsben', price: 2000 },
    { name: 'Spicy Tuna Roll', description: 'Fűszeres tonhal és avokádó egy ízletes kombinációban', price: 2200 },
    { name: 'Salmon Nigiri', description: 'Friss lazac egy szelet rizs tetején', price: 1800 }

];

export const useMealsStore = useState({
    state: () => ({
        meals: meals
    }),
    actions: {
        addMeal(meal: { name: string; description: string; price: number }) {
            meals.push(meal);
        }
    }
});