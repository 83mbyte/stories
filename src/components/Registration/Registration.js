import { auth, storage } from '../../_firebase/firebase';
import { authAPI } from '../../services/authAPI';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { useState } from 'react';

import s from './Registration.module.css';
import { Modal, Button } from 'react-bootstrap';

import { actionCreatorAuthLogin, actionCreatorAddNewUser, actionCreatorGetUserData, actionCreatorToggleIsFetching } from '../../redux/actions'
import Loader from '../common/Loader';
//import {API} from '../../services/API';



const Registration = (props) => {
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


    const registrationHandler = async (e) => {

        e.preventDefault();
        props.toggleFetching(true);
        let formData = new FormData(e.target);
        let ent = formData.entries();

        let { email, password, fullname, about, file, twitter, facebook, instagram, linkedin } = Object.fromEntries(ent);

        if (file.size === 0 || file.name === "") {
            file = null
        }

        let newUser = await authAPI.registerUserAccount(auth, storage, email, password, fullname, about, twitter, facebook, instagram, linkedin, file);
        props.toggleFetching(false);
        if (newUser && newUser[1] !== 'error' && newUser[1] != undefined && newUser[1] != null) {

            setMessage(["Registration complete!", "Thank you for registration!"]);
            setShow(true);
            //props.addUser(newUser[0]) 
            props.loginUser(newUser[0], newUser[1]);

            props.getUserProfileData(newUser[1].userId);
            /* API.getUserProfile(newUser[1].userId, newUser[1].accessToken).then((resp) => {

                if (resp !== 'error' && resp !==undefined) {
                    console.log(resp)
                    props.getUserProfileData(resp);
                }
            }) */

        } else {
            setMessage(["Warning!", "Registration was NOT completed.. Try again."]);
            setShow(true);

        };
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
                    ? <form onSubmit={registrationHandler}>
                        <div style={{ margin: "10px 0" }}>
                            <div style={{ margin: "0  0" }}><label>Email:</label></div>
                            <input type="email" name="email" placeholder="ex.: email@example.com" id="email" />

                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Password:</label></div>
                            <input type="password" name="password" placeholder="Password" id="password" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Name:</label></div>
                            <input type="text" name="fullname" placeholder="ex: John Doe" id="fullname" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Profile Photo:</label></div>
                            <input type="file" name="file" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>A few words about You:</label></div>
                            <textarea name="about" placeholder="Text About You" rows={3} cols={18} id="about" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Twitter:</label></div>
                            <input type="text" name="twitter" placeholder="Link to your Twitter" id="twitter" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Facebook:</label></div>
                            <input type="text" name="facebook" placeholder="Link to your Facebook" id="facebook" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Instagram:</label></div>
                            <input type="text" name="instagram" placeholder="Link to your Instagram" id="instagram" />
                        </div>
                        <div className={s.formBlock}>
                            <div className={s.formDivLabel}><label>Your Linkedin:</label></div>
                            <input type="text" name="linkedin" placeholder="Link to your LinkedIn" id="linkedin" />
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