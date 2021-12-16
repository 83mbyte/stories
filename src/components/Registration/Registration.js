import { auth, storage } from '../../_firebase/firebase';

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';

import s from './Registration.module.css';
import { Modal, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import { actionCreatorAuthLogin, actionCreatorAddNewUser, actionCreatorGetUserData, actionCreatorToggleIsFetching } from '../../redux/actions';
import { authAPI } from '../../services/authAPI';
import Loader from '../common/Loader';



const Registration = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState([''])

    const ModalMessage = (props) => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{message[0]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message[1]}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const handleClose = () => {
        setShow(false);
        navigate('/');
    };

    const onSubmitForm = (data) => {

        props.toggleFetching(true);
        let { email, password, fullname, about, file, twitter, facebook, instagram, linkedin } = data;

        if (file === undefined) {
            file = null
        } else {
            file = file[0]
        }

        registerNewUser(email, password, fullname, about, twitter, facebook, instagram, linkedin, file);
    }

    const registerNewUser = async (email, password, fullname, about, twitter, facebook, instagram, linkedin, file) => {
        let newUser = await authAPI.registerUserAccount(auth, storage, email, password, fullname, about, twitter, facebook, instagram, linkedin, file);
        props.toggleFetching(false);
        if (newUser && newUser[1] !== 'error' && newUser[1] != undefined && newUser[1] != null) {

            setMessage(["Registration complete!", "Thank you for registration!"]);
            setShow(true);
            props.loginUser(newUser[0], newUser[1]);
            props.getUserProfileData(newUser[1].userId);

        } else {
            setMessage(["Warning!", "Registration was NOT completed.. Try again."]);
            setShow(true);

        };
    }

    const validateFile = (files) => {
        if (files.length > 0) {
            let allowedType = ['jpg', 'png', 'jpeg', 'gif'];
            if (files[0].size > 100000) {
                return 'Too big file.. '
            }
            if (!allowedType.includes(files[0].type.split('/')[1])) {
                return 'Not an image..'
            }
        } else {
            return true
        }
    }

    return (
        <>
            <div className="row justify-content-center mb-5 pb-2">
                <div className="col-md-7 heading-section text-center ">
                    <h2 className="mb-4">Create your account.</h2>
                    <p>Feel the form with your email, password, etc.</p>
                </div>
            </div>
            <div className="text-center">
                {!props.isFetching
                    ? <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Email:</label></div>
                            <input type="email" placeholder="ex.: email@example.com" id="email"
                                {...register('email',
                                    {
                                        required: 'This is required.',
                                        pattern: {
                                            value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
                                            message: 'Provide a correct email.'
                                        }
                                    })}
                            />
                            {errors.email && <div className={s.errorMessage}>{errors.email.message}</div>}

                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Password:</label></div>
                            <input type="password" placeholder="Password" id="password"
                                {
                                ...register('password',
                                    {
                                        required: 'This is required.',
                                        minLength: { value: 4, message: 'Min.length: 4' }
                                    })
                                }
                            />
                            {errors.password && <div className={s.errorMessage}>{errors.password.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Name:</label></div>
                            <input type="text" placeholder="ex: John Doe" id="fullname"
                                {
                                ...register('fullname', {
                                    required: 'This is required.',
                                    pattern: {
                                        value: /^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]*){0,2}$/,
                                        message: 'Provide your name. (ex.: John Dowee)'
                                    }
                                })
                                }
                            />
                            {errors.fullname && <div className={s.errorMessage}>{errors.fullname.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Profile Photo:</label></div>
                            <input type="file"
                                {
                                ...register('file', {
                                    validate: files => validateFile(files)
                                })
                                }
                            />
                            {errors.file && <div className={s.errorMessage}>{errors.file.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>A few words about You:</label></div>
                            <textarea placeholder="Text About You" rows={3} cols={18} id="about"
                                {
                                ...register('about', {
                                    minLength: {
                                        value: 5,
                                        message: 'Min.length 5'
                                    }
                                })
                                }
                            />
                            {errors.about && <div className={s.errorMessage}>{errors.about.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Twitter:</label></div>
                            <input type="text" placeholder="Link to your Twitter" id="twitter"
                                {
                                ...register('twitter',
                                    {
                                        pattern: {
                                            value: /(https:\/\/twitter.com\/(?![a-zA-Z0-9_]+\/)([a-zA-Z0-9_]+))/,
                                            message: 'Provide a correct link to your Twitter profile (https://twitter.com/your_account)'
                                        }
                                    })
                                }
                            />
                            {errors.twitter && <div className={s.errorMessage}>{errors.twitter.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Facebook:</label></div>
                            <input type="text" placeholder="Link to your Facebook" id="facebook"
                                {
                                ...register('facebook',
                                    {
                                        pattern:
                                        {
                                            value: /(https:\/\/)+(www\.)?(facebook|fb|m\.facebook)\.(com|me)\/([a-z0-9_\.]+)/i,
                                            message: 'Provide a correct link to your Facebook profile (ex.: https://facebook.com/profile_name)'

                                        }
                                    })
                                }
                            />
                            {errors.facebook && <div className={s.errorMessage}>{errors.facebook.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Instagram:</label></div>
                            <input type="text" placeholder="Link to your Instagram" id="instagram"
                                {
                                ...register('instagram',
                                    {
                                        pattern: {
                                            value: /(^https:\/\/(www\.)?instagram.com\/)[A-Za-z0-9_.]+/,
                                            message: 'Provide a correct link to your Instagram profile (ex.: https://instagram.com/profile_name)'
                                        }
                                    })
                                }
                            />
                            {errors.instagram && <div className={s.errorMessage}>{errors.instagram.message}</div>}
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Linkedin:</label></div>
                            <input type="text" placeholder="Link to your LinkedIn" id="linkedin"
                                {
                                ...register('linkedin',
                                    {
                                        pattern: {
                                            value: /(^https:\/\/(www\.)?linkedin.com\/)[A-Za-z0-9_.]+/,
                                            message: 'Provide a correct link to your Linkedin profile (ex.: https://linkedin.com/profile_name)'
                                        }
                                    })
                                }
                            />
                            {errors.linkedin && <div className={s.errorMessage}>{errors.linkedin.message}</div>}
                        </div>
                        <div>
                            <input type="submit" value="Register Me"></input>
                        </div>
                    </form>
                    : <Loader />}

            </div>
            <ModalMessage />

        </>
    );
}


const mapStateToProps = (state) => {
    return {
        isLogged: state.db.system ? state.db.system.isAuth : "",
        isFetching: state.db.system ? state.db.system.isFetching : false
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        loginUser: (userObj, authObj) => {
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorAddNewUser(userObj));
            dispatch(actionCreatorAuthLogin(authObj));

            //dispatch(actionCreatorToggleIsFetching(false));
        },
        toggleFetching: (status) => {
            dispatch(actionCreatorToggleIsFetching(status))
        },

        getUserProfileData: (userId) => {
            //TODO thunk to get users
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorGetUserData(userId));
            //dispatch(actionCreatorToggleIsFetching(false));
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);