
import { connect } from 'react-redux';
import Loader from '../common/Loader/Loader';
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

    const sortingNewToOld = (articlesToSort) => {
        let arrayToSort = [];
        Object.keys(articlesToSort).map(item => {
            return arrayToSort.push({ [item]: articlesToSort[item] })

        });
        arrayToSort.sort((a, b) => b[Object.keys(b)].date - a[Object.keys(a)].date)
      
        return arrayToSort;
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
                    <p>Acutus debemus disciplinae do explicabo extremo.</p>
                </div>
            </div>
            <div className="row">
                 
                {props.indexData ? sortingNewToOld(props.indexData).map(element => {
                     
                    let elem = Object.keys(element)[0]
                    return (
                       
                            <IndexArticlesItem key={elem}
                                articleData={props.indexData[elem]}
                                articleId={elem}
                                likesCount={getLikesCount(elem)}
                                views={getViewsCount(elem)}
                                author={props.authors[props.indexData[elem].authorId]}
                            />                        
                    ) 
                }) :  <Loader />}

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