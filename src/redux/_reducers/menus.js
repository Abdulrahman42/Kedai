const initialState = {
  isLoading: true,
  dataAll: '',
  dataFood: [],
  dataDrink: [],
  dataSnack: [],
  error: null,
};

export default function menus(state = initialState, action) {
  switch (action.type) {
    case 'GET_MENUS_ALL':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MENUS_ALL_FULFILLED':
      return {
        ...state,
        isLoading: false,
        dataAll: action.payload.data,
      };
    case 'GET_MENUS_ALL_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case 'GET_MENUS_FOOD_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MENUS_FOOD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        dataFood: action.payload.data,
      };
    case 'GET_MENUS_FOOD_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case 'GET_MENUS_DRINK_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MENUS_DRINK_FULFILLED':
      return {
        ...state,
        isLoading: false,
        dataDrink: action.payload.data,
      };
    case 'GET_MENUS_DRINK_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case 'GET_MENUS_SNACK_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_MENUS_SNACK_FULFILLED':
      return {
        ...state,
        isLoading: false,
        dataSnack: action.payload.data,
      };
    case 'GET_MENUS_SNACK_REJECTED':
      return {
        ...state,
        isLoading: false,
        error: action.payload.message,
      };
    case 'UPDATE_MAKANAN':
      let datamakanan = action.menu.findIndex(y => y.id == action.payload.id);
      console.log(action.menu[datamakanan]);

      console.log(action.menufix);
      let datamakananfix = {...action.menu[datamakanan], selected: true};

      action.menu = action.menu.splice(datamakanan, 1, datamakananfix);
      let datamakananfixbanget = [...action.menufix, datamakananfix];
      // console.log(datamakananfix)
      // console.log(datamakananfixbanget)
      datamakananfixbanget.pop();
      return {
        ...state,
        dataProduk: datamakananfixbanget,
      };
    case 'FALSE_MAKANAN':
      let datamakananfalse = action.menu.findIndex(
        y => y.id == action.payload.menu_id,
      );
      console.log(action.menu[datamakananfalse]);

      console.log(action.menufix);
      let datamakananfalsefix = {
        ...action.menu[datamakananfalse],
        selected: false,
      };

      action.menu = action.menu.splice(
        datamakananfalse,
        1,
        datamakananfalsefix,
      );
      let datamakananfalsefixbanget = [...action.menufix, datamakananfalsefix];
      // console.log(datamakananfix)
      // console.log(datamakananfixbanget)
      datamakananfalsefixbanget.pop();
      return {
        ...state,
        dataProduk: datamakananfalsefixbanget,
      };
    case 'UPDATE_MINUMAN':
      let dataminuman = action.menu.findIndex(y => y.id == action.payload.id);
      console.log(action.menu[dataminuman]);
      // console.log(datamakanan)
      // console.log(action.menu)
      console.log(action.menufix);
      let dataminumanfix = {...action.menu[dataminuman], selected: true};

      action.menu = action.menu.splice(dataminuman, 1, dataminumanfix);
      let dataminumanfixbanget = [...action.menufix, dataminumanfix];
      // console.log(datamakananfix)
      // console.log(datamakananfixbanget)
      dataminumanfixbanget.pop();
      return {
        ...state,
        dataMinuman: dataminumanfixbanget,
      };
    case 'UPDATE_CEMILAN':
      let datacemilan = action.menu.findIndex(y => y.id == action.payload.id);
      let datacemilanfix = {...action.menu[datacemilan], selected: true};
      action.menu = action.menu.splice(datacemilan, 1, datacemilanfix);
      let datacemilanfixbanget = [...action.menufix, datacemilanfix];
      datacemilanfixbanget.pop();
      return {
        ...state,
        dataCemilan: datacemilanfixbanget,
      };
    case 'UPDATE_PROMO':
      let datapromoin = action.menu.findIndex(y => y.id == action.payload.id);
      console.log(action.menu[datapromoin]);
      // console.log(datamakanan)
      // console.log(action.menu)
      console.log(action.menufix);
      let datapromofix = {...action.menu[datapromoin], selected: true};

      action.menu = action.menu.splice(datapromoin, 1, datapromofix);
      let datapromofixbanget = [...action.menufix, datapromofix];
      // console.log(datamakananfix)
      // console.log(datamakananfixbanget)
      datapromofixbanget.pop();
      return {
        ...state,
        dataPromo: datapromofixbanget,
      };

    default:
      return state;
  }
}
