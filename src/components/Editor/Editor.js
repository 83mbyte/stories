import {Form, Button} from 'react-bootstrap'
import { connect } from 'react-redux';
import { useParams , useNavigate} from "react-router";

import { actionCreatorEditArticle } from '../../redux/actions';
import {API} from '../../services/API'
const Editor = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    let articleId = params.articleId;

    const editFormFieldsHandler = (e) => {
        e.preventDefault();
        props.editArticleData(e.target.name, e.target.value, articleId)
    }

    const saveEditedArticle = (e) =>{
        e.preventDefault();
       //TODO - make some filters of vulnerable words/htmltags and so on.. before submiting

        API.editArticle( props.articles[articleId], articleId, props.isLogged.accessToken).then(resp => {
            if (resp !== 'error' && resp !==undefined) {
                navigate(`/profile`);
            }
        })
         
    }
    return (
        props.isLogged
        ? <>
            <h1>a very Simple Editor</h1>
            <Form onSubmit={saveEditedArticle}>
        <Form.Group className="mb-3" >
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text" placeholder="ex.: John Doe"
                id="title"
                name="title"
                value={props.articles[articleId].title}
                onChange={editFormFieldsHandler}
                 
            />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Text:</Form.Label>
            <Form.Control as="textarea" name="text" rows={3} placeholder="Article Text" defaultValue={props.articles[articleId].text} onChange={editFormFieldsHandler} />
        </Form.Group> 
        {/* <Form.Group className="mb-3" >
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
        </Form.Group> */}

        <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="sm" >
                Save
            </Button>
            <Button variant="secondary" size="sm" onClick={()=>{
                navigate('/profile')
            }}>
                cancel
            </Button>
        </div>
    </Form>
        </>
    : 'You are not logged..'
    );
}

const mapStateToProps = (state) => {
    return {
        articles : state.db.articles,
        isLogged : state.db.system ? state.db.system.isAuth : ""
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editArticleData: (inputName, value, articleId) =>{
            dispatch(actionCreatorEditArticle(inputName, value, articleId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);