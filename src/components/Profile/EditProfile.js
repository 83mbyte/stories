
import { useState } from "react";
import { useNavigate } from "react-router";

import s from './ProfileContainer.module.css';
import { Accordion, Form, Button, Modal, ListGroup } from "react-bootstrap";

import { API } from '../../services/API';
 

const ArticlesToEdit = (props) => {
    let navigate = useNavigate();
    return (
        <ListGroup.Item as="li" className={s.editArticle}>

                    <span className={s.smallDescr}>Article Title: <span className={s.titleName}>"{props.data.title}"</span></span> 
                    <div className="d-grid gap-2"><Button variant="info"
                        onClick={() => {
                            navigate(`/editor/${props.articleId}`);
                        }}
                        name={props.articleId}>Edit</Button>

                        <Button variant="danger" onClick={() => {
                            props.deleteArticleHandler(props.data.title, props.articleId)
                        }}>Delete</Button>
                    </div>            
        </ListGroup.Item>
    );

}

const EditProfile = (props) => {
    let navigate = useNavigate();
    const [show, setShow] = useState([false, '']);

    const handleClose = () => {
        setShow([false, '', '']);

    };

    const editFormFieldsHandler = ((e) => {
        e.preventDefault();
        props.editProfileField(e.target.name, e.target.value);

    })

    const editProfileSubmitHandler = (e) => {
        e.preventDefault();
        console.log('submit edit profile' + e.target);
        let formData = new FormData(e.target);
        let name = formData.get('name');
        let about = formData.get('about');
        let check = formData.get('checkbox');

        if (check == 'on') {
            console.log(props.user.userId + ' -==- ' + props.accessToken);
            API.modifyProfile({ name, about }, props.user.userId, props.accessToken)
                .then(() => {
                    props.submitModifiedProfile(name, about, props.user.userId);
                    navigate('/');
                })
        }


    }

    const deleteArticleHandler = (title, articleId) => {
        setShow([true, title, articleId]);
    }

    const submitDeleteArticle = (articleId) => {

        API.deleteArticle(articleId, props.accessToken)
            .then(() => {
                props.deleteArticle(articleId);
                navigate('/')
            })
    }

    return (
        <>
            <Accordion className={s.accordionStyle}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Edit profile</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={editProfileSubmitHandler}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" placeholder="ex.: John Doe"
                                    id="userEmail"
                                    name="email"
                                    value={props.user.email}
                                    plaintext readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Your Name:</Form.Label>
                                <Form.Control type="text" placeholder="ex.: John Doe"
                                    id="username"
                                    name="name"
                                    value={props.user.name}
                                    onChange={editFormFieldsHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>About:</Form.Label>
                                <Form.Control as="textarea" name="about" rows={3} placeholder="Text About You" defaultValue={props.user.about} onChange={editFormFieldsHandler} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    label="Ready to update?"
                                /></Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" type="submit">
                                    Update Profile
                                </Button>
                                <Button variant="secondary" size="lg">
                                    cancel
                                </Button>
                            </div>
                        </Form>


                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Edit My Articles</Accordion.Header>
                    <Accordion.Body>


                        <ListGroup as="ol" numbered>
                            {props.articles.length > 0
                                ? props.articles.map(article => {

                                    return <ArticlesToEdit
                                        key={Object.keys(article)[0]}
                                        deleteArticleHandler={deleteArticleHandler}
                                        accessToken={props.accessToken}
                                        articleId={Object.keys(article)[0]}
                                        data={Object.values(article)[0]}
                                    />
                                })
                                : "You have no articles published"}

                        </ListGroup>

                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>

            <Modal show={show[0]} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>The following article ("{show[1]}") will be deleted. Are you sure ???</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => {
                        submitDeleteArticle(show[2])
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>




        </>
    );

}

export default EditProfile;