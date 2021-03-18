import { stringify } from 'node:querystring';
import React, 
      { createContext, 
        ReactNode, 
        useContext, 
        useState, 
        useEffect } from 'react';
import { useJwt } from "react-jwt";

const defaultContextValue: AuthContextType = {
  user: {
    id: null,
    email: null
  },
  setUser: () => {},
  token: '',
  setToken: () => {}
}

const defaultTokenValue = {
  token: null
}


export const AuthContext = createContext<AuthContextType>(defaultContextValue)

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(defaultContextValue.user);
  const t = localStorage.getItem('token')
  const [token, setToken] = useState(t != null ? t : defaultContextValue.token)

  useEffect(() => {
    if (token && token != '') 
      localStorage.setItem('token', token)
    
    function getToken() {
      var tokenStr = localStorage.getItem('token');
      if (tokenStr) {
        setToken(tokenStr)
      }
      try {
        return tokenStr
      } catch (ex) {
        return null; // or do some other error handling
      }
    }
    getToken()
  }, [token])
  
  const { decodedToken, isExpired, reEvaluateToken } = useJwt(token);
  
  return (
    <AuthContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

// interface Props {
//   children: ReactNode
// }

// type Context = {
//   loggedIn: boolean,
//   setLoggedIn: Dispatch<SetStateAction<boolean>>
// }

// const initialContext: Context = {
//   loggedIn: false,
//   setLoggedIn: (): void => {}
// }

// const AuthContext = createContext<Context>(initialContext)  

// export const useAuth = () => useContext(AuthContext)

// export const AuthProvider = ({ children }: Props) => {
//   const [loggedIn, setLoggedIn] = useState<boolean>(false)

//   console.log(loggedIn)

//   return (
//     <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }