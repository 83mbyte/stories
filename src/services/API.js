const BASEURL = 'https://stories-8a67d-default-rtdb.firebaseio.com';


//TODO common function to work with responces at our api . 
/* if (resp.status === 200) {
    return resp.json();
}
return 'error' */


export const API = {
    

    getUserProfile : async (userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/_private/users/${userId}.json/?auth=${accessToken}`)

        if (resp.status === 200) {
            return resp.json();
        }
        return 'error'
    },

    submitNewArticle: async(articleObj, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/articles.json/?auth=${accessToken}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(articleObj)

        });
        if (resp.status === 200) {
             
            return resp.json();
        }

        return 'error';
    },

    addLike: async (articleId, userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/likes/${articleId}.json/?auth=${accessToken}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({[userId]:"true"})

        });
        if (resp.status === 200) {
            return resp.json();
        }
        return 'error';

    },
    
    removeLike: async(articleId, userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/likes/${articleId}/${userId}.json/?auth=${accessToken}`,
        {
            method: 'DELETE',
        })

        if (resp.status === 200) {
            return resp;
        }
        return 'error';
    },
     
    incrementView: async(articleId, userId, accessToken, viewCount) => {
        let resp = await fetch(`${BASEURL}/publ/articles/${articleId}/meta/views.json/?auth=${accessToken}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(viewCount)

        });
        if (resp.status === 200) {
            return resp.json();
        }
        return 'error';

    }
}
export default API;