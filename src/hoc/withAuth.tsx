import type {ComponentType} from "react";
import {Navigate} from "react-router";

const withAuth =
    <P extends object>(WrappedComponent: ComponentType<P>) => {

        const isAuthenticated = false;

        return ({...props}: P) =>
            isAuthenticated
                ? <WrappedComponent {...props} />
                : <Navigate to="/login" replace/>;

    }


export default withAuth;