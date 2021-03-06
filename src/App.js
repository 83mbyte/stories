

import { Routes, Route } from 'react-router-dom';
import Aside from "./components/Aside/Aside";
import AuthorContainer from './components/Author/AuthorContainer';
import CreateArticle from './components/CreateArticle/CreateArticle';
import Editor from './components/Editor/Editor';
import IndexPage from './components/IndexPage/IndexPage';
import Login from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import Registration from './components/Registration/Registration';
import SingleArticleContainer from './components/SingleArticle/SingleArticleContainer';
 


function App() {
   
const clickCanvas =(e)=>{
  console.log()
  document.body.style.cssText="visibility: visible;";
}




  return (
    <>
      <div id="colorlib-page">
        <a className="js-colorlib-nav-toggle colorlib-nav-toggle" onClick={clickCanvas}><i></i></a>


        <Aside />
        <div id="colorlib-main">
          <section className="ftco-section">
            <div className="container">
              <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />

                <Route path="/article/:articleId" element={<SingleArticleContainer />} />
                <Route path="/author/:authorId" element={<AuthorContainer />} />
                <Route path="/profile" element={<ProfileContainer />} />
                <Route path="/create" element={<CreateArticle />} />
                <Route path="/editor/:articleId" element={<Editor />} />

              </Routes>




              {/* end of div container + end of section */}
            </div>
          </section>
        </div>

        {/* end of div id="colorlib-page" */}
      </div>
       
    </>
  );
}

export default App;
