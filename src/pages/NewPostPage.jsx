import { Form, redirect, useActionData } from "react-router-dom"
import { fetchFromEndpoint, fetchFromEndpointID } from "../API functions/functions"

export const NewPostPage = () => {
    const dataAction = useActionData()

    return (
        <Form method="POST" action="/newPost" className="container mt-3 mb-5 p-5 col-lg-5 bg-dark d-flex flex-column justify-content-center text-center rounded pill">
            <h1 className="display-4 text-light">Create new question</h1>
            <div class="container col-lg-9 col-md-9 col-sm-9 mb-3 mt-5 ">
                <input type="text" class="form-control" name="titleText" placeholder="Title for your question"/>
            </div>
            <div class="container col-lg-9 col-md-9 col-sm-9 mb-3">
                <input type="text" class="form-control" name="shortText" placeholder="Short text "/>
            </div>
            <div class="container col-lg-9 col-md-9 col-sm-9 mb-3">
                <textarea class="form-control" name="mainText" placeholder="Your main text"/>   
            </div>
            {dataAction && dataAction.error && <p className="text-light">{dataAction.error}</p>}
            <button className="container btn btn-outline-success col-lg-3 col-sm-2 col-md-5">
                Submit
            </button>
            
        </Form>
    )
}

export const newPostAction = async ({request}) => {
    const data = await request.formData()
    const currentUser = await fetchFromEndpoint("http://localhost:3000/currentUser")
    const personInfo = await fetchFromEndpointID("http://localhost:3000/users/",currentUser.personID)

    const title = data.get("titleText")
    const shortText = data.get("shortText")
    const mainText = data.get("mainText")

    if (title == "" || mainText == "") {
        return {error: "Title and main text can not be null"}
    }

    const newPost = {
        "id": crypto.randomUUID(),
        "title": title,
        "shortText": shortText,
        "authorID": currentUser.personID,
        "authorName": personInfo.login,
        "mainText": mainText
      }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost)
    }

    try {
        await fetch("http://localhost:3000/posts/", requestOptions)
    }catch {
        return {error: "Something went wrong during posting informations to database"}
    }


    return redirect("/")
}