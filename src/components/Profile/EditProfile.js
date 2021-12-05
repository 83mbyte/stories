import { Accordion, Form, Button } from "react-bootstrap";

import s from './ProfileContainer.module.css';

//TODO styles at ProfileContainer.module.css

//TODO form submit hadler

const EditProfile = (props) => {
    const editFormFieldsHandler = ((e) => {

        e.preventDefault();
        props.editProfileField(e.target.name, e.target.value);

    })
    return (

        <Accordion className={s.accordionStyle}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Edit profile</Accordion.Header>
                <Accordion.Body>
                    <Form>
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

                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg">
                                Update Profile
                            </Button>
                            <Button variant="secondary" size="lg">
                                cancel
                            </Button>
                        </div>
                    </Form>


                </Accordion.Body>
            </Accordion.Item>

        </Accordion>
    );

}

export default EditProfile;