import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../_firebase/firebase';
import {actionCreatorAuthLogout} from '../../redux/actions';
import { authAPI } from '../../services/authAPI';



const Aside = (props) => {
	const logoutHandler = () =>{
		authAPI.logOut(auth).then (()=>{
			console.log('LogOut Success!');
			props.logoutUser();
		    
		});
	}
	let userLinksLi = (
		<>	
			<li><Link to={`/profile`} >Profile</Link></li>
			<li><Link to="/create">Create Your Article</Link></li>
			<li><Link to="/" onClick={logoutHandler}>Logout</Link></li>
		</>
	);
	
	let guestLinksLi = (
		<>
			<li><Link to="/registration">Register</Link></li>
			<li><Link to="/login">Login</Link><br /><br /></li>
			
		</>
	)
	

	return (
		<div id="colorlib-aside" role="complementary" className="js-fullheight text-center">
			<h1 id="colorlib-logo"><Link to="/">STORIES<span>.</span></Link></h1>
			<nav id="colorlib-main-menu" role="navigation">
				<ul>
					{/* //TODO  active link style */}
					<li className="colorlib"><Link to="/">Home</Link><br /> </li>

					{
						props.isLogged 
						? userLinksLi 
						: guestLinksLi  
					}
				 
				</ul>
			</nav>

			<div className="colorlib-footer">
				{/* <p>
					Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <Link to="https://colorlib.com" target="_blank">Colorlib</Link>
				</p> */}
				<ul>
					<li><Link to="#"><i className="icon-facebook"></i></Link></li>
					<li><Link to="#"><i className="icon-twitter"></i></Link></li>
					<li><Link to="#"><i className="icon-instagram"></i></Link></li>
					<li><Link to="#"><i className="icon-linkedin"></i></Link></li>
				</ul>

			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	

	return {
		//isFetching: state.db.system.isFetching,
		isLogged: state.db.system ? state.db.system.isAuth : null
	}

}
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (userData) => {
            //dispatch(actionCreatorToggleIsFetching(true));
            dispatch(actionCreatorAuthLogout());
            //dispatch(actionCreatorToggleIsFetching(false));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Aside);