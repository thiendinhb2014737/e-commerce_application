import { createSlice } from '@reduxjs/toolkit'

// interface LoveProState {
//     loveProItems: [
//         {
//             name: String,
//             image: String,
//             price: Number,
//             product: Number,
//             discount: Number,
//             countInStock: Number
//         }
//     ],
//     loveProItemsSelected: [
//         {
//             name: String,
//             image: String,
//             price: Number,
//             product: Number,
//             discount: Number,
//             countInStock: Number
//         }

//     ],
//     isSucesslovePro: Boolean,
// }


const initialState = {
    // userIds: [],
    loveProItems: [
        {
            name: '',
            image: '',
            price: '',
            product: '',
            discount: '',
            countInStock: 0
        }
    ],
    // loveProItemsSelected: [
    //     {
    //         name: '',
    //         image: '',
    //         price: '',
    //         product: '',
    //         discount: '',
    //         countInStock: 0
    //     }

    // ],
    //isSucesslovePro: false,
}
export const loveProSlide = createSlice({
    name: 'lovePro',
    initialState: {
        loveProData: initialState,
    },
    reducers: {
        addloveProProduct: (state, action) => {
            const { loveProItem }: any = action.payload
            // console.log('action.payload', loveProItem)
            const itemlovePro = state?.loveProData?.loveProItems?.find((item) => item?.product === loveProItem.product)
            if (itemlovePro) {
                //state.loveProData.isSucesslovePro = true
            } else {
                //state.userIds.push(userID)///
                state.loveProData.loveProItems.push(loveProItem)
            }
        },
        // resetlovePro: (state) => {
        //     state.loveProData.isSucesslovePro = false
        // },

        removeloveProProduct: (state, action) => {
            const { idProduct } = action.payload
            const itemlovePro = state?.loveProData?.loveProItems?.filter((item) => item?.product !== idProduct)
            //const itemloveProSelected = state?.loveProData?.loveProItemsSelected?.filter((item) => item?.product !== idProduct)//vd 57
            state.loveProData.loveProItems = itemlovePro;
            //state.loveProData.loveProItemsSelected = itemloveProSelected;

        },

        selectedlovePro: (state, action) => {
            const { listChecked } = action.payload
            const loveProSelected: any = []
            state.loveProData.loveProItems.forEach((lovePro) => {
                if (listChecked.includes(lovePro.product)) {
                    loveProSelected.push(lovePro)
                }
            })
            //  state.loveProData.loveProItemsSelected = loveProSelected

        }
    },
})

// Action creators are generated for each case reducer function
export const loveProReducer = loveProSlide.reducer;
export const { addloveProProduct, removeloveProProduct, selectedlovePro } = loveProSlide.actions
export const loveProSelector = (state: any) => state.loveProReducer.loveProData;