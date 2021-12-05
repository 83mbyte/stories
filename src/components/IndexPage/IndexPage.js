
import { connect } from 'react-redux';
import IndexArticlesItem from './IndexArticlesItem/IndexArticlesItem';
 

const IndexPage = (props) => {
 
    const getLikesCount = (articleId) => {
        let likesCount = 0;
        if (props.likes.hasOwnProperty(articleId)) {

            let arr = Object.keys(props.likes[articleId])
            arr.forEach(elem => {

                if (props.likes[articleId][elem]) {
                    likesCount++;
                }
            });
        }
        return likesCount;
    }

    const getViewsCount = (articleId) => {
        let viewsCount = 0;
        if (props.indexData.hasOwnProperty(articleId)) {
            viewsCount = props.indexData[articleId].meta.views;
            
        }
        return viewsCount;
    }

    return (
        <>
            <div className="row justify-content-center mb-5 pb-2">
                <div className="col-md-7 heading-section text-center ">
                    <h2 className="mb-4">Articles</h2>
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country.</p>
                </div>
            </div>
            <div className="row">

                {props.indexData ? Object.keys(props.indexData).map(elem => {
                    return (

                        <IndexArticlesItem
                            articleData={props.indexData[elem]}
                            key={elem}
                            articleId={elem}
                            likesCount={getLikesCount(elem)}
                            views={getViewsCount(elem)}
                            author={props.authors[props.indexData[elem].authorId]}
                        />

                    )
                }) : 'loading..'}

            </div>
        </>
    );
}

const mapStateToProps = (state) => {

    return {
        indexData: state.db.articles,
        authors: state.db.users,
        likes: state.db.likes

    }
}

export default connect(mapStateToProps)(IndexPage);