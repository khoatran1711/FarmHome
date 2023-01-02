import {HttpResult, HttpService} from '../../Services/http.services';
import {URL_BASE} from '../../Services/url.constant';
import {useRootSelector} from '../domain/hooks';
import {
  GetAllOrderResponse,
  Order,
  OrderHistory,
  URL_DELETE_ORDER_DETAIL,
  URL_GET_ALL_ORDERS,
  URL_GET_ALL_ORDERS_HISTORY,
  URL_GET_ALL_ORDER_DETAIL,
  URL_GET_ORDERS,
  URL_ORDERS_ACCEPT,
} from '../Screen/Models/order.model';
import {AuthenticationSelectors} from '../state/authentication/authentication.selector';

var httpService = new HttpService();

export const getAllOrders = (
  userId,
): Promise<HttpResult<GetAllOrderResponse>> => {
  const url = URL_BASE + URL_GET_ALL_ORDERS + '/' + userId;

  return httpService.get<GetAllOrderResponse>(url);
};

export const getOrderDetail = (orderId): Promise<HttpResult<Order>> => {
  const url = URL_BASE + URL_GET_ORDERS + orderId;

  return httpService.get<any>(url);
};

export const acceptOrder = (orderId): Promise<HttpResult<Order>> => {
  const url = URL_BASE + URL_ORDERS_ACCEPT;
  const request = {
    id: orderId,
  };

  return httpService.put<any, any>(url, request);
};

export const getOrdersHistory = (userId): Promise<HttpResult<any>> => {
  const url = URL_BASE + URL_GET_ALL_ORDERS_HISTORY + userId;

  return httpService.get<any>(url);
};

export const getOrderHistoryDetail = (
  historyId,
): Promise<HttpResult<OrderHistory>> => {
  const url = URL_BASE + URL_GET_ALL_ORDER_DETAIL + historyId;

  return httpService.get<OrderHistory>(url);
};

export const deleteOrder = (orderId): Promise<HttpResult<OrderHistory>> => {
  const url = URL_BASE + URL_DELETE_ORDER_DETAIL + orderId;

  return httpService.delete<OrderHistory>(url);
};
