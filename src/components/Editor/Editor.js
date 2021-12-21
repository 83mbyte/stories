import { Zoom } from 'react-awesome-reveal';
import  Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import { useParams , useNavigate} from "react-router";

import { actionCreatorEditArticle } from '../../redux/actions';
import {API} from '../../services/API';

const Editor = (props) => {
    let params = useParams();
    let navigate = useNavigate();
    let articleId = params.articleId;

    const editFormFieldsHandler = (e) => {
        console.log('editFormFieldsHandler');
        e.preventDefault();
         
        //Small & very SIMPLE Filter for user input
        let forbiddenWordsArray = [
            "<script>",
            "</script>",
            "<Script>",
            "<ScRiPt>",
            "</ScRiPt>",
            "</scripT>",
            "<scripT>",
            "<scriPT>",
            "</scriPT>",
            "</scrIPT>",
            "<scrIPT>",
            "</Script>",
            "</ScripT>",
            "<ScripT>",
            "<javascript:",
            "<script",
            "</script", "alert(","alert()", "alert(1)"
        ]
        let text = e.target.value;
        forbiddenWordsArray.forEach(forbiddenWord => {
            if (text.includes(forbiddenWord)) {
                text = (text).replace(forbiddenWord, "...");
                console.log(text)
                props.editArticleData(e.target.name, text, articleId)
            }
        });

        props.editArticleData(e.target.name, text, articleId)
    }

    const saveEditedArticle = (e) =>{
        e.preventDefault();
       

        API.editArticle( props.articles[articleId], articleId, props.isLogged.accessToken).then(resp => {
            if (resp !== 'error' && resp !==undefined) {
                navigate(`/profile`);
            }
        })
         
    }
    return (
        props.isLogged
        ? <>
            <Zoom><h1>a very Simple Editor</h1></Zoom>
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