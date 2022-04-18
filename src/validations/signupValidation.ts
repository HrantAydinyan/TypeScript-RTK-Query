import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .matches(/^(?=.*[A-Z])/, 'Must Contain 6 Characters, One Uppercase')
        .required('Password is required'),
    confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});
