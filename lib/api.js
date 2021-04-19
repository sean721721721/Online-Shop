import { gql } from '@apollo/client';

export const LIST_PRODUCT = gql`
  query ListProduct {
    listProduct {
      id,
      title,
      price,
      img,
    }
  }
`;

export const LIST_CART = gql`
  query ListCart {
    listCart {
      id,
      productId,
      amount,
    }
  }
`;

export const ADD_CART = gql`
  mutation AddToCart($productId: Int!) {
    addToCart(productId: $productId, amount: 1) {
      id,
      productId,
      amount
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCartItem($id: Int!, $amount: Int!) {
    updateCartItem(id: $id, amount: $amount) {
      id,
      productId,
      amount
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder {
    addOrder
  }
`;
