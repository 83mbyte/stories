import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from "firebase/auth"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const BASEURL = 'https://stories-8a67d-default-rtdb.firebaseio.com';
 


export const authAPI = {

    loginUserAccount(auth, email, password) {
        return setPersistence(auth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 


                        if (userCredential.user != null) {
                            const user = userCredential.user;
                            return { userId: user.uid, email: user.email, accessToken: user.accessToken }
                        }
                        else {
                            return 'Not a user'
                        }
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorCode + ' - ' + errorMessage);
                    })
            })

    },

    registerUserAccount(auth, storage, email, password, name, about, twitter, facebook, instagram, linkedin, image) {

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
        const uploadFile = async (filename, accessToken) => {
            const avatarImagesRef = ref(storage, `images/avatars/${filename}`);
            const metadata = {
                contentType: image.type,
            };

            let snapshot = await uploadBytes(avatarImagesRef, image, metadata);

            return snapshot;
        }
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 

                const user = userCredential.user;
                let regDate = Date.now();
                let userId = user.uid;
                let accessToken = user.accessToken;

                if (image) {
                    //console.log('image provided..')
                    return uploadFile(userId, accessToken)
                        .then(snapshot => {

                            return getDownloadURL(ref(storage, snapshot.metadata.fullPath))
                                .then(url => {
                                    let personObject = { [userId]: { name, about, userId, avatar: url ? url : '/images/personDefault.jpg', email, dateRegistration: regDate, twitter, facebook, instagram, linkedin } };

                                    //add user
                                    addUserToDb(personObject, accessToken);

                                    //add user to public
                                    addUserToDb(personObject, accessToken, true);

                                    return [
                                        {
                                            name, about, userId, avatar: url ? url : '/images/personDefault.jpg', email, dateRegistration: regDate, twitter, facebook, instagram, linkedin
                                        },
                                        {
                                            userId,
                                            email,
                                            accessToken
                                        }
                                    ];
                                })
                        })
                }
                else {
                    //console.log('image NOT provided')
                    let personObject = { [userId]: { name, about, userId, avatar: '/images/personDefault.jpg', email, dateRegistration: regDate, twitter, facebook, instagram, linkedin } };

                    //add user
                    addUserToDb(personObject, accessToken);

                    //add user to public
                    addUserToDb(personObject, accessToken, true);

                    return [
                        {
                            name, about, userId, avatar: '/images/personDefault.jpg', email, dateRegistration: regDate, twitter, facebook, instagram, linkedin
                        },
                        {
                            userId,
                            email,
                            accessToken
                        }
                    ];
                }

            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('ErrorCode: ' + errorCode);
                console.log('ErrorMessage: ' + errorMessage);

            });

    },

    logOut(auth) {

        return signOut(auth).then(() => {
            // Sign-out successful.
            console.log('SignOut successful')
        }).catch((error) => {
            // An error happened.
            console.log('Error during SignOut - ' + error);
        });
    },


}