import { connect } from "react-redux";
import { useParams } from "react-router";

import Loader from "../common/Loader";
import AuthorInfo from "./AuthorInfo";

const AuthorContainer = (props) => {
    let params = useParams();
    return (
        <>
            {props.users
                ?
                props.users[params.authorId] ?
                    <AuthorInfo user={props.users[params.authorId]}/>
                    : 'Something Wrong. Unknown user..'
                : <Loader />}
        </>
    );
}

const mapStateToProps = (state) => {

    return {
        users: state.db.users
    }
}

export default connect(mapStateToProps)(AuthorContainer);