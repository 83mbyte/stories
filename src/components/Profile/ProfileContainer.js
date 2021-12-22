import { connect } from "react-redux";
import { actionCreatorModifyProfile, actionCreatorSubmitModifyProfile, actionCreatorDeleteArticle } from '../../redux/actions';
import Profile from "./Profile";

const ProfileContainer = (props) => {

    //Filter articles where author is the logged user
    /* let userArticles = Object.keys(props.articles).map(item => {
        if (props.articles[item].authorId == props.isLogged.userId) {
            return { [item]: props.articles[item] }
        }
        return null
    }).filter(item => item != null); */

    const ua = () => {
        let userArticles = Object.keys(props.articles).map((item) => {
            if (props.articles[item].authorId === props.isLogged.userId) {
                return { [item]: props.articles[item] }
            }
            return null
        }).filter(item => item != null);
        //console.log('===!!=== '+userArticles)
        return userArticles
    }

    return (
        <>
            {props.isLogged && props.currentUser
                ? <Profile
                    isLogged={props.isLogged.accessToken}
                    user={props.currentUser}
                    editProfileField={props.modifyProfile}
                    //articles={userArticles}
                    articles={ua()}
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
        submitModifiedProfile: (profileData, userId) => {
            dispatch(actionCreatorSubmitModifyProfile(profileData, userId))
        }

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);