import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const ModalWindow = (props) => {
    let navigate = useNavigate();
    const handleClose = ()=>{
        props.setShow(false);
        if (props.goTo && props.goTo!=undefined){
            navigate(props.goTo);
            
        }
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.info[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.info[1]}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalWindow;