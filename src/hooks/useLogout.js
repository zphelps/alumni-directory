import { useEffect, useState } from 'react'
import { projectAuth, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    try {

      // sign the user out
      await projectAuth.signOut()

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
        console.log('user logged out')
      }
    }
    catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    setIsCancelled(false) // add this line
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}