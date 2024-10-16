import { createSlice } from "@reduxjs/toolkit";
import {
  authUser,
  loginUser,
  registerUser,
  logoutUser,
  addToCart,
  getCartItems,
  removeCartItem,
  payProducts,
} from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: 0,
    image: "",
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 회원가입 register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("회원가입을 성공했습니다.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload : "오류가 발생했습니다";
        toast.error(state.error);
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload : "오류가 발생했습니다";
        toast.error(state.error);
      })

      // 토큰
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload : "오류가 발생했습니다";
        state.isAuth = false;
        localStorage.removeItem("accessToken"); // 인증 실패 시 토큰 제거
      })

      // 로그아웃
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      // 카트를 담을 시, 장바구니에 넣을 시
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.cart = action.payload;
        toast.info("장바구니에 추가됐습니다.");
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      .addCase(removeCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = action.payload.productInfo;
        state.userData.cart = action.payload.cart;
        toast.info("상품이 장바구니에서 삭제됐습니다.");
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      })

      .addCase(payProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(payProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartDetail = [];
        state.userData.cart = [];
        toast.info("성공적으로 상품을 구매했습니다.");
      })
      .addCase(payProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(state.error);
      });
  },
});

export default userSlice.reducer;
