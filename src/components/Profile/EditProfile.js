
import { useState } from "react";
import { useNavigate } from "react-router";

import s from './ProfileContainer.module.css';

import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";

import ModalWindow from '../common/ModalWindow';


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


    const [checked, setChecked] = useState(false);
    const [message, setMessage] = useState([''])

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
        let twitter = formData.get('twitter');
        let facebook = formData.get('facebook');
        let instagram = formData.get('instagam');
        let linkedin = formData.get('linkedin');
        let file = formData.get('file');

        let newProfileData = { name, about, twitter, facebook, instagram, linkedin }

        if (check === 'on') {
             
            if (file.size > 0 || file.name !== "") {


                API.uploadImage(file, props.user.userId, 'avatars')
                    .then(url => {
                        if (url && url !== null && url !== undefined) {
                            API.modifyProfile({ ...newProfileData, avatar: url }, props.user.userId, props.accessToken)
                                .then((resp) => {
                                    if (resp && resp !== 'error') {
                                        props.submitModifiedProfile({ ...newProfileData, avatar: url }, props.user.userId);
                                        navigate('/');
                                    }
                                });
                        }
                    })

            } else {
                API.modifyProfile(newProfileData, props.user.userId, props.accessToken)
                    .then((resp) => {
                        if (resp && resp !== 'error'){
                            props.submitModifiedProfile(newProfileData, props.user.userId);
                            navigate('/');
                        }
                    });
            }



        } else {
            setMessage(['Warning!', 'Please set the form CHECKBOX to proceed.'])
            setChecked(true);
        }
    }

    const deleteArticleHandler = (title, articleId) => {
        setShow([true, title, articleId]);
    }

    const submitDeleteArticle = (articleId) => {

        let regexFilter = /(?:articles%2F)([-][\w\d]+.[a-z]+)(?:\?)/g;
        let filenameToDelete=null;

        props.articles.forEach(element => {

            if (Object.keys(element)[0] === articleId) {
                 
                if((regexFilter.exec(element[articleId].image))!==null){
                    filenameToDelete = regexFilter.exec(element[articleId].image)[1];
                } 
            }
        });

        API.deleteArticle(articleId, filenameToDelete, props.accessToken)
            .then(() => {
                props.deleteArticle(articleId);
                navigate('/')
            })
    }

    return (
        <>
            <Accordion className={s.accordionStyle}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Edit Profile</Accordion.Header>
                    <Accordion.Body>
                        <Form onSubmit={editProfileSubmitHandler}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email"
                                    id="userEmail"
                                    name="email"
                                    value={props.user.email}
                                    plaintext readOnly
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Your Name:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="ex.: John Doe"
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

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload your profile image</Form.Label>
                                <Form.Control type="file" name="file" size="sm" />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Twitter:</Form.Label>
                                <Form.Control type="text" placeholder="ex.: https://twitter.com/_your_profile"
                                    id="twitter"
                                    name="twitter"
                                    value={props.user.twitter}
                                    onChange={editFormFieldsHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Facebook:</Form.Label>
                                <Form.Control type="text" placeholder="ex.: https://facebook.com/_your_profile"
                                    id="facebook"
                                    name="facebook"
                                    value={props.user.facebook}
                                    onChange={editFormFieldsHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Instagram:</Form.Label>
                                <Form.Control type="text" placeholder="ex.: https://instagram.com/_your_profile"
                                    id="instagram"
                                    name="instagram"
                                    value={props.user.instagram}
                                    onChange={editFormFieldsHandler}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>LinkedIn:</Form.Label>
                                <Form.Control type="text" placeholder="ex.: https://linkedin.com/_your_profile"
                                    id="linkedin"
                                    name="linkedin"
                                    value={props.user.linkedin}
                                    onChange={editFormFieldsHandler}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id="checkbox"
                                    name="checkbox"
                                    label="Ready to update?"
                                /></Form.Group>

                            <div className="d-grid gap-2">
                                <Button variant="primary" size="sm" type="submit">
                                    Update Profile
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

            <ModalWindow show={checked} setShow={setChecked} info={message} />




        </>
    );

}

export default EditProfile;