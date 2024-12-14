
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import Posts from './Posts';
import Register from './Register';
import Header from './Header';
import Home from './Home';
import Creat from './Creat';
import { UserContextProvider } from './UserContext';
import CreatPost from './CreatPost';
import PostPage from './PostPage';
import Update from './Update';

function App() {
  return (
  <UserContextProvider>
    <BrowserRouter>
   
   <Header />
      <Routes>

    
      <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register"element={<Register/>} />
        <Route path="/Create" element={<CreatPost/>} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/update" element={<Update/>} />

         
    </Routes>
    </BrowserRouter></UserContextProvider>
  );
}

export default App;