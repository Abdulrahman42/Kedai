import axios from 'axios'

import env from '../../env/env'

export const getMenusAll = () => {
    return {
      type:'GET_MENUS_ALL',
      payload : axios.get(env.host + "menus")
    }
  }

export const getMenuFood = () => {
  return{
    type: "GET_MENUS_FOOD",
    payload:axios.get(env.host + "menus/1" )
  }
}

export const getMenuDrink = () => ({
    type: "GET_MENUS_DRINK",
    payload:axios.get(env.host + "menus/2" )
})

export const getMenuSnack = () => ({
    type: "GET_MENUS_SNACK",
    payload:axios.get(env.host + "menus/3" )
})

