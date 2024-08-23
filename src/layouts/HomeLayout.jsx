import { Link, NavLink, Outlet } from "react-router-dom"
import "bootstrap"
import "./HomeLayout.css"


export const HomeLayout = () => {

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
                            <NavLink to="/register" className="nav-link ms-3">Sign Up</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink to="/login" className="nav-link btn ms-3">Sign In</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}