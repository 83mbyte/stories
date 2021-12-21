import { useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../../services/API";

import s from './SingleArticle.module.css';
import { Zoom } from "react-awesome-reveal";

const SingleArticle = ({ article, author, articleId, isLogged, likeArticle, unlikeArticle, likes, countView, views }) => {
    useEffect(() => {

        if (isLogged.userId) {
            API.incrementView(articleId, isLogged.userId, isLogged.accessToken, views + 1)
            countView(articleId)
        }

    }, []);

    const likeClickHandler = (e) => {
        e.preventDefault();
        //add like to db
        API.addLike(articleId, isLogged.userId, isLogged.accessToken).then(resp => {
            if (resp !== 'error') {
                likeArticle(articleId, isLogged.userId) //dispatch to our store
            } else {
                console.log('Something wrong..  Like was not setted');

            }
        })

    }
    const unlikeClickHandler = (e) => {
        e.preventDefault();

        API.removeLike(articleId, isLogged.userId, isLogged.accessToken).then(resp => {
            if (resp !== 'error') {
                unlikeArticle(articleId, isLogged.userId) //dispatch to our store
            } else {
                console.log('Something wrong..  Like was not setted');

            }
        })
    }

    return (
        <>
            <Zoom >
                <h2 className="mb-3 font-weight-bold">{article.title}</h2>
            </Zoom>
            <Zoom triggerOnce>
                <img src={article.image} alt="" className="img-fluid" />
                <p className={s.articleText}>{article.text}</p>
                {isLogged
                    ? <div style={{ width: "70%", margin: "0 auto", textAlign: "center" }}>
                        Like the article? Don't forget to mark it.
                        <div className="tagcloud" >
                            {likes[articleId] && (likes[articleId][isLogged.userId])
                                ? <a href="/" className="a btn" onClick={unlikeClickHandler}>UnLike</a>
                                : <a href="/" className="a btn" onClick={likeClickHandler}>Like</a>
                            }
                        </div>
                    </div>
                    : <div style={{ width: "75%", margin: "0 auto", textAlign: "center", fontSize: "14px", color: "#D1D1D1" }}>(Please note - 'Likes' functionality is available to the logged users <span style={{ textDecoration: "underline" }}>only</span> )</div>
                }
                <br /><hr></hr>
                <div className="about-author d-flex p-4 bg-light">
                    <div className="bio mr-5" style={{ width: "45%" }}>
                        <img src={author.avatar} alt={`${author.name} avatar`} className="img-fluid mb-4" />
                    </div>

                    <div className="desc" style={{ width: "55%" }}>

                        <h3><Link to={`/author/${author.userId}`} className={s.authorName}>{author.name}</Link></h3>
                        
                        <p>{(author.about).substr(0, 200)}...</p>
                    </div>
                </div>
            </Zoom>
        </>
    );
}

export default SingleArticle;