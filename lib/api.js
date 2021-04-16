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



export function sliceProductsBy (products, amount) {
  const sortedProducts = sortProductById(products);
  const slicedProducts = sortedProducts.slice(0, amount);
  return slicedProducts;
}

function sortProductById (products) {
  const copyProducts = products.slice();
  return copyProducts.sort((a, b) => a.id - b.id);
}
