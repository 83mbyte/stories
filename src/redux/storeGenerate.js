
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { actionCreatorGetInitialState } from './actions';
import storiesApp from '../redux/reducers';

export function getAndSetInitialState(store) {

  // get state from server
  return fetch('https://stories-8a67d-default-rtdb.firebaseio.com/publ.json')
    .then(resp => {

      /* launch loader dispatch action */
      //store.dispatch(actionCreatorToggleIsFetching(true))

      if (resp.status === 200) {
        return resp.json();
      } else {
        return 'Error'
      }
    }).then(resp => {
      //set state
      store.dispatch(actionCreatorGetInitialState(resp));

      /* remove loader - dispatch action */
      // store.dispatch(actionCreatorToggleIsFetching(false));
    });
}


//to use Redux tool in Browser
const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);


let reducersObject = {

  db: storiesApp
};

let reducer = combineReducers(reducersObject);
//let store = createStore(reducer,applyMiddleware(thunk));
let store = createStore(reducer, enhancer);  //to use Redux tool in Browser

getAndSetInitialState(store);

export default store;