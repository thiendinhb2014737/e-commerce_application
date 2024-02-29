import { useMutation } from '@tanstack/react-query'


export const useMutationHooks = (fnCallBack: any) => {
    const mutation = useMutation({
        mutationFn: fnCallBack
    })
    return mutation
}