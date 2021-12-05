export const actionType = {
    GET_INITIAL_STATE: 'GET_INITIAL_STATE',
    TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING',
    AUTH_LOGIN: 'AUTH_LOGIN',
    AUTH_LOGOUT: 'AUTH_LOGOUT',
    GET_USER_PROFILE_DATA: 'GET_USER_PROFILE_DATA',
    MODIFY_PROFILE: 'MODIFY_PROFILE',
    POST_ARTICLE: 'POST_ARTICLE',
    LIKE_ARTICLE: 'LIKE_ARTICLE',
    UNLIKE_ARTICLE: 'UNLIKE_ARTICLE',
    ADD_COUNT_ARTICLE: 'ADD_COUNT_ARTICLE'
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

export const actionCreatorAuthLogout = () => {
    return { type: actionType.AUTH_LOGOUT }
}

export const actionCreatorGetUserData = (data) => {
    return {
        type: actionType.GET_USER_PROFILE_DATA,
        userData: { ...data }
    }
}

export const actionCreatorModifyProfile = (fieldName, value) => {
    return {
        type: actionType.MODIFY_PROFILE,
        data: [fieldName, value]
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