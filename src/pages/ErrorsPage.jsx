import { Link, useRouteError } from "react-router-dom"

export const ErrorsPage = () => {
    const error = useRouteError()

    return(
        <div className="container text-center mt-5">
            <h1 className="display-1">
                Ops! There was an error!
            </h1>
            <div className="text-dark fst-italic fs-5">
                Error message: {error.message}
            </div>
            <Link to="/" className="btn btn-lg btn-dark m-5">Home Page</Link>
        </div>
    )
}