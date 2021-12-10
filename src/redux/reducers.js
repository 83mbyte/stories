import { actionType } from "./actions";


const storiesApp = (state = {}, action) => {

    switch (action.type) {
        case actionType.GET_INITIAL_STATE:
            console.log('action GetInitState')
            state = action.state;
            return {
                ...state,
            }
        case actionType.ADD_NEW_USER:
            console.log('ADD_NEW_USER ACTION')
            //let userId = Object.keys(action.data)[0]
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.data.userId]: {
                        ...action.data
                    }
                }
            }

        case actionType.AUTH_LOGIN:
            console.log('LOGIN ACTION')
            return {
                ...state,
                system: { ...state.system, isAuth: { ...action.data } }
            }


        case actionType.AUTH_LOGOUT:
            console.log('LOGOUT ACTION')
            return {
                ...state,
                system: {
                    ...state.system,
                    isAuth: "",
                    currentUser: ""
                }
            }


         
        case actionType.GET_USER_PROFILE_DATA:
            console.log('action called: GET_USER_PROFILE_DATA')
            return {
                ...state,
                system: {
                    ...state.system,
                    currentUser: { ...state.users[action.userId] }
                }
            }
         


        case actionType.MODIFY_PROFILE:
            console.log('MODIFY_PROFILE');
            return {
                ...state,
                system: { ...state.system, currentUser: { ...state.system.currentUser, [action.data[0]]: action.data[1] } }
            }
        case actionType.SUBMIT_MODIFY_PROFILE:
            console.log('SUBMIT_MODIFY_PROFILE');
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.payload.userId]: {
                        ...state.users[action.payload.userId],
                        name: action.payload.name,
                        about: action.payload.about
                    }
                }
            }


        case actionType.POST_ARTICLE:
            console.log('POST_ARTICLE');
            return {
                ...state,
                articles: { ...state.articles, ...action.data }
            }


        case actionType.LIKE_ARTICLE:
            console.log('LIKE_ARTICLE NEW NEW');
            return {
                ...state,
                likes: {
                    ...state.likes,
                    [action.articleId]: {
                        ...state.likes[action.articleId],
                        [action.userId]: true
                    }
                }

            }


        case actionType.UNLIKE_ARTICLE:
            console.log('UNLIKE_ARTICLE NEW  NEW');
            return {
                ...state,
                likes: {
                    ...state.likes,
                    [action.articleId]: {
                        ...state.likes[action.articleId],
                        [action.userId]: false
                    }
                }
            }


        case actionType.ADD_COUNT_ARTICLE:
            console.log('ADD_COUNT_ARTICLE');
            return {
                ...state,

                articles: {
                    ...state.articles,
                    [action.articleId]: {
                        ...state.articles[action.articleId],
                        meta: {
                            ...state.articles[action.articleId].meta,
                            views: state.articles[action.articleId].meta.views + 1
                        }
                    }
                }
            }
        case actionType.EDIT_ARTICLE:
            console.log('EDIT_ARTICLE');
            return {
                ...state,

                articles: {
                    ...state.articles,
                    [action.articleId]: {
                        ...state.articles[action.articleId],
                        [action.data[0]]: action.data[1]
                    }
                }
            }


        case actionType.DELETE_ARTICLE:
            let newState = { ...state };
            delete newState.articles[action.articleId];

            return {
                ...newState,
            }

        default:
            return { ...state };
    }

}

export default storiesApp;