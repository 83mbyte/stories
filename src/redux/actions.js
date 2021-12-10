export const actionType = {
    GET_INITIAL_STATE: 'GET_INITIAL_STATE',
    TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING',
    AUTH_LOGIN: 'AUTH_LOGIN',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    ADD_NEW_USER:'ADD_NEW_USER',
    GET_USER_PROFILE_DATA: 'GET_USER_PROFILE_DATA',
    MODIFY_PROFILE: 'MODIFY_PROFILE',
    SUBMIT_MODIFY_PROFILE :'SUBMIT_MODIFY_PROFILE',
    POST_ARTICLE: 'POST_ARTICLE',
    LIKE_ARTICLE: 'LIKE_ARTICLE',
    UNLIKE_ARTICLE: 'UNLIKE_ARTICLE',
    ADD_COUNT_ARTICLE: 'ADD_COUNT_ARTICLE',
    EDIT_ARTICLE : 'EDIT_ARTICLE',
    DELETE_ARTICLE : 'DELETE_ARTICLE'
}

export const actionCreatorGetInitialState = (data) => {
    return {
        type: actionType.GET_INITIAL_STATE,
        state: data
    }
}

export const actionCreatorAuthLogin = (data) => {
    return {
        type: actionType.AUTH_LOGIN,
        data
    }
}
export const actionCreatorAddNewUser = (data) => {
    return {
        type: actionType.ADD_NEW_USER,
        data
    }

}

export const actionCreatorAuthLogout = () => {
    return { type: actionType.AUTH_LOGOUT }
}

 

export const actionCreatorGetUserData = (userId) => {
    return {
        type: actionType.GET_USER_PROFILE_DATA,
        userId
    }
}

export const actionCreatorModifyProfile = (fieldName, value) => {
    return {
        type: actionType.MODIFY_PROFILE,
        data: [fieldName, value]
    }
}

export const actionCreatorSubmitModifyProfile = (name,about,userId) => {
    return {
        type: actionType.SUBMIT_MODIFY_PROFILE,
        payload: {name,about,userId}
    }
}

export const actionCreatorPostArticle = (articleObj) => {
    return {
        type: actionType.POST_ARTICLE,
        data: articleObj
    }
}

export const actionCreatorLikeArticle = (articleId, userId) => {
    return {
        type: actionType.LIKE_ARTICLE,
        articleId, userId
    }
}

export const actionCreatorUnlikeArticle = (articleId, userId) => {
    return {
        type: actionType.UNLIKE_ARTICLE,
        articleId, userId
    }
}

export const actionCreatorViewArticle = (articleId) => {
    return {
        type: actionType.ADD_COUNT_ARTICLE,
        articleId
    }
}

export const actionCreatorEditArticle = (fieldName, value, articleId) => {
    return {
        type: actionType.EDIT_ARTICLE,
        data: [fieldName, value],
        articleId
    }
}
 
export const actionCreatorDeleteArticle  = (articleId) =>{
    return {
        type: actionType.DELETE_ARTICLE,
        articleId
    }
}




//TODO Thunk's
export const modifyUserProfileThunkCreator = (inputName, value) => {
    return (dispatch) => {

        dispatch(actionCreatorModifyProfile(inputName, value))
    }
}

export const getUserProfileThunkCreator = (userId, accessToken) => {
    return async (dispatch) => {

        fetch(`https://stories-8a67d-default-rtdb.firebaseio.com/_private/users/${userId}.json/?auth=${accessToken}`)
            .then(resp => {
                if (resp.status === 200) {
                    return resp.json();
                }
                return 'error'
            }).then(data => {

                if (data !== 'error') {
                    dispatch(actionCreatorGetUserData(data));

                }
            })
    }
}