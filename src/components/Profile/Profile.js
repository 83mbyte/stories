 
import EditProfile from "./EditProfile";
import SocialLinks from "./SocialLinks";

const Profile = (props) => {
    return (
        <>
            {props.isLogged
                ? <section className="ftco-section">
                    <div className="hero-wrap hero-wrap-2 js-fullheight"   >

                        <div className="js-fullheight d-flex justify-content-center align-items-center">
                            <div className="col-md-8 text text-center">
                                <div className="img mb-4" style={{ backgroundImage: `url(${props.user.avatar})` }} ></div>
                                <div className="desc">
                                    <h2 className="subheading">Hello </h2>
                                    <h1 className="mb-4">{props.user.name}</h1>
                                    <p className="mb-4">{props.user.about}</p>
                                    <SocialLinks 
                                    social ={
                                        {
                                            twitter: props.user.twitter, 
                                            facebook:props.user.facebook, 
                                            instagram: props.user.instagram,
                                            linkedin:props.user.linkedin
                                        }
                                    }
                                     
                                       />
                                </div>
                            </div>
                        </div>
                    </div>

                    <EditProfile
                        user={props.user}
                        accessToken={props.isLogged}
                        editProfileField={props.editProfileField}
                        articles={props.articles}
                        deleteArticle={props.deleteArticle}
                        submitModifiedProfile={props.submitModifiedProfile}
                    />

                </section>
                : <h1>Please login first...</h1>

            }


        </>
        /* <!-- END COLORLIB-MAIN --> */
    );
}

export default Profile;
