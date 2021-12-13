import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ModalWindow = (props) => {
    
    const handleClose = ()=>{
        props.setShow(false)
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