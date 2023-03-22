import { useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'


export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    //realtime data for document
    useEffect(() => {
        setIsPending(true)
        const ref = projectFirestore.collection(collection).doc(id)
        const unsub = ref.onSnapshot(snap => {
            if (!snap.exists) {
                setError('That document does not exist')
                return
            }
            setDocument({ ...snap.data(), id: snap.id })
            setIsPending(false)
            setError(null)
        }, err => {
            console.log(err.message)
            setIsPending(false)
            setError('Could not fetch the data for that resource')
        })

        return () => unsub()

    }, [collection, id])

    return { document, error, isPending }
}