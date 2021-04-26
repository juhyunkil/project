import React from "react";
import { FormControl, Button, FormGroup } from '@material-ui/core';
import { withFormik,ErrorMessage } from "formik";
import * as Yup from 'yup';
//import MailIcon from '@material-ui/icons/Mail';

const LoginForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}) => (
  <div className="login-form">
    <form validate onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl
          className={`form-control ${errors.userId &&
            touched.userId &&
            "is-invalid"}`}
          id="userId"
          type="email"
          value={values.userId}
          placeholder="enter e-mail"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/*errors.userId && touched.userId && (
          <div style={{ color: "red" }}>{errors.userId}</div>
        )*/}
        <ErrorMessage name="userId" />
      </FormGroup>

      <FormGroup>
        <FormControl
          id="password"
          type="password"
          value={values.password}
          placeholder="Enter password"
          onChange={handleChange}
        />
        {/*errors.password && touched.password && (
          <div style={{ color: "red" }}>{errors.password}</div>
        )*/}
        <ErrorMessage name="password" />
      </FormGroup>
      
      <Button className="btn-primary" type="submit" disabled={values.loggingIn}>
        Login
      </Button>
      <br />
      {values.authFailed && (
        <strong style={{ color: "red" }}>
          아이디와 비밀번호를 확인해주세요{" "}
        </strong>
      )}
    </form>
  </div>
);

const LoginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
})

export default withFormik({
  mapPropsToValues: ({ user }) => {
    return { ...user };
  },
  handleSubmit: (user, formikBag) => {
    const { onLoginClicked } = formikBag.props;
    onLoginClicked(user);
  },
  validationSchema:LoginValidation,
  enableReinitialize: true,
  displayName: "LoginForm"
})(LoginForm);
/*
import React from 'react';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {FormControl, Button} from '@material-ui/core';

function LoginForm(){
    const initialValues = {
        id: '',
        password: ''
    }
    const validationSchema = Yup.object({
        id: Yup.string().eamil('Invalid email format').required('Required'),
        password: Yup.string().required('Required')
    })
    const onSubmit = values => {
        console.log('From data', values)
    }
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onsubmit}>
            {
                formik => {
                    return <Form>
                        <FormControl
                        control='input'
                        type='email'
                        label='email'
                        name='email'/>
                        <FormControl
                        control='input'
                        type='password'
                        label='password'
                        name='password'/>
                        <Button type='submit' disabled={!formik.isValid}>
                            Login</Button>
                    </Form>
                }
            }
        </Formik>
    );
}

export default LoginForm;*/