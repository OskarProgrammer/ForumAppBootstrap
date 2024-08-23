import { Form } from "react-router-dom"

export const RegisterPage = () => {
    return (
        <div className="container col-lg-6 col-md-12 rounded pill bg-dark text-center mt-4 p-4 justify-content-center">
            <h1 className="fst-italic text-light display-5 mb-4">Register Form</h1>
            <Form method="GET">
                <div class="">
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="text" class="form-control" placeholder="Login"/>
                    </div>
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="text" class="form-control" placeholder="Password"/>
                    </div>
                    <div class="container col-lg-5 col-md-5 col-sm-5 mb-3">
                        <input type="text" class="form-control" placeholder="Repeated Password"/>
                    </div>
                    <button className="btn btn-light col-3 col-sm-2">
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}