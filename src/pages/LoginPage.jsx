import { Form, Link, redirect, useActionData } from "react-router-dom"
import { fetchFromEndpoint } from "../API functions/functions"

export const LoginPage = () => {
    const dataFromForm = useActionData()

    return (
        <div className="container col-lg-6 col-md-6 col-sm p-5 rounded pill bg-dark text-center mt-4 justify-content-center">
            <h1 className="fst-italic text-light display-5 mb-5">Login Form</h1>
            <Form method="POST" action="/login">
                <div class="">
                    <div class="container col-sm col-md-10 col-lg-6 mb-3">
                        <input type="text" class="form-control" name="login" placeholder="Login"/>
                    </div>
                    <div class="container col-sm col-md-10 col-lg-6 mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Password"/>
                    </div>
                    <p class="text-light">Havent got account yet ? <Link to="/register">Click here!</Link> </p>
                    {dataFromForm && dataFromForm.error && <p>{dataFromForm.error}</p>}
                    <button className="btn btn-light col-lg-3 col-md-5 col-sm-5 fs-5">
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}

export const loginAction = async ({request}) => {
    const data = await request.formData()
    const login = data.get("login")
    const password = data.get("password")

    if (login == "" || password == "") {
        return {error: "Login and password can not be null"}
    }

    const users = await fetchFromEndpoint("http://localhost:3000/users")
    let isFound = false
    let newCurrentUser = {}

    users.map((user)=>{
        if (user.login == login && user.password == password){
            isFound = true
            newCurrentUser = {
                "personID": user.id,
                "isLogged": true,
                "isAdmin":user.isAdmin
            }
        }
    })

    if (!isFound) {
        return {error: "Login or password is invalid"}
    }

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCurrentUser)
    }

    try {
        await fetch("http://localhost:3000/currentUser/",requestOptions)
    }catch{
        return {error: "Something went wrong during uploading the data"}
    }


    return redirect("/")
}