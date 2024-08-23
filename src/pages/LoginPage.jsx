import { Form } from "react-router-dom"

export const LoginPage = () => {


    return (
        <div className="container col-lg-6 col-md-6 col-sm p-5 rounded pill bg-dark text-center mt-4 justify-content-center">
            <h1 className="fst-italic text-light display-5 mb-5">Login Form</h1>
            <Form method="GET">
                <div class="">
                    <div class="container col-sm col-md-10 col-lg-6 mb-3">
                        <input type="text" class="form-control" placeholder="Login"/>
                    </div>
                    <div class="container col-sm col-md-10 col-lg-6 mb-3">
                        <input type="text" class="form-control" placeholder="Password"/>
                    </div>
                    <button className="btn btn-light col-lg-3 col-md-5 col-sm-5 fs-5">
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}