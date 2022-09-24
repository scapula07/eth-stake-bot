import './App.css';
import Layout from './Layout';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
       <Layout>
         <Routes>
            <Route exact path='/' element={<Home/>}>
              
           </Route>
         </Routes>
       </Layout>
       
   
    </div>
  );
}

export default App;
