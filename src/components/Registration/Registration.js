import { auth } from '../../_firebase/firebase';
import { authAPI } from '../../services/authFunctions';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { useState } from 'react';
import { actionCreatorAuthLogin } from '../../redux/actions';

import { Modal, Button } from 'react-bootstrap'


const Registration = (props) => {
    let navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState([''])
    
    const ModalMessage = (props) =>{
        return (
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{message[0]}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{message[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    }

    const handleClose = () => {
        setShow(false);
        navigate('/login');
    };
    
  
    const registrationHandler = async (e) => {

        e.preventDefault();
        let formData = new FormData(e.target);
        let ent = formData.entries();
        
        let { email, password, fullname, about } = Object.fromEntries(ent);
        let newUser = await authAPI.registerUserAccount(auth, email, password, fullname, about);
        if (newUser !== 'error' && newUser!=undefined) {
            setMessage(["Registration complete!", "Thank you for registration!"]);
            setShow(true); 
        } else {
            setMessage(["Warning!", "Registration was NOT completed.. Try again."]);
             
        };
    }


    return (
        <>
            <div className="row justify-content-center mb-5 pb-2">
                <div className="col-md-7 heading-section text-center ">
                    <h2 className="mb-4">Create your account.</h2>
                    <p>Feel the form with your email, password, etc.</p>
                </div>
            </div>
            <div className="text-center">
                <form onSubmit={registrationHandler}>
                    <div style={{ margin: "10px 0" }}>
                        <div style={{ margin: "0  0" }}><label>Email:</label></div>
                        <input type="email" name="email" placeholder="ex.: email@example.com" id="email" style={{ margin: "0" }} />

                    </div>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ margin: "0", padding: "0" }}><label>Password:</label></div>
                        <input type="password" name="password" placeholder="Password" id="password" style={{ margin: "0" }} />
                    </div>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ margin: "0", padding: "0" }}><label>Your Name:</label></div>
                        <input type="text" name="fullname" placeholder="ex: John Doe" id="fullname" style={{ margin: "0" }} />
                    </div>
                    <div style={{ margin: "20px 0" }}>
                        <div style={{ margin: "0", padding: "0" }}><label>A few words about You:</label></div>
                        <textarea name="about" placeholder="Text About You" rows={3} cols={18} style={{ margin: "0" }} id="about" />
                    </div>
                    <div>
                        <input type="submit" value="Register Me"></input>
                    </div>
                </form>

            </div>
            <ModalMessage />
            
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        isLogged: state.db.system ? state.db.system.isAuth : null
    }
}


export default connect(mapStateToProps)(Registration);