import { Form, Link, NavLink, Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { fetchFromEndpoint} from "../API functions/functions"
import "bootstrap"
import "./HomeLayout.css"


export const HomeLayout = () => {
    const [keyPhrase, setKeyPhrase] = useState("")
    const currentUserData = useLoaderData()

    const sendKeyPhrase = async () => {
        const newKeyPhrase = {
            "keyPhrase": keyPhrase
        }

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newKeyPhrase)
        }

        try {
            await fetch("http://localhost:3000/keyPhrase/",requestOptions)
        }catch {
            throw Error("Error during putting the data")
        }
        setKeyPhrase("")
        return redirect()
    }


    return (
        <div className="home-layout">
            <h1 className="display-1 text-center fw-bold mt-3">
                Forum App
            </h1>
            <nav class="navbar rounded pill navbar-expand-lg navbar-dark bg-dark ms-3 me-3 ps-4 mt-3">
                <Link to="/" class="navbar-brand fw-bolder">CrowForum</Link>
                <div class="fs-5" id="navbarNav">
                    <ul class="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link ms-3">Home Page</NavLink>
                        </li>
                        <li class="nav-item">
                            {currentUserData.isLogged ? <Link to="/newPost" className="nav-link ms-3">Create New Post</Link>: <NavLink to="/register" className="nav-link ms-3">Sign Up</NavLink>}
                        </li>
                        <li class="nav-item">
                            {currentUserData.isLogged ? <Link to="/yourPosts" className="nav-link ms-3">Your Posts</Link> : <NavLink to="/login" className="nav-link ms-3">Sign In</NavLink>}
                        </li>
                        <li class="nav-item">
                            {currentUserData.isLogged ? <Link to="/logOut" className="nav-link ms-3">Log Out</Link> : ""}
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container-lg mt-4 text-center text-light p-3">
                    <Form class="form-inline row me-1" put="post" action={"/"}>
                        <div class="col-lg-10 col-md-9 col-sm-10 me-sm-0">
                            <input class="form-control border-dark" type="search" onChange={(e)=>{setKeyPhrase(e.target.value)}} value={keyPhrase} placeholder="Search" aria-label="Search"/>
                        </div>
                        
                        <button class="btn btn-outline-success col-lg-2 col-md-3 col-sm-2" onClick={()=>{sendKeyPhrase()}}>Search</button>
                    </Form>
            </div>


            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export const homeLayoutLoader = async () => {
    const currentUser = await fetchFromEndpoint("http://localhost:3000/currentUser")

    return currentUser
}
