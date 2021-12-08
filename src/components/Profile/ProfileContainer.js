import { connect } from "react-redux";
import { actionCreatorModifyProfile, actionCreatorSubmitModifyProfile, actionCreatorDeleteArticle } from '../../redux/actions';
import Profile from "./Profile";

const ProfileContainer = (props) => {

    //Filter articles where author is the logged user
    let userArticles = Object.keys(props.articles).map(item => {
        if (props.articles[item].authorId == props.isLogged.userId) {
            return { [item]: props.articles[item] }
        }
        return null
    }).filter(item => item != null);





    return (
        <>
            {props.isLogged && props.currentUser
                ? <Profile
                    isLogged={props.isLogged.accessToken}
                    user={props.currentUser}
                    editProfileField={props.modifyProfile}
                    articles={userArticles}
                    deleteArticle={props.deleteArticle}
                    submitModifiedProfile={props.submitModifiedProfile}
                />
                : <h1>Please login..</h1>}
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        //isFetching: state.db.system.isFetching,
        articles: state.db.articles,
        isLogged: state.db.system ? state.db.system.isAuth : null,
        currentUser: state.db.system ? state.db.system.currentUser : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteArticle: (data) => {
            dispatch(actionCreatorDeleteArticle(data))
        },
        modifyProfile: (inputName, value) => {
            dispatch(actionCreatorModifyProfile(inputName, value))
        },
        submitModifiedProfile: (name, about, userId) => {
            dispatch(actionCreatorSubmitModifyProfile(name, about, userId))
        }

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);