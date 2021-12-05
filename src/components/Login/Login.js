import { connect } from "react-redux";
import { auth } from '../../_firebase/firebase';
import { authAPI } from '../../services/authFunctions';
import { API } from '../../services/API';
import { useNavigate } from "react-router-dom";
import { actionCreatorAuthLogin, actionCreatorGetUserData } from '../../redux/actions';



const Login = (props) => {
    let navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let email = formData.get('email');
        let password = formData.get('password');
        authAPI.loginUserAccount(auth, email, password)
            .then(resp => {
                props.loginUser(resp);
                API.getUserProfile(resp.userId, resp.accessToken).then((resp) => {
                    if (resp !== 'error') {
                        props.getUserProfileData(resp);
                        navigate(`/profile`);
                    }
                })
            });

    }
    const NOTLOGGED = (<div className="row justify-content-center">
        <form onSubmit={submitHandler}>
            <div><label htmlFor="email">Email: </label><br /><input type="email" id="email" name="email" placeholder="ex. email@example.com"></input></div>
            <div><label htmlFor="passsword">Password:</label><br /><input type="password" id="password" name="password"></input></div>
            <div style={{ margin: "5px auto" }}><input type="submit" value="Register" /></div>
        </form>
    </div>)
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
            dispatch(actionCreatorGetUserData(userData));
            //dispatch(actionCreatorToggleIsFetching(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);