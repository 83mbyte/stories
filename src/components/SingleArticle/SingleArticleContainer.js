import { connect } from "react-redux";
import SingleArticle from "./SingleArticle";
import { useParams } from "react-router";

import { actionCreatorLikeArticle, actionCreatorUnlikeArticle, actionCreatorViewArticle } from '../../redux/actions';


const SingleArticleContainer = (props) => {
    let params = useParams();

    return (
        <div className="row">

            <div className="col-lg-8 ">
                {props.articleData
                    ?
                    <SingleArticle
                        key={params.articleId}
                        article={props.articleData[params.articleId]}
                        author={props.authors[props.articleData[params.articleId].authorId]}
                        isLogged={props.isLogged}
                        articleId={params.articleId}
                        likeArticle={props.likeArticle}
                        unlikeArticle={props.unlikeArticle}
                        countView={props.countViewArticle}
                        likes={props.likes}
                        views={props.articleData[params.articleId].meta.views}
                    />
                    : 'Loading..'
                }

            </div>

            {/* //TODO <SideBar /> */}


            {/* End div class row */}
        </div>
    );


}
const mapStateToProps = (state) => {

    return {
        articleData: state.db.articles,
        authors: state.db.users,
        likes: state.db.likes,
        isLogged: state.db.system ? state.db.system.isAuth : false,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeArticle: (articleId, userId) => {

            dispatch(actionCreatorLikeArticle(articleId, userId))
        },

        unlikeArticle: (articleId, userId) => {

            dispatch(actionCreatorUnlikeArticle(articleId, userId))
        },
        countViewArticle: (articleId) => {
            dispatch(actionCreatorViewArticle(articleId));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleArticleContainer);