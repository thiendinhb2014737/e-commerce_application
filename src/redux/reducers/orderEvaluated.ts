import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    ListOrderEvaluated: [
        {
            id: '',
        }
    ],
    isSucesslovePro: false,
}
export const orderEvaluatedSlide = createSlice({
    name: 'orderEvaluated',
    initialState: {
        orderEvaluatedData: initialState,
    },
    reducers: {
        addorderEvaluateProduct: (state, action) => {
            console.log('orderEvaluatedData', action.payload)
            state.orderEvaluatedData.ListOrderEvaluated.push(action.payload)

        },
    },
})

// Action creators are generated for each case reducer function
export const orderEvaluatedReducer = orderEvaluatedSlide.reducer;
export const { addorderEvaluateProduct } = orderEvaluatedSlide.actions
export const orderEvaluatedSelector = (state: any) => state.orderEvaluatedReducer.orderEvaluatedData;