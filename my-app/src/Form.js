import React, {useState, useEffect} from 'react';
import { withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values,touched, errors, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("status has changed!", status);
        status && setUsers(users => [...users, status]);
        console.log(users);
    }, [status]);

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
                    {touched.userEmail && errors.userEmail && (
                        <p className ="erors">{errors.userEmail}</p>
                    )}
                </label>
                <label htmlFor ="userPassword">Password
                    <Field
                        id="userPassword"
                        type="password"
                        name="userPassword"
                        placeholder="password"
                    />
                    {touched.userPassword && errors.userPassword &&(
                        <p className="errors">{errors.userPassword}</p>
                    )}
                </label>
                <label htmlFor = "userTermsOfServices" > Terms Of Services
                    <Field
                        id="userTermsOfServices"
                        type="checkbox"
                        name="userTermsOfServices"
                    />
                    {touched.userTermsOfServices && errors.userTermsOfServices &&(
                        <p className ="errors">{errors.userTermsOfServices}</p>
                    )}
                </label>
                <button type ="submit">Submit</button>
            </Form>
            {   users.map(user =>(
                    <ul key={user.id}>
                        <li>Name: {user.userName}</li>
                        <li>Email: {user.userEmail}</li>
                    </ul>
            ))}
        </div>
    );
};

//this creates a 'super form'
const FormikUserForm = withFormik({
    mapPropsToValues({name, userEmail, userPassword, userTermsOfServices}){
        return{
            userName: name || "",
            userEmail: userEmail || "",
            userPassword:  userPassword || "",
            userTermsOfServices: userTermsOfServices || false
        };
    },
    validationSchema: Yup.object().shape({
        userName: Yup.string().required(),
        userEmail: Yup.string().required(),
        userPassword: Yup.string().required(),
        userTermsOfServices: Yup.string().required()
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios.post("https://reqres.in/api/users/", values).then(response =>{
            setStatus(response.data);
            resetForm();
        }).catch(error =>{
            console.log('errpr: ', error);
        });
    }
})(UserForm);

export default FormikUserForm;