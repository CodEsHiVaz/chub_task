import {
  GET_DATA_ERROR,
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_LOGIN_ERROR,
  GET_LOGIN_LOADING,
  GET_LOGIN_SUCCESS,
  LOGOUT,
  SET_EDIT_SUCCESS,
  SET_EDIT_ERROR,
  SET_EDIT_LOADING,
  SET_DELETE_LOADING,
  SET_DELETE_SUCCESS,
  SET_DELETE_ERROR,
  SORTING,
  GET_SEARCH_SUCCESS,
} from "../ActionType/action.type";
const gettoken = localStorage.getItem("token") | 0;

let initialstate = {
  isLoading: false,
  isError: false,
  products: [],
  loggedin: gettoken ? true : false,
  message: "fine",
  isEditable: false,
  token: gettoken,
};

export const productsreducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_DATA_LOADING:
      state = { ...state, isLoading: true, isError: false, isEditable: false };
      return { ...state };
    case GET_DATA_SUCCESS:
      state = {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false,
      };
      return { ...state };
    case GET_DATA_ERROR:
      state = { ...state, isLoading: false, isError: true };
      return { ...state };

    case GET_LOGIN_LOADING:
      state = { ...state, isLoading: true, isError: false, loggedin: false };
      return { ...state };

    case GET_LOGIN_SUCCESS:
      state = { ...state, isLoading: false, isError: false, loggedin: true };
      return { ...state };

    case GET_LOGIN_ERROR:
      state = { ...state, isLoading: false, isError: true, loggedin: false };
      return { ...state };
    case LOGOUT:
      state = { ...state, loggedin: false };
      return { ...state };
    case SET_EDIT_LOADING:
      state = { ...state, isEditable: true, isLoading: true };
      return { ...state };
    case SET_EDIT_SUCCESS:
      const newArr = state.products.map((obj) => {
        if (obj.id === action.payload.id) {
          return { ...obj, ...action.payload };
        }

        return obj;
      });

      state = {
        ...state,
        products: newArr,
        isLoading: false,
        isEditable: false,
      };
      return { ...state };
    case SET_EDIT_ERROR:
      state = { ...state, isLoading: false, isEditable: false };
      return { ...state };

    case SET_DELETE_LOADING:
      state = { ...state, isEditable: true, isLoading: true };
      return { ...state };
    case SET_DELETE_SUCCESS:
      const filterdarr = state.products.filter((elem) => elem.id !== action.id);
      state = {
        ...state,
        products: filterdarr,
        isLoading: false,
        isEditable: false,
      };
      return { ...state };
    case SET_DELETE_ERROR:
      state = { ...state, isLoading: false, isEditable: false };
      return { ...state };
    case SORTING:
      const sortrdDaat = action.val
        ? state.products.sort((a, b) => a.id - b.id)
        : state.products.sort((a, b) => b.id - a.id);
      state = { ...state, products: sortrdDaat };
      return { ...state };
    case GET_SEARCH_SUCCESS:
      state = { ...state, products: action.payload };

      if (action.searchby !== "category") {
        let newdatas = state.products.filter((elems) =>
          elems[action.searchby].includes(action.query)
        );

        state = { ...state, products: newdatas };
      } else if (action.searchby == "category" && action.query == "Clothes") {
        let newdatas = state.products.filter(
          (elems) => elems.category?.name == action.query
        );

        state = { ...state, products: newdatas };
      } else if (action.searchby == "category" && action.query == "Shoes") {
        let newdatas = state.products.filter(
          (elems) => elems.category?.name == action.query
        );

        state = { ...state, products: newdatas };
      } else if (action.searchby == "category" && action.query == "Furniture") {
        let newdatas = state.products.filter(
          (elems) => elems.category?.name == action.query
        );

        state = { ...state, products: newdatas };
      } else if (
        action.searchby == "category" &&
        action.query == "Electronics"
      ) {
        let newdatas = state.products.filter(
          (elems) => elems.category?.name == action.query
        );

        state = { ...state, products: newdatas };
      } else if (action.searchby == "category" && action.query == "Others") {
        let newdatas = state.products.filter(
          (elems) => elems.category?.name == action.query
        );

        state = { ...state, products: newdatas };
      }

      return { ...state };

    default:
      return state;
  }
};
