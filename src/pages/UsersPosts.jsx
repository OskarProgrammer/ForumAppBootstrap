import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom"
import { fetchFromEndpoint, fetchFromEndpointID } from "../API functions/functions"
import { useEffect, useState } from "react"

export const UsersPosts = () => {
    const [usersPosts, keyPhrase,archievedPosts] = useLoaderData()
    let [posts, setPosts] = useState(usersPosts)
    const navigate = useNavigate()

    const removePost = async(postId) => {
        let newPosts = []

        posts.map((post)=>{
            if (post.id != postId){newPosts.push(post)}
        })

        posts = newPosts
        setPosts(posts)

        const postInfo = await fetchFromEndpointID("http://localhost:3000/posts/",postId)

        let requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postInfo)
        }

        try {
            await fetch("http://localhost:3000/archievedPosts/",requestOptions)
        }catch {
            throw Error("Could not post the post to /archievedPosts")
        }

        requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }

        try {
            await fetch(`http://localhost:3000/posts/${postId}`,requestOptions)
        }catch {
            throw Error("Could not delete the record from /posts/:id")
        }

        return redirect(".")
    }

    useEffect(()=> {
        const check = setTimeout(()=>{navigate(".")},1)
        return () => {
            clearTimeout(check)
        }
    }, [])

    return (
        <div className="container text-center fw-light justify-content-center">
            <h1 className="display-1">Your Posts: </h1>
            {keyPhrase ? <h3 className="display-2 text-dark text-center">Filter: {keyPhrase}</h3> : ""}
            {posts.map((post)=>{
                if (keyPhrase === ""){
                    return (<div className="container bg-dark text-light p-2 m-4 rounded pill col-lg-10 m-auto mb-4 mt-4">
                        <h1>{post.title}</h1>
                        <p>{post.shortText}</p>
                        <p>{post.id}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary me-3 col-lg-1">Read</Link>
                        <button onClick={()=>{removePost(post.id)}}className="btn btn-danger col-lg-1">Remove</button>
                    </div>  )
                } else if (keyPhrase !== "" && (keyPhrase == post.title || keyPhrase == post.id)){
                    return (<div className="container bg-dark text-light p-2 m-4 rounded pill col-lg-10 m-auto mb-4 mt-4">
                        <h1>{post.title}</h1>
                        <p>{post.shortText}</p>
                        <p>{post.id}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary me-3 col-lg-1">Read</Link>
                        <button onClick={()=>{removePost(post.id)}}className="btn btn-danger col-lg-1">Remove</button>
                    </div>)
                }else{ 
                    return ""
                }
            })}
            {archievedPosts.map((post)=>{
                if (keyPhrase === ""){
                    return (<div className="container bg-dark text-light p-2 m-4 rounded pill col-lg-10 m-auto mb-4 mt-4">
                        <h1>{post.title} (ARCHIEVED)</h1>
                        <p>{post.shortText}</p>
                        <p>{post.id}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary me-3 col-lg-1">Read</Link>
                        <button onClick={()=>{removePost(post.id)}}className="btn btn-danger col-lg-1">Remove</button>
                    </div>  )
                } else if (keyPhrase !== "" && (keyPhrase == post.title || keyPhrase == post.id || keyPhrase.toLowerCase() == "archieved")){
                    return (<div className="container bg-dark text-light p-2 m-4 rounded pill col-lg-10 m-auto mb-4 mt-4">
                        <h1>{post.title} (ARCHIEVED)</h1>
                        <p>{post.shortText}</p>
                        <p>{post.id}</p>
                        <Link to={`/posts/${post.id}`} className="btn btn-primary me-3 col-lg-1">Read</Link>
                        <button onClick={()=>{removePost(post.id)}}className="btn btn-danger col-lg-1">Remove</button>
                    </div>)
                }else{ 
                    return ""
                }
            })}
        </div>
    )
}


export const usersPostsLoader = async() => {
    const {personID} = await fetchFromEndpoint("http://localhost:3000/currentUser")
    const posts = await fetchFromEndpoint("http://localhost:3000/posts")
    const archievedPosts = await fetchFromEndpoint("http://localhost:3000/archievedPosts")
    const {keyPhrase} = await fetchFromEndpoint("http://localhost:3000/keyPhrase")
    let usersPosts = []

    posts.map((post)=>{
        if (post.authorID == personID) {
            usersPosts.push(post)
        }
    })


    return [usersPosts, keyPhrase, archievedPosts]
}