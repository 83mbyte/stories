
import { Modal, InputGroup, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { connect } from "react-redux";
import { actionCreatorPostArticle } from '../../redux/actions';
import API, { } from '../../services/API';

function ModalDialog(props) {
    return (
        <Modal
            {...props}
             
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Attention!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Please check the form checkbox in order to complete your Submit action.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

//TODO validation form
const CreateArticle = (props) => {
    const [modalShow, setModalShow] = useState(false);

    let categorArray = ['Travel', 'Sport', 'Tech', 'Fashion', 'Psychology', 'WWW', 'Crime', 'Business', 'Discuss', 'Shopping', 'Art', 'Cusine', 'Media', 'Crypto', 'Medicine', '..other'];

    const createPostSubmitHandler = (e) => {
        e.preventDefault();
        function getCurrentDate() {
            let date = new Date();
            let res = date.toDateString().split(' ');
            return (`${res[2]} ${res[1]} ${res[3]}`);
        }
        let token = props.isLogged.accessToken;
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let text = formData.get('text');
        let date = getCurrentDate();
        let authorId = props.isLogged.userId;
        let category = formData.get('category');
        let check = formData.get('checkbox');
        
        //let articleId = Math.random().toString(36).substr(2, 6)+'-'+authorId.substr(0,5)+'-'+Math.random().toString(36).substr(2, 4);

        if (check === 'on'){
            let articleToPostObject = {
                authorId,
                category,
                date,
                image: '/images/image_4.jpg', //default image
                text,
                title,
                meta: {
                    likes: 0,
                    views: 1,
                }
            }
            API.submitNewArticle(articleToPostObject, token).then(resp => {
                
                let articleToDispatch = {
                    [resp.name]: { ...articleToPostObject }
                }
                props.postNewArticle(articleToDispatch);
            });
        } else {
            setModalShow(true)
        }
    }

    const cancelClickHandler = (e) => {
        e.preventDefault();
        setModalShow(true)
    }
    return (
        <div style={{ border: '0px solid red', width: '85%', margin: '0 auto' }}>
            <h1>Create Your Post</h1>
            {props.isLogged
                ? <div style={{ border: '0px solid red', width: '85%' }}>
                    <Form onSubmit={createPostSubmitHandler}>
                        <Form.Group className="mb-3" >
                            <Form.Label style={{ fontWeight: "bold", color: "black" }}>Post Title:</Form.Label>
                            <Form.Control type="text" placeholder="ex.: Article #1"
                                id="title"
                                name="title"

                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Article category:</Form.Label><br />
                            <Form.Select aria-label="Default select example" size="sm" name="category">

                                {categorArray.map((item) => {
                                    return <option value={item} key={item}>{item}</option>
                                })}
 
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Article Text:</Form.Label><br />
                            <Form.Control as="textarea" name="text" rows={3} placeholder="Article Text" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                label="Ready to post?"
                            /></Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="lg">
                                Submit
                            </Button>
                            <Button variant="secondary" size="lg" onClick={cancelClickHandler}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                    <ModalDialog
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                </div>
                : 'Please login first..'
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        //isFetching: state.db.system.isFetching,
        isLogged: state.db.system ? state.db.system.isAuth : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postNewArticle: (articleObj) => {
            dispatch(actionCreatorPostArticle(articleObj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);