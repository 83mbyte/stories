import s from '../IndexPage.module.css';
import { Link } from "react-router-dom";

const IndexArticlesItem = ({ articleData, author, articleId, likesCount, views }) => {

    function convertDate(time) {
        let date = new Date(parseInt(time));
        let res = date.toDateString().split(' ');

        return (`${res[2]} ${res[1]} ${res[3]}`);
    }
    return (
        <div className="col-md-4">
            <div className="blog-entry">
                <Link to={`/article/${articleId}`} className="img img-2" style={{ backgroundImage: `url(${articleData.image})` }}></Link>
                <div className="text text-2 pt-2 mt-3">
                    <span className="category mb-3 d-block">
                        {/* Link to Category ? */}
                        <Link to="#">{articleData.category}</Link>
                    </span>
                    <h3 className="mb-4"><Link to={`/article/${articleId}`}>{articleData.title}</Link></h3>
                    <p className="mb-4"> {(articleData.text).substr(0, 160)}...</p>
                    <div className="author mb-4 d-flex align-items-center">

                        {/* Links to Author profile? */}

                        <Link to={`/author/${author.userId}`} className="img" style={{ backgroundImage: `url(${author.avatar})` }}></Link>
                        <div className="ml-3 info">
                            <span>Written by</span>

                            <h3><Link to={`/author/${author.userId}`}>{author.name}</Link>, <div className={s.publishDate}>{convertDate(articleData.date)}</div></h3>
                        </div>
                    </div>
                    <div className="meta-wrap align-items-center">
                        <div className="half order-md-last">
                            <p className="meta">
                                <span><i className="icon-heart"></i>{likesCount}</span>
                                <span><i className="icon-eye"></i>{views}</span>

                                {/* TODO COMMENTS COUNT (IF COMMENTS)
                                <span><i className="icon-comment"></i>5</span> */}
                            </p>
                        </div>
                        <div className="half">
                            <p><Link to={`/article/${articleId}`} className="btn py-2">Continue Reading <span className="ion-ios-arrow-forward"></span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IndexArticlesItem