import { auth } from '../../_firebase/firebase';
import { authAPI } from '../../services/authFunctions';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import {actionCreatorAuthLogin} from '../../redux/actions';

const Registration = (props) => {
    let navigate = useNavigate();

    const registrationHandler = async (e) => {
        
        e.preventDefault();
        let formData = new FormData(e.target);
        let ent = formData.entries();

        let { email, password, fullname, about } = Object.fromEntries(ent);
        let newUser = await authAPI.registerUserAccount(auth, email, password, fullname, about);
        if (newUser !== 'error') {
            props.loginUser(newUser);
            navigate('/');
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
            <form onSubmit={registrationHandler}>
                <div style={{ margin: "10px 0" }}>
                    <div style={{ margin: "0  0" }}><label>Email:</label></div>
                    <input type="email" name="email" placeholder="ex.: email@example.com" id="email" style={{ margin: "0" }} />

                </div>
                <div style={{ margin: "20px 0" }}>
                    <div style={{ margin: "0", padding: "0" }}><label>Password:</label></div>
                    <input type="password" name="password" placeholder="Password" id="password" style={{ margin: "0" }} />
                </div>
                <div style={{ margin: "20px 0" }}>
                    <div style={{ margin: "0", padding: "0" }}><label>Your Name:</label></div>
                    <input type="text" name="fullname" placeholder="ex: John Doe" id="fullname" style={{ margin: "0" }} />
                </div>
                <div style={{ margin: "20px 0" }}>
                    <div style={{ margin: "0", padding: "0" }}><label>A few words about You:</label></div>
                    <textarea name="about" placeholder="Text About You" rows={3} cols={18} style={{ margin: "0" }} id="about" />
                </div>
                <div>
                    <input type="submit" value="Register Me"></input>
                </div>
            </form>

        </div>
    </>
);
}


const mapStateToProps = (state) => {
    return {
        isLogged: state.db.system ? state.db.system.isAuth : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userData) => {
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorAuthLogin(userData));
            //dispatch(actionCreatorToggleIsFetching(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Registration);