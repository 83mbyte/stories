import {  Flip } from "react-awesome-reveal";
import SocialLinks from "../Profile/SocialLinks";
 
const AuthorInfo = (props) => {

    return (
        <section className="ftco-section">
            <div className="hero-wrap hero-wrap-2 js-fullheight"   >

                <div className="js-fullheight d-flex justify-content-center align-items-center">
                    <Flip triggerOnce >
                        <div className="col-md-8 text text-center" style={{ margin:"0 auto"}}>
                            <div className="img mb-4" style={{ backgroundImage: `url(${props.user.avatar})` }} ></div>
                            <div className="desc" >
                                <div><h2 className="subheading">Hello I'm</h2></div>
                                <div><h1 className="mb-4">{props.user.name}</h1></div>
                                <div><p className="mb-4">{props.user.about}</p></div>
                                <div>
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
                                </div>



                            </div>
                        </div>
                    </Flip>
                </div>
            </div>
        </section>
    )
}

export default AuthorInfo;