import { useLoaderData, useParams } from "react-router-dom"
import { fetchFromEndpointID } from "../API functions/functions"

export const PostDetails = () => {
    const {id} = useParams()
    const postInfo = useLoaderData()

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
        </div>
    )
}

export const postDetailsLoader = async ({params}) => {
    const {id} = params
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

    return postInfo
}