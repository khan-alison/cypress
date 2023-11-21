import Router from 'next/router'
import { useEffect } from 'react'
import { KEY_STORAGE } from 'src/constants/common'
import HTTP_STATUS_CONTSTANTS from 'src/constants/httpStatus'
import { routerURL } from 'src/navigation/router'
import { ExtendedAppProps } from 'src/pages/_app'
import { getToken } from 'src/service/api'
import loginServices from 'src/service/login'

export const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: ExtendedAppProps) => {
    let pathLocal = ''

    // const isAuthenticated = Cookies.get(KEY_STORAGE.TOKEN);
    // const codeToken = Cookies.get(KEY_STORAGE.CODE_TOKEN);
    // const refresh_token = Cookies.get(KEY_STORAGE.REFRESH_TOKEN);

    let isAuthenticated: any, codeToken: any, refreshToken: any

    if (typeof window !== 'undefined') {
      isAuthenticated = localStorage.getItem(KEY_STORAGE.TOKEN)
      codeToken = localStorage.getItem(KEY_STORAGE.CODE_TOKEN)
      refreshToken = localStorage.getItem(KEY_STORAGE.REFRESH_TOKEN)
    }

    if (typeof window !== 'undefined') {
      // Client-side-only code
      pathLocal = window.location.href
    }
    useEffect(() => {
      // Check the user's authentication status here
      const initialize = async () => {
        getToken(isAuthenticated)

        if (isAuthenticated) {
          try {
            const res = await loginServices.handleRefreshToken({ refreshToken: refreshToken })
            if (res?.statusCode === HTTP_STATUS_CONTSTANTS.ERROR_CODE_401) {
              // Cookies.remove(KEY_STORAGE.TOKEN)
              // Cookies.remove(KEY_STORAGE.REFRESH_TOKEN)
              localStorage.removeItem(KEY_STORAGE.TOKEN)
              localStorage.removeItem(KEY_STORAGE.REFRESH_TOKEN)
              Router.push(routerURL.LOGIN)

              return false
            } else {
              const token = res?.data?.data?.session?.accessToken

              // Cookies.set(KEY_STORAGE.TOKEN, token, { sameSite: 'strict' });
              localStorage.setItem(KEY_STORAGE.TOKEN, token)
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      initialize()

      // If the user is not authenticated, redirect them to the login page
      if (!isAuthenticated) {
        Router.replace(routerURL.LOGIN)
      } else if (isAuthenticated && Router.pathname === routerURL.LOGIN) {
        Router.replace('/')
      }
    }, [isAuthenticated, refreshToken, pathLocal, codeToken])

    // If the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}
