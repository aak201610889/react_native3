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
  const itemId = action.payload.id;
  const existingItemIndex = state.order.findIndex((item: any) =>
    item.orderDetails.some((detail: any) => detail?.product?.id === itemId)
  );

  if (existingItemIndex !== -1) {
    // If the item is already in the order, update its quantity
    state.order[existingItemIndex].orderDetails = state.order[existingItemIndex].orderDetails.map(
      (detail: any) => {
        if (detail?.product?.id === itemId) {
          return {
           
            qty: detail.qty + 1,
        
            
          };
        }
        console.log('Updated quantity for existing item:', detail?.qty);
        return detail?.qty;
      }
    );
  } else {
    // If the item is not in the order, add it with a quantity of 1
    state.order.unshift({
      orderDetails: [{ quantity: 1, product: { ...action.payload } }],
    });
    console.log('Added new item to order with quantity 1:', itemId);
  }
}
,
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
