import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../firebase/config"

export const useCollection = (collection, _queries, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  // const queries = useRef(_queries).current
  // const orderBy = useRef(_orderBy).current

  useEffect(() => {
    try {
      setIsPending(true)
      let ref = projectFirestore.collection(collection)
      if (_queries) {
        _queries.forEach(query => {
          ref = ref.where(...query)
        })
      }
      if (_orderBy) {
        ref = ref.orderBy(..._orderBy)
      }

      const unsubscribe = ref.onSnapshot(snapshot => {
        let results = []
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id })
        });

        // update state
        setDocuments(results)
        setError(null)
        setIsPending(false)
      }, error => {
        console.log(error)
        setError('could not fetch the data')
        setIsPending(false)
      })

      // unsubscribe on unmount
      return () => unsubscribe()

    } catch (e) {
      console.log(e)
    }

  }, [collection, JSON.stringify(_queries), JSON.stringify(_orderBy)])

  return { documents, error, isPending }
}