import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';

function UserForm({touched, errors }){

        const [users, setUsers] = useState([]);
    return(
        <div className = "newUserForm">
            <Form>
                <label htmlFor ="userName">Name
                    <Field
                        id="userName"
                        type="text"
                        name="userName"
                        placeholder="name"
                    />
                    {touched.userName && errors.userName && (
                        <p className="errors">{errors.userName}</p>
                    )}
                </label>
                <label htmlFor ="userEmail">Email
                    <Field
                        id="userEmail"
                        type="email"
                        name="userEmail"
                        placeholder="email"
                    />
                </label>
                <label htmlFor ="userPassword">Password
                    <Field
                        id="userPassword"
                        type="password"
                        name="userPassword"
                        placeholder="password"
                    />
                </label>
                <label htmlFor = "userTermsOfServices" > Terms Of Services
                    <Field
                        id="userTermsOfServices"
                        type="checkbox"
                        name="userTermsOfServices"
                    />
                </label>
                <button type ="submit">Submit</button>
            </Form>
        </div>
    );
};

//this creates a 'super form'
const FormikUserForm = withFormik({
    mapPropstoValues({name, email, password, termsOfServices}){
        return{
            userName: name || "",
            userEmail: email || "",
            userPassword: password || "",
            userTermsOfServices: termsOfServices || false
        };
    },
    validationSchema: Yup.object().shape({
        userName: Yup.string().required(),
        userEmail: Yup.string().required(),
        userPassword: Yup.string().required(),
        userTermsOfServices: Yup.string().required()
    })
})(UserForm);

export default FormikUserForm;