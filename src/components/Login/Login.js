import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import s from './Login.module.css'

import { auth } from '../../_firebase/firebase';

import { actionCreatorAuthLogin, actionCreatorGetLoggedUserData } from '../../redux/actions';
import { authAPI } from '../../services/authAPI';
import { API } from '../../services/API';
import ModalWindow from "../common/ModalWindow";




const Login = (props) => {
    const [show, setShow] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    let navigate = useNavigate();

    const onSubmitForm = (data) => {

        authAPI.loginUserAccount(auth, data.email, data.password)
            .then(resp => {
                 
                if (resp !== undefined && resp !== null && resp!=="Not a user" && typeof(resp)==='object') {
                    
                    props.loginUser(resp);
                    API.getUserProfile(resp.userId, resp.accessToken).then((resp) => {
                        if (resp !== 'error' && resp !== undefined) {
                            props.getUserProfileData(resp);
                            navigate(`/profile`);
                        }
                    })
                } else {
                    setShow(true)
                }
            });
    }


    const NOTLOGGED = (<div className="row justify-content-center">
  
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div>
                <label htmlFor="email">Email: </label><br />
                <input type="email" id="email"
                    {...register('email',
                        {
                            required: 'Provide your email.',
                            pattern: {
                                /* value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i, */
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                message: 'Provide a correct email.'
                            }
                        })
                    }
                    placeholder="ex. email@example.com" >
                </input>
                {errors.email && <div className={s.errorMessage}>{errors.email.message}</div>}
            </div>
            <div>
                <label htmlFor="passsword">Password:</label><br />
                <input type="password" id="password"
                    {...register('password',
                        {
                            required: 'Provide your password.',
                            minLength: { value: 4, message: 'Min.length is 4 symbols' }
                        })
                    }>
                </input>
                {errors.password && <div className={s.errorMessage}>{errors.password.message}</div>}
            </div>
            <div className={s.divButton}><input type="submit" value="Login" /></div>
        </form>
    </div>
    )
    return (
        <>
            <div className="row justify-content-center mb-5 pb-2">
                <div className="col-md-7 heading-section text-center ">
                    <h2 className="mb-4">Please login</h2>
                    <p>Provide your Email and Password in order to post your articles.</p>
                </div>
            </div>
            <div className="text-center">
                {/*  {props.isLogged === null || props.isLogged === "" ? <h1>Login page</h1> : <h1>You are logged already</h1>} */}
                {props.isLogged === null || props.isLogged === "" ? NOTLOGGED : ''}
            </div>
            <ModalWindow show={show} setShow={setShow} info={['Warning', 'The provided Email/Password are wrong. Please try again!']} />
        </>
    );
}

const mapStateToProps = (state) => {

    return {
        //isFetching: state.db.system.isFetching,
        isLogged: state.db.system ? state.db.system.isAuth : null,
        currentUser: state.db.system ? state.db.system.currentUser : null

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userData) => {
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorAuthLogin(userData));
            //dispatch(actionCreatorToggleIsFetching(false));

        },
        getUserProfileData: (userData) => {
            //TODO thunk to get users
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorGetLoggedUserData(userData));
            //dispatch(actionCreatorToggleIsFetching(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);