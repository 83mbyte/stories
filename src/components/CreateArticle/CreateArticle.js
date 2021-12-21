import { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "react-redux";

import s from './CreateArticle.module.css';
import {   Form, Button } from "react-bootstrap";

import { actionCreatorPostArticle } from '../../redux/actions';
import { API } from '../../services/API';
import ModalWindow from "../common/ModalWindow";
import { Zoom } from "react-awesome-reveal";

 

//TODO validation form
const CreateArticle = (props) => {
 
    const [show, setShow] = useState(false)

    let navigate = useNavigate();

    let categorArray = ['Travel', 'Sport', 'Politics', 'Tech', 'Fashion', 'Psychology', 'WWW', 'Crime', 'Business', 'Discuss', 'Shopping', 'Art', 'Cusine', 'Media', 'Crypto', 'Medicine', '..other'];

    const createPostSubmitHandler = (e) => {
        e.preventDefault();
        /* function getCurrentDate() {
            let date = new Date();
            let res = date.toDateString().split(' ');
            return (`${res[2]} ${res[1]} ${res[3]}`);
        } */
        let token = props.isLogged.accessToken;
        let formData = new FormData(e.target);
        let title = formData.get('title');
        let text = formData.get('text');
        let date = Date.now();
        let authorId = props.isLogged.userId;
        let category = formData.get('category');
        let check = formData.get('checkbox');
        let file = formData.get('file');


        if (check === 'on') {
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

                if (file.size > 0 && file.size < 1048576) {
                    console.log('SIZE:' + file.size)
                    API.uploadImage(file, resp.name, 'articles')
                        .then(url => {
                            API.editArticle({ ...articleToPostObject, image: url }, resp.name, token)
                                .then(() => {
                                    let articleToDispatch = {
                                        [resp.name]: { ...articleToPostObject, image: url }
                                    }
                                    props.postNewArticle(articleToDispatch);
                                })


                        })

                } else {
                    console.log('File too big')
                }

                navigate('/')



            });

        } else {
            setShow(true)
        }
    }

   
    return (
        <div className={s.divCreateArticle}>
            <Zoom><h1>Create Your Article</h1></Zoom>
            {props.isLogged
                ? <div className={s.divForm}>
                    <Form onSubmit={createPostSubmitHandler}>
                        <Form.Group className="mb-3" >
                            <Form.Label className={ s.formLabel}>Post Title:</Form.Label>
                            <Form.Control type="text" placeholder="ex.: Article #1"
                                id="title"
                                name="title"
                                className={s.formItem}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className={ s.formLabel}>Article category:</Form.Label><br />
                            <Form.Select aria-label="Default select example"   name="category" className={s.formItem}>

                                {categorArray.map((item) => {
                                    return <option value={item} key={item}>{item}</option>
                                })}

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label  className={ s.formLabel}>Article Text:</Form.Label><br />
                            <Form.Control as="textarea" name="text" rows={3} placeholder="Article Text" className={s.formItem}/>
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label  className={ s.formLabel}>Upload image</Form.Label>
                            <Form.Control type="file" name="file" className={s.formItem} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                id="checkbox"
                                name="checkbox"
                                label="Ready to post?"
                            /></Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" size="sm">
                                Submit
                            </Button>

                        </div>
                    </Form>
                   

                    <ModalWindow show={show} setShow={setShow} info={['Attention!', ' Please set the form CHECKBOX in order to complete your Submit action.']} />
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