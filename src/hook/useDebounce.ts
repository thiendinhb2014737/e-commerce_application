
import { useEffect, useState } from 'react'


export const useDebounce = (value: any, delay: any) => {
    const [valueDebounce, setValueDebounce] = useState('')
    useEffect(() => {
        const handle = setTimeout(() => {
            setValueDebounce(value)
        }, delay)
        return () => {
            clearTimeout(handle)
        }
    }, [value])



    return valueDebounce
}