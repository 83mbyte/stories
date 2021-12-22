
import { Flip } from "react-awesome-reveal";
import EditProfile from "./EditProfile";
import SocialLinks from "./SocialLinks";
import s from './ProfileContainer.module.css';
const Profile = (props) => {

    return (
        <>
            {props.isLogged
                ?
                <div className="hero-wrap hero-wrap-2 js-fullheight"   >
                    <div className="js-fullheight d-flex justify-content-center align-items-center">
                        <Flip triggerOnce >
                            <div className="col-md-8 text text-center">
                                <div className="img mb-4" style={{ backgroundImage: `url(${props.user.avatar})` }} ></div>



                                <ul className={s.ulProfile}>
                                    <li><h2 className="subheading">Hello </h2></li>
                                    <li><h1 className="mb-4">{props.user.name}</h1></li>
                                    <li className={s.about}><p className="mb-4">{props.user.about}</p></li>
                                    <li>
                                        <SocialLinks
                                            social={
                                                {
                                                    twitter: props.user.twitter,
                                                    facebook: props.user.facebook,
                                                    instagram: props.user.instagram,
                                                    linkedin: props.user.linkedin
                                                }
                                            }
                                        />
                                    </li>
                                    <li>
                                        <EditProfile
                                            user={props.user}
                                            accessToken={props.isLogged}
                                            editProfileField={props.editProfileField}
                                            articles={props.articles}
                                            deleteArticle={props.deleteArticle}
                                            submitModifiedProfile={props.submitModifiedProfile}
                                        />
                                    </li>
                                </ul>

                            </div>
                        </Flip>
                    </div>
                </div>

                : <h1>Please login first...</h1>
            }


        </>
        /* <!-- END COLORLIB-MAIN --> */
    );
}

export default Profile;
