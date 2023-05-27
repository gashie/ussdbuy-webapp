import {
  GET_CONTACT_FAIL,
  GET_CONTACT_REQUEST,
  GET_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
  ADD_CONTACT_REQUEST,
  ADD_CONTACT_SUCCESS,
  UPDATE_CONTACT,
  UPDATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  ADD_CONTACT_RESET,
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS
} from "./actionType";

const INIT_STATE = {
  categories:[],
  loadingcategories:false,
  catgoryerror:null,
   saveloadding: false,
   saveerror: null,
  isCatCreated:false,
  updateloadding: false,
  updateerror: null,
 isCatUpdated:false,
 isContactDelete:false,
 isContactDeleteFail:false,
};

const ContactReducer = (state = INIT_STATE, action) => {
  switch (action.type) {

       case GET_CONTACT_REQUEST: {
      return {
        ...state,
        loading: true
      };
    }
       case GET_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        updateloadding:false,
        saveloadding: false,
      };
       case GET_CONTACT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          categories:[]
        };
 
        case ADD_CONTACT_SUCCESS:
        return {
          ...state,
          isCatCreated: true,
          saveloadding: false,
          updateloadding:false
          // categories: [...state.categories, action.payload.data],
        };

        case ADD_CONTACT_FAIL:
      return {
        ...state,
        saveloadding: false,
        isCatCreated: false,
        error: action.payload,
      };
        case ADD_CONTACT_REQUEST:
        return {
          ...state,
          saveloadding: true,
        };
        case ADD_CONTACT_RESET:
          return {
            ...state,
            isCatCreated: false,
          };
        case UPDATE_CONTACT:
          return {
            ...state,
            updateloadding: true,
            saveloadding: false,
          };
        case UPDATE_CONTACT_SUCCESS:
      // console.log(state.applist.map(app =>
      //   app.id === action.payload.id
      //     ? { ...app, ...action.payload }
      //     : app
      // ));
        return {
          ...state,
          categories: state.categories.map(item =>
            item.user_id === action.payload.user_id
              ? { ...item, ...action.payload }
              : item
          ),
          isCatUpdated: true,
          updateloadding:false
        };
        case UPDATE_CONTACT_FAIL:
          return {
            ...state,
            updateerror: action.payload,
            isCatUpdated: false,
          };
          case DELETE_CONTACT_SUCCESS:
            // console.log('====================================');
            // console.log(state.categories.filter(
            //   contact => contact.user_id !== action.payload.user_id
            // ));
            // console.log('====================================');
            return {
              ...state,
              categories: state.categories.filter(
                contact => contact.user_id !== action.payload.user_id
                ),
              isContactDelete: true,
              isContactDeleteFail: false
            };
      
          case DELETE_CONTACT_FAIL:
            return {
              ...state,
              error: action.payload,
              isContactDelete: false,
              isContactDeleteFail: true
            };
      
    default:
      return { ...state };
  }
};

export default ContactReducer;
