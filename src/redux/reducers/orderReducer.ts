import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userIds: [

    ],
    orderItems: [{
        name: '',
        amount: 0,
        image: '',
        price: '',
        product: '',
        discount: '',
        size: '',
        countInStock: 0
    }

    ],
    orderItemsSelected: [
        {
            name: '',
            amount: 0,
            image: '',
            price: '',
            product: '',
            discount: '',
            size: '',
            countInStock: 0,
        }

    ],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSucessOrder: false,
    createOrderdAt: ''
}


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderData: initialState,
    },
    reducers: {
        addOrderProduct: (state, action) => {
            //console.log(state, action)
            const { orderItem } = action.payload
            const { userID } = action.payload

            const itemOrder = state?.orderData?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                if (itemOrder.amount <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount
                    state.orderData.isSucessOrder = true
                    // state.isErrorOrder = false
                }
            } else {
                state.orderData.userIds = userID
                state.orderData.orderItems.push(orderItem)
            }
        },
        resetOrder: (state) => {
            state.orderData.isSucessOrder = false
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            //console.log('idProduct', idProduct)
            const itemOrder = state?.orderData?.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderData.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemOrder) {
                itemOrder.amount++
            }
            if (itemOrderSelected) {
                itemOrderSelected.amount++;
            }
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderData.orderItems?.find((item) => item?.product === idProduct)
            const itemOrderSelected = state?.orderData.orderItemsSelected?.find((item) => item?.product === idProduct)
            if (itemOrder) {
                itemOrder.amount--
            }
            if (itemOrderSelected) {
                itemOrderSelected.amount--;
            }

        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload
            const { userID }: any = ''
            const itemOrder = state?.orderData?.orderItems?.filter((item) => item?.product !== idProduct)
            const itemOrderSelected = state?.orderData?.orderItemsSelected?.filter((item) => item?.product !== idProduct)//vd 57
            state.orderData.orderItems = itemOrder;
            state.orderData.userIds = userID
            state.orderData.orderItemsSelected = itemOrderSelected;

        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload
            const List: any = []
            listChecked?.map((item: any) => {
                if (item !== "") {
                    List.push(item)
                }

            })
            const { userID }: any = ''
            const itemOrders = state?.orderData.orderItems?.filter((item) => !List.includes(item.product))
            const itemOrderSelected = state?.orderData.orderItems?.filter((item) => !List.includes(item.product))
            state.orderData.orderItems = itemOrders;
            state.orderData.userIds = userID
            state.orderData.orderItemsSelected = itemOrderSelected;

        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload
            const orderSelected: any = []
            state.orderData.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order)
                }
            })
            state.orderData.orderItemsSelected = orderSelected

        }
    },
});
export const orderReducer = orderSlice.reducer;
export const { addOrderProduct, removeOrderProduct, selectedOrder, increaseAmount, decreaseAmount, removeAllOrderProduct } = orderSlice.actions;
export const orderSelector = (state: any) => state.orderReducer.orderData;