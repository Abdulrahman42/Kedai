import axios from 'axios'

import env from '../../env/env'

export const getFood = () => ({
    type: "GET_FOOD",
    payload: axios.get(env.host + "menus/" + 1)
})

export const getDrink = () => ({
    type: "GET_DRINK",
    payload: axios.get(env.host + "menus/" + 2)
})

export const getDessert = () => ({
    type: "GET_DESSERT",
    payload: axios.get(env.host + "menus/" + 3)
})

export const updateFood = (item, food, foodfix) => ({
    type: "UPDATE_FOOD",
    payload: item,
    food: food,
    foodfix: foodfix
})

export const updateDrink = (item, drink, drinkfix) => ({
    type: "UPDATE_DRINK",
    payload: item,
    drink: drink,
    drinkfix: drinkfix
})

export const updateDessert = (item, dessert, dessertfix) => ({
    type: "UPDATE_DESSERT",
    payload: item,
    dessert: dessert,
    dessertfix: dessertfix
})