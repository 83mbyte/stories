import { storage } from '../_firebase/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const BASEURL = 'https://stories-8a67d-default-rtdb.firebaseio.com';



//TODO common function to work with responces at our api . 
/* if (resp.status === 200) {
    return resp.json();
}
return 'error' */


export const API = {


    getUserProfile: async (userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/_private/users/${userId}.json/?auth=${accessToken}`)

        if (resp.status === 200) {
            return resp.json();
        }
        return 'error'
    },

    modifyProfile: async (userData, userId, accessToken) => {

        let resp = await fetch(`${BASEURL}/_private/users/${userId}.json/?auth=${accessToken}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (resp.status === 200) {
            resp = await fetch(`${BASEURL}/publ/users/${userId}.json/?auth=${accessToken}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
        }


        if (resp.status === 200) {
            return resp.json();
        }
        return 'error'

    },

    submitNewArticle: async (articleObj, accessToken) => {
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

    editArticle: async (articleObj, articleId, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/articles/${articleId}/.json/?auth=${accessToken}`, {
            method: 'PATCH',
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

    deleteArticle: async (articleId,filename, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/articles/${articleId}.json/?auth=${accessToken}`, {
            method: 'DELETE',
        });

        //delete article image from storage
        if (resp.status === 200 && (filename!=undefined && filename!=null)) {
            
            const desertRef = ref(storage, `images/articles/${filename}`);
            // Delete the file
            deleteObject(desertRef).then( ()=>{
                return resp.json();
            })
            
        }

        return 'error';
    },

    addLike: async (articleId, userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/likes/${articleId}.json/?auth=${accessToken}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ [userId]: "true" })

        });
        if (resp.status === 200) {
            return resp.json();
        }
        return 'error';

    },

    removeLike: async (articleId, userId, accessToken) => {
        let resp = await fetch(`${BASEURL}/publ/likes/${articleId}/${userId}.json/?auth=${accessToken}`,
            {
                method: 'DELETE',
            })

        if (resp.status === 200) {
            return resp;
        }
        return 'error';
    },

    incrementView: async (articleId, userId, accessToken, viewCount) => {
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

    },
    uploadImage: async (file, someId, location) => {
        const avatarImagesRef = ref(storage, `images/${location}/${someId}.${file.type.split('/')[1]}`);
        const metadata = {
            contentType: file.type,
        };

        return await uploadBytes(avatarImagesRef, file, metadata)
            .then(snapshot => {
                return getDownloadURL(ref(storage, snapshot.metadata.fullPath))
                    .then(url => {
                        return url
                    });
            });


    }

}
export default API;