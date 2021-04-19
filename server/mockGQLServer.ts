import { IResolvers, makeExecutableSchema } from 'graphql-tools';
import { Cart, Product } from './interface';

/** gql 類型定義 */
const typeDefs = `
  scalar Date
  type ListProductResult {
    " 商品 ID "
    id: Int
    " 商品名稱 "
    title: String
    " 商品價格 "
    price: Int
    " 商品圖片（放在 public 下的圖片，相對路徑） "
    img: String
  }
  type ListCartResult {
    " 購物車項目 id "
    id: Int
    " 對應的商品 ID "
    productId: Int
    " 數量 "
    amount: Int
  }
  type Query {
    " 依照篩選條件取得商品資料 "
    listProduct(
      " 商品 ID"
      id: [Int]
      " 商品名稱包含關鍵字比對 "
      name_like: [String]
    ): [ListProductResult]
    " 取得目前購物車內所有的內容 "
    listCart: [ListCartResult]
  }
  type Mutation {
    " 將商品加入購物車 "
    addToCart(
      " 欲加入的商品 ID"
      productId: Int!
      " 欲新增的數量，必須 >= 1 "
      amount: Int!
    ): [ListCartResult]
    " 更新購物車內容，數量調整為 0 時會刪掉商品 "
    updateCartItem(
      " 目標購物車項目 id "
      id: Int!
      " 欲更改的目標數量 "
      amount: Int!
    ): [ListCartResult]
    " 新增訂單，清空購物車 "
    addOrder: Boolean
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
/** gql 端點資料解析設定檔 */
const resolvers: IResolvers = {
  Query: {
    listCart: () => delayResponse(cMockCarts),
    listProduct: (_, { id = [], name_like = [] }) => delayResponse(
      cMockProducts.filter(product =>
        (id.length === 0 || id.includes(product.id)) &&
        (name_like.length === 0 || name_like.find((name: string) => product.title.includes(name)))
      )
    )
  },
  Mutation: {
    addToCart: (_, { productId, amount }: { productId: number; amount: number }) => {
      if (amount < 1) throw new Error('數量必須 >= 1');
      if (!cMockProducts.some(product => product.id === productId)) throw new Error(`找不到 id=${productId} 的商品`);
      if (cMockCarts.length === 0) cMockCarts.push({ id: 1, productId, amount });
      else {
        const existedItem = cMockCarts.find(cart => cart.productId === productId);
        if (existedItem) throw new Error('該商品已存在購物車');
        else {
          const maxId = cMockCarts[cMockCarts.length - 1].id;
          cMockCarts.push({ id: maxId + 1, productId, amount });
        }
      }
      return delayResponse(cMockCarts);
    },
    updateCartItem: (_, { id, amount }) => {
      if (amount < 0) throw new Error('數量必須 >= 0');
      const targetIndex = cMockCarts.findIndex(cart => cart.id === id);
      if (targetIndex < 0) throw new Error('找不到指定購物車項目');
      if (amount === 0) cMockCarts.splice(targetIndex, 1);
      else cMockCarts[targetIndex].amount = amount;
      return delayResponse(cMockCarts);
    },
    addOrder: () => {
      cMockCarts = [];
      return delayResponse(true);
    }
  }
};
/** 由於只是 mock 使用，不處理 ts 的部分 */
export const GQLMockServerSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/**
 * 隨機延遲送出 gql 回傳結果，模擬 async 行為
 * @param response 要回傳的結果
 * @param timeout 延遲時間，未設定則隨機
 */
function delayResponse<T = unknown> (response: T, timeout = Math.ceil(Math.random() * 2000)) {
  return new Promise<T>((resolve) => setTimeout(() => resolve(response), timeout));
}
// #region 假資料
const cMockProductCount = 100;
const cMockProducts: Product[] = Array.from(Array(cMockProductCount), (_, index) => ({
  id: cMockProductCount - index,
  title: 'MockProduct_' + (cMockProductCount - index).toString(),
  price: Math.ceil(Math.random() * 1000),
  img: `./assets/product${Math.round(Math.random() * cMockProductCount) % 5 + 1}.jpg`
}));

/** 隨機 pick 商品出來 */
let cMockCarts: Cart[] = [];
// #endregion
