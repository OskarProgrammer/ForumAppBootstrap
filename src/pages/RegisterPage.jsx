import { Form, Link, redirect, useActionData } from "react-router-dom"

export const RegisterPage = () => {
    const dataFromForm = useActionData()

    return (
        <div className="container col-lg-6 col-md-12 rounded pill bg-dark text-center mt-4 p-4 justify-content-center">
            <h1 className="fst-italic text-light display-5 mb-4">Register Form</h1>
            <Form method="POST" action="/register">
                <div class="">
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="text" class="form-control" name="login" placeholder="Login"/>
                    </div>
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="password" class="form-control" name="password" placeholder="Password"/>
                    </div>
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="password" class="form-control" name="repeatedPassword" placeholder="Repeated Password"/>
                    </div>
                    <p class="text-light">Have got account already ? <Link to="/login">Click here!</Link> </p>
                    {dataFromForm && dataFromForm.error && <p>{dataFromForm.error}</p>}
                    <button className="btn btn-light col-3 col-sm-2">
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}

export const registerAction = async( {request} ) => {
    const data = await request.formData()
    const login = data.get("login")
    const password = data.get("password")
    const repeatedPassword = data.get("repeatedPassword")

    if (login == "") {
        return {error: "Login can not be null"}
    }else if (password == "" || repeatedPassword == ""){
        return {error: "Password and repeated password can not be null"}
    }else if (password != repeatedPassword){
        return {error: "Password and repeated password have to be the same"}
    }

    const newUser = {
        id: crypto.randomUUID(),
        login: login, 
        password: password,
        isAdmin: false,
    }

    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    }

    try {
        await fetch ("http://localhost:3000/users/", requestOptions)
    }catch {
        return {error: "Something was wrong with the request, please try again later"}
    }

    return redirect("/")
}
