import { useState } from 'react'


import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

//layouts
import { HomeLayout, homeLayoutLoader } from './layouts/HomeLayout'


//pages
import { MainPage, mainPageLoader } from './pages/MainPage'
import { loginAction, LoginPage } from "./pages/LoginPage"
import { registerAction, RegisterPage } from './pages/RegisterPage';
import { PostDetails, postDetailsLoader } from './pages/PostDetails';
import { ErrorsPage } from './pages/ErrorsPage';
import { logOutLoader, LogOutPage } from "./pages/LogOutPage"
import { newPostAction, NewPostPage } from './pages/NewPostPage';
import { UsersPosts, usersPostsLoader } from './pages/UsersPosts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>} loader={homeLayoutLoader} errorElement={<ErrorsPage/>}>
        <Route index loader={mainPageLoader} element={<MainPage/>}/>
        <Route path="/login"  element={<LoginPage/>} action={loginAction}/>
        <Route path="/register" element={<RegisterPage/>} action={registerAction}/>
        <Route path="/posts/:id" loader={postDetailsLoader} element={<PostDetails/>}/>
        <Route path="/logOut" loader={logOutLoader} element={<LogOutPage/>}/>
        <Route path="/newPost" element={<NewPostPage/>} action={newPostAction}/>
        <Route path="/yourPosts" element={<UsersPosts/>} loader={usersPostsLoader}/>
    </Route>
  )
)


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
