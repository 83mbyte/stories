
const AuthorInfo = (props) => {

    return (
        <section className="ftco-section">
            <div className="hero-wrap hero-wrap-2 js-fullheight"   >

                <div className="js-fullheight d-flex justify-content-center align-items-center">
                    <div className="col-md-8 text text-center">
                        <div className="img mb-4" style={{ backgroundImage: `url(${props.user.avatar})` }} ></div>
                        <div className="desc">
                            <h2 className="subheading">Hello I'm</h2>
                            <h1 className="mb-4">{props.user.name}</h1>
                            <p className="mb-4">{props.user.about}</p>
                            <ul className="ftco-social mt-3">
                                <li className="ftco"><a href="#"><span className="icon-twitter"></span></a></li>
                                <li className="ftco"><a href="#"><span className="icon-facebook"></span></a></li>
                                <li className="ftco"><a href="#"><span className="icon-instagram"></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AuthorInfo;