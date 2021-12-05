import { connect } from "react-redux";
import {modifyUserProfileThunkCreator} from '../../redux/actions';
import Profile from "./Profile";

const ProfileContainer = (props) => {
    
    return (
        <>
            {props.isLogged && props.currentUser
                ? <Profile isLogged={props.isLogged.accessToken} user={props.currentUser} editProfileField={props.modifyUserProfileThunkCreator} />
                : <h1>Please login..</h1>}
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        //isFetching: state.db.system.isFetching,
        isLogged: state.db.system ? state.db.system.isAuth : null,
        currentUser: state.db.system ? state.db.system.currentUser : null
    }
}



export default connect(mapStateToProps, {modifyUserProfileThunkCreator})(ProfileContainer);