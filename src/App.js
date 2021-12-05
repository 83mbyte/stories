
import { Routes, Route } from 'react-router-dom';
import Aside from "./components/Aside/Aside";
import CreateArticle from './components/CreateArticle/CreateArticle';
import IndexPage from './components/IndexPage/IndexPage';
import Login from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import Registration from './components/Registration/Registration';
import SingleArticleContainer from './components/SingleArticle/SingleArticleContainer';
 
function App() {
  return (
    <div id="colorlib-page">
      <a href="#" className="js-colorlib-nav-toggle colorlib-nav-toggle"><i></i></a>

      <Aside />
      <div id="colorlib-main">
        <section className="ftco-section">
          <div className="container">
            <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registration" element={<Registration />} />
 
              <Route path="/article/:articleId" element={<SingleArticleContainer />} />
              <Route path="/profile" element={<ProfileContainer />} />
              <Route path="/create" element={<CreateArticle />} />
            </Routes>




            {/* end of div container + end of section */}
          </div>
        </section>
      </div>

      {/* end of div id="colorlib-page" */}
    </div>
  );
}

export default App;
