import { api } from "../api";

class LoginServices {
    handleLogin = (data: { username: string; password: string; }) => {
        return api.post('auth/login', data);
    };
}

const loginServices = new LoginServices();

export default loginServices;
