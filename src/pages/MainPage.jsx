import { Link, useLoaderData } from "react-router-dom"
import {fetchFromEndpoint} from "../API functions/functions"

export const MainPage = () => {
    const posts = useLoaderData()

    return (
        <div className="container-small ms-4 me-4 p-3 mb-5 mt-5 justify-content-start bg-dark">
            <h1 className="display-3 text-light text-center fw-bold">Posts</h1>
            <div className="row">
                {posts.map((post)=>(
                    <div className="col-sm-4 mt-3 mb-3 col-md-4 col-lg-3">
                        <div class="card text-center">
                            <div class="card-body">
                                <h4 class="card-title">{post.title}</h4>
                                <p class="card-text">{post.shortText}</p>
                                <Link to={`/posts/${post.id}`} class="btn btn-dark">Read</Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export const mainPageLoader = async() => {
    const posts = fetchFromEndpoint("http://localhost:3000/posts")

    return posts
}