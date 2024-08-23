import { redirect, useLoaderData } from "react-router-dom"

export const LogOutPage = () => {
    const loaderData = useLoaderData()
    redirect("/")

    return(<></>)
}

export const logOutLoader = async () => {
    const newCurrentUser = {
        "personID": "",
        "isLogged": false,
        "isAdmin": false,
    }

    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCurrentUser)
    }

    try {
        await fetch ("http://localhost:3000/currentUser/", requestOptions)
    }catch {
        throw Error("Something was wrong with the request, please try again later")
    }

    return redirect("/")
}