import { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, firstName, lastName) => {
    setError(null)
    setIsPending(true)

    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // //upload user thumbnail
      // const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`

      // const image = await projectStorage.ref(uploadPath).put(thumbnail)
      // const imageURL = await image.ref.getDownloadURL();

      // // add display name to user
      // await res.user.updateProfile({ displayName, photoURL: imageURL })

      //create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({
        firstName,
        lastName,
        id: res.user.uid,
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        console.log('user signed up')
        setIsPending(false)
        setError(null)
      }
    }
    catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    setIsCancelled(false) // add this line
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}