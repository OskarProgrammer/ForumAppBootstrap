import { useState } from 'react'


import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

//layouts
import { HomeLayout } from './layouts/HomeLayout'


//pages
import { MainPage, mainPageLoader } from './pages/MainPage'
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from './pages/RegisterPage';
import { PostDetails, postDetailsLoader } from './pages/PostDetails';
import { ErrorsPage } from './pages/ErrorsPage';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>} errorElement={<ErrorsPage/>}>
        <Route index loader={mainPageLoader} element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/posts/:id" loader={postDetailsLoader} element={<PostDetails/>}/>
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
