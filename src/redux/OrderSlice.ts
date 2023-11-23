import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  order: [],
  fullOrder: [],
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, action: any) => {
      const isItemInOrder = state.order.some((item: any) =>
        item.orderDetails.some(
          (detail: any) => detail?.product?.id === action.payload.id,
        ),
      );

      if (!isItemInOrder) {
        state.order.unshift({
          orderDetails: [{qty: 1, product: {...action.payload}}],
        });
      } else {
        console.log('Item already exists in orderDetails');
      }
    },

    sumItem: (state, action: any) => {
      console.log(action?.payload?.orderDetails);

      const existingOrder = state.order.find((item: any) =>
        item.orderDetails.some(
          (detail: any) => detail?.product?.id === action.payload.id,
        ),
      );

      if (existingOrder) {
        const existingDetail = existingOrder.orderDetails.find(
          (detail: any) => detail?.product?.id === action.payload.id,
        );

        if (existingDetail) {
          console.log('Existing item id:', existingDetail);
          existingDetail.orderDetails.qty++;
          console.log('Item quantity updated');
        } else {
          console.log('Item not found in orderDetails');
        }
      } else {
        console.log('Item not found in orderDetails');
      }
    },

    // let res = state.order?.orderDetails?.product?.filter((or: any) => {
    //   if (value === or?.id) or.orderDetails.qty++;

    //   return or;
    // });
    // console.log('res', res);

    minItem: (state, action: any) => {},

    removeItem: (state, action: PayloadAction<{id: number}>) => {
      const indexToRemove = state.order.findIndex(
        (item: any) => item.id === action.payload.id,
      );

      if (indexToRemove !== -1) {
        state.order.splice(indexToRemove, 1);
      }
    },
  },
});

export const {addItem, sumItem, minItem, removeItem} = OrderSlice.actions;

export const selectOrder = (state: {order: any}) => state.order;

export default OrderSlice.reducer;
