import * as yup from "yup"

export const schema = yup.object({
    firstName: yup.string().required("Full Name is required"),
    email: yup.string().required("Email is required").email("This is don't email"),
    phone: yup.string().required("phone is required"),

}).required();

export const schemaLogin = yup.object({
    user_name: yup.string().required("User Name is required"),
    password: yup.string().required("Password is required"),
}).required();