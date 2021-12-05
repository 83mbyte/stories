import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"

const BASEURL = 'https://stories-8a67d-default-rtdb.firebaseio.com';
//TODO common function to work with responces at our api . 
/* if (resp.status === 200) {
    return resp.json();
}
return 'error' */



export const authAPI = {

    loginUserAccount(auth, email, password) {
        return signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                return { userId: user.uid, email: user.email, accessToken: user.accessToken }

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode +' - '+errorMessage);
            })
    },

    registerUserAccount(auth, email, password, name, about) {
        let personObject;

        const addUserToDb = async (data, accessToken = null, publ) => {
            let url = `${BASEURL}/_private/users.json/?auth=${accessToken}`

            if (publ) {
                url = `${BASEURL}/publ/users.json/?auth=${accessToken}`;
                data[Object.keys(data)].email = '...';

            }
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)

            });

            if (response.status === 200) {
                return response.json();
            }

            return 'error';
        }
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (user) {
                    let userId = user.uid;
                    let token = user.accessToken;
                    personObject = { [userId]: { name, about, userId, avatar: '/images/personDefault.jpg', email } };
                    //add user
                    addUserToDb(personObject, token);

                    //add user to public
                    addUserToDb(personObject, token, true);

                    return {userId, email, token};
                }
                // ...
                return null;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('ErrorCode: ' + errorCode);
                console.log('ErrorMessage: ' + errorMessage);
                // ..
            });

    },

    logOut(auth) {
        
        return signOut(auth).then(() => {
            // Sign-out successful.
            console.log('SignOut successful')
        }).catch((error) => {
            // An error happened.
            console.log('Error during SignOut - '+error);
        });
    },
    

}