import {HttpResult, HttpService} from '../../Services/http.services';
import {URL_BASE} from '../../Services/url.constant';
import {LoginResponse} from '../Screen/Login-Screen/login.model';
import {
  FilterProductRequest,
  OrderRequest,
  Product,
  ProductResponse,
  URL_GET_ALL_PRODUCT,
  URL_GET_FILTER_PRODUCT,
  URL_GET_FRUIT_BY_FARMER,
  URL_ORDER_FRUIT,
  URL_SEARCH_PRODUCT,
} from '../Screen/Models/product.model';

var httpService = new HttpService();

export const getAllProduct = (): Promise<HttpResult<ProductResponse>> => {
  const url = URL_BASE + URL_GET_ALL_PRODUCT;

  return httpService.get<ProductResponse>(url, {
    params: {
      no: 0,
      limit: 50,
    },
  });
};

export const getProduct = (id: number): Promise<HttpResult<Product>> => {
  const url = `${URL_BASE + URL_GET_ALL_PRODUCT}${id}`;

  return httpService.get<Product>(url);
};

export const searchProduct = (
  searchText: number,
  no: number,
): Promise<HttpResult<Product>> => {
  const url = URL_BASE + URL_SEARCH_PRODUCT;

  return httpService.get<Product>(url, {
    params: {
      name: searchText,
      no: no,
    },
  });
};

export const getProductByFarmerId = (
  farmerId: number,
): Promise<HttpResult<ProductResponse>> => {
  const url = URL_BASE + URL_GET_FRUIT_BY_FARMER + farmerId;

  return httpService.get<ProductResponse>(url);
};

export const orderProduct = (req: OrderRequest) => {
  const url = URL_BASE + URL_ORDER_FRUIT;

  return httpService.post<OrderRequest, any>(url, req);
};

export const filterProduct = (req: FilterProductRequest) => {
  const url = URL_BASE + URL_GET_FILTER_PRODUCT;

  return httpService.get<any>(url, {params: req});
};
