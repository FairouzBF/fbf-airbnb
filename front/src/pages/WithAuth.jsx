import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const WithAuth = (WrappedComponent) => {

    return () => {
        const router = useRouter()
        const [isLogged, setisLogged] = useState(false)
        useEffect(() => {

            let token = localStorage.getItem('Auth')
            if (!token) {
                setisLogged(false)
                router.push('/auth/login')
            }
            else {
                setisLogged(true)
            }
        }, []);

        if (isLogged) {
            return <WrappedComponent />
        }
        else {
            return null;
        }
    }
}

export default WithAuth;
