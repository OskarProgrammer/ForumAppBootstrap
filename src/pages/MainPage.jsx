import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom"
import {fetchFromEndpoint} from "../API functions/functions"
import { useEffect, useState } from "react"

export const MainPage = () => {
    const [posts, keyPhrase, archievedPosts] = useLoaderData()
    const [postsInfo, setPostsInfo] = useState(posts)
    const navigate = useNavigate()

    useEffect(()=> {
        const check = setTimeout(()=>{navigate(".")},1)
        return () => {
            clearTimeout(check)
        }
    }, [])

    return (
        <div className="container-small ms-4 me-4 p-3 mb-5 mt-5 justify-content-start bg-dark">
            <h1 className="display-3 text-light text-center fw-bold">Posts</h1>
            {keyPhrase ? <h3 className="display-2 text-light text-center">Filter: {keyPhrase}</h3> : ""}
            <div className="row">
                {postsInfo.map((post)=>{
                    if (keyPhrase === "" ){
                        return(<div className="col-sm-4 mt-3 mb-3 col-md-4 col-lg-3">
                             <div class="card text-center">
                                <div class="card-body">
                                    <h4 class="card-title">{post.title}</h4>
                                    <p class="card-text">{post.shortText}</p>
                                    <p>Author: {post.authorName}</p>
                                    <Link to={`/posts/${post.id}`} className="btn btn-dark">Read</Link>
                                </div>
                            </div>
                        </div>)
                    }else if (keyPhrase != "" && (keyPhrase == post.authorName || keyPhrase == post.authorID || keyPhrase == post.title)){
                         return(<div className="col-sm-4 mt-3 mb-3 col-md-4 col-lg-3">
                            <div class="card text-center">
                                <div class="card-body">
                                    <h4 class="card-title">{post.title}</h4>
                                    <p class="card-text">{post.shortText}</p>
                                    <p>Author: {post.authorName}</p>
                                    <Link to={`/posts/${post.id}`} className="btn btn-dark">Read</Link>
                                </div>
                            </div>
                        </div>)
                    }else{
                        return ""
                    }
                    
                })}

                {archievedPosts.map((post)=>{
                    if (keyPhrase === "" ){
                        return(<div className="col-sm-4 mt-3 mb-3 col-md-4 col-lg-3">
                             <div class="card text-center">
                                <div class="card-body">
                                    <h4 class="card-title">{post.title} (ARCHIEVED)</h4>
                                    <p class="card-text">{post.shortText}</p>
                                    <p>Author: {post.authorName}</p>
                                    <Link to={`/posts/${post.id}`} className="btn btn-dark">Read</Link>
                                </div>
                            </div>
                        </div>)
                    }else if (keyPhrase != "" && (keyPhrase == post.authorName || keyPhrase == post.authorID || keyPhrase == post.title || keyPhrase.toLowerCase() == "archieved")){
                         return(<div className="col-sm-4 mt-3 mb-3 col-md-4 col-lg-3">
                            <div class="card text-center">
                                <div class="card-body">
                                    <h4 class="card-title">{post.title} (ARCHIEVED)</h4>
                                    <p class="card-text">{post.shortText}</p>
                                    <p>Author: {post.authorName}</p>
                                    <Link to={`/posts/${post.id}`} className="btn btn-dark">Read</Link>
                                </div>
                            </div>
                        </div>)
                    }else{
                        return ""
                    }
                    
                })}

            </div>
        </div>
    )
}

export const mainPageLoader = async() => {
    const posts = await fetchFromEndpoint("http://localhost:3000/posts")
    const {keyPhrase} = await fetchFromEndpoint("http://localhost:3000/keyPhrase/")
    const archievedPosts = await fetchFromEndpoint("http://localhost:3000/archievedPosts")

    return [posts, keyPhrase, archievedPosts]
}