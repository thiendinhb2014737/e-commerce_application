import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { orderReducer } from './reducers/orderReducer';
import { loveProReducer } from './reducers/loveProReducer';
import { orderEvaluatedReducer } from './reducers/orderEvaluated';
const store = configureStore({
    reducer: {
        authReducer,
        orderReducer,
        loveProReducer,
        orderEvaluatedReducer
    },
});

export default store;