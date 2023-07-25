import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import showMessage from "src/@core/components/Message";
import { KEY_STORAGE } from "src/constants/common";
import TYPE_CONSTANTS from "src/constants/type";
import { checkSuccessRequest, getToken } from "src/service/api";
import loginServices from "src/service/login";

export const useLogin = () => {
  const router = useRouter();

  const handleLogin = useMutation(
    async (params: any) => {
      try {
        const response = await loginServices.handleLogin(params);

        return { response }
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (res: any) => {
        if (checkSuccessRequest(res?.response)) {
          const token = res?.response?.data?.access_token;
          getToken(token);
          Cookies.set(KEY_STORAGE.TOKEN, token, { sameSite: 'strict' });
          showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, "Login on success");
          router.push("/");
        }
        else {
          showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, "Login fail !");
        }
      },
    },
  );

  return {
    onLogin: handleLogin.mutate,
  };
};