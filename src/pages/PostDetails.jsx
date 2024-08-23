import { redirect, useLoaderData, useNavigate, useParams } from "react-router-dom"
import { fetchFromEndpoint, fetchFromEndpointID } from "../API functions/functions"
import { useEffect, useState } from "react"

export const PostDetails = () => {
    const {id} = useParams()
    const [postInfo, comments, login, isAdmin, isLogged] = useLoaderData()
    const navigate = useNavigate()
    let [commentsPost, setCommentsPost] = useState(comments)
    let [newComment, setNewComment] = useState("")

    useEffect(()=> {
        const check = setTimeout(()=>{navigate(".")},1)
        return () => {
            clearTimeout(check)
        }
    }, [])


    const addComment = async () => {
        const currentUserInfo = await fetchFromEndpoint("http://localhost:3000/currentUser")

        const newCommentData = {
            "id": crypto.randomUUID(),
            "authorID": currentUserInfo.personID,
            "message": newComment,
            "postID": id,
            "data": new Date()
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCommentData)
        }

        try {
            await fetch("http://localhost:3000/comments/",requestOptions)
        }catch {
            throw Error("Error during posting the new comment")
        }

        let newStateComment = newCommentData
        newStateComment.authorName = login 

        commentsPost = [...commentsPost, newStateComment]
        setCommentsPost(commentsPost)
        setNewComment("")

        return redirect(".")
    }


    const removeComment = async (commentInfo) => {
        let newCommentsPost = []
        commentsPost.map((comment)=>{
            if (comment.id != commentInfo.id){
                newCommentsPost.push(comment)
            }
        })
        commentsPost = newCommentsPost
        setCommentsPost(commentsPost)

        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }

        try {
            await fetch(`http://localhost:3000/comments/${commentInfo.id}`,requestOptions)
        }catch {
            throw Error("Error during posting the new comment")
        }

        return redirect(".")
    }

    return (
        <div className="container-lg text-center mt-5">
            <h1 className="display-1 fw-bolder fst-italic">Post {id} {postInfo.isArchieved ? "(ARCHIEVED POST)": ""}</h1>
            <div className="container">
                <h1 className="display-4 fst-italic mt-5">
                    {postInfo.title}
                </h1>
                <p className="fst-italic">Author {postInfo.authorName}</p>
                <div className="text-start mt-5 mb-5 p-3 fs-5 border border-5 border-dark">
                    {postInfo.mainText}
                </div>
            </div>

            <h2 className="display-2 text-decoration-underline mb-5 fw-bold">Comments sections</h2>
            
            {isLogged && !postInfo.isArchieved ? <div className="container col-lg-12 mb-5 border border-5 border-dark p-3">
                <input className="p-3 col-lg-12" type="text" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} placeholder={`You are commenting as ${login}`} />
                <button className="btn btn-dark btn-lg col-lg-6 mt-2" onClick={()=>{addComment()}}>Submit</button>
            </div> : <div className="container col-lg-12 mb-5 border border-5 border-dark p-3">
                <input className="p-3 col-lg-12" type="text" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} placeholder={`You cant comment this post because you are not logged in or this post is archieved`} disabled/>
                <button className="btn btn-dark btn-lg col-lg-6 mt-2" onClick={()=>{addComment()}} disabled>Submit</button>
            </div>}

            {commentsPost.map( (comment)=>(
                (<div className="container text-center text-light p-5 mb-5 bg-dark rounded pill">
                    <h3>{comment.authorName}</h3>
                    <div className="mb-2 mt-2 pb-2 pt-2">{comment.message}</div>
                    <p>From day: {new Date(comment.data).getDate()}.{new Date(comment.data).getMonth()+1}.{new Date(comment.data).getFullYear()}</p>
                    {isAdmin ? <button className="btn btn-danger btn-lg" onClick={()=>{removeComment(comment)}}>Remove</button> : ""}
                </div>)
            ))}

        </div>
    )
}

export const postDetailsLoader = async ({params}) => {
    const {id} = params
    const { personID, isLogged } = await fetchFromEndpoint("http://localhost:3000/currentUser")
    const { login, isAdmin} = await fetchFromEndpointID("http://localhost:3000/users/",personID)
    let postInfo = {}
    let isActual = false
    
    try {
        postInfo = await fetchFromEndpointID("http://localhost:3000/posts/",id)
        isActual = true
    }catch {
        isActual = false
    }

    if (!isActual){
        try {
            postInfo = await fetchFromEndpointID("http://localhost:3000/archievedPosts/",id)
        } catch {
            throw Error("Not found the post")
        }
    }

    if (!isActual) {
        postInfo.isArchieved = true
    }


    const comments = await fetchFromEndpoint("http://localhost:3000/comments")
    let commentsFromThisPost = []

    comments.map(async (comment)=>{
        if (comment.postID == id) {
            const { login } = await fetchFromEndpointID("http://localhost:3000/users/",comment.authorID)
            comment.authorName = login
            commentsFromThisPost.push(comment)
        }
    })


    return [postInfo, commentsFromThisPost, login, isAdmin, isLogged]
}