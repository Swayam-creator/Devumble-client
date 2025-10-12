import {Routes,Route} from 'react-router';
import Body from './Body';
import Signup from './components/Signup';
import Login from './components/Login';
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Body/>}>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>     
    </>
  )
}

export default App
