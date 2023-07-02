import {Alert} from 'react-native';
import {HttpResult, HttpService} from '../../Services/http.services';
import {
  APPLICATION_JSON,
  AUTHORIZATION_BEARER,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE,
  URL_BASE,
} from '../../Services/url.constant';
import {useRootSelector} from '../domain/hooks';
import {RootStore, RootStoreType} from '../domain/store';
import {
  GetAllHistoryResponse,
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
import {HistorySelectors} from '../state/history/history.selector';
import {HistoryActions} from '../state/history/history.state';
import {WaitingListSelectors} from '../state/waiting-list/waiting-list.selector';
import {WaitingListActions} from '../state/waiting-list/waiting-list.state';

export class OrderService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    const token = AuthenticationSelectors.tokenSelector(this.store.getState());
    if (token) {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
        [AUTHORIZATION_HEADER]: `${AUTHORIZATION_BEARER} ${token}`,
      });
    } else {
      this.httpService = new HttpService({
        [CONTENT_TYPE]: APPLICATION_JSON,
      });
    }
  }

  getAllOrders() {
    const userId = AuthenticationSelectors.idSelector(this.store.getState());
    const isLast = HistorySelectors.isLastSelector(this.store.getState());
    const url = URL_BASE + URL_GET_ALL_ORDERS + '/' + userId;

    const pageNumber =
      WaitingListSelectors.pageNumberSelector(this.store.getState()) || 0;
    const waitingList =
      WaitingListSelectors.waitingListSelector(this.store.getState()) || [];

    return (
      !isLast &&
      this.httpService.get<GetAllOrderResponse>(url).then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            WaitingListActions.setContentList([
              ...waitingList,
              ...httpResult?.data?.contents,
            ]),
          );
        }

        if (!httpResult?.data?.last && pageNumber !== null) {
          this.store.dispatch(WaitingListActions.setPageNumber(pageNumber + 1));
        } else {
          this.store.dispatch(WaitingListActions.setIsLast(true));
        }

        this.store.dispatch(WaitingListActions.setIsLoading(false));
      })
    );
  }

  resetWaitingList() {
    const userId = AuthenticationSelectors.idSelector(this.store.getState());
    const url = URL_BASE + URL_GET_ALL_ORDERS + '/' + userId;
    this.store.dispatch(WaitingListActions.setIsLoading(true));
    this.store.dispatch(WaitingListActions.setIsLast(false));
    this.store.dispatch(WaitingListActions.setPageNumber(0));

    const params = {
      no: 0,
      limit: 20,
    };

    return this.httpService
      .get<GetAllOrderResponse>(url, {params})
      .then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            WaitingListActions.setContentList(httpResult?.data?.contents),
          );
        }
        console.log(httpResult);

        this.store.dispatch(WaitingListActions.setIsLoading(false));
      });
  }

  getCurrentOrder(orderId) {
    const url = URL_BASE + URL_GET_ORDERS + orderId;

    this.store.dispatch(WaitingListActions.setIsLoading(true));
    this.store.dispatch(WaitingListActions.setCurrentOrder(null));

    return this.httpService.get<any>(url).then(httpResult => {
      if (httpResult?.data) {
        this.store.dispatch(
          WaitingListActions.setCurrentOrder(httpResult?.data),
        );
      }

      this.store.dispatch(WaitingListActions.setIsLoading(false));
    });
  }

  getAllHistory() {
    const userId = AuthenticationSelectors.idSelector(this.store.getState());

    const url = URL_BASE + URL_GET_ALL_ORDERS_HISTORY + userId;
    const pageNumber =
      HistorySelectors.pageNumberSelector(this.store.getState()) || 0;
    const historyList =
      HistorySelectors.historyListSelector(this.store.getState()) || [];
    const isLast = HistorySelectors.isLastSelector(this.store.getState()) || [];

    !isLast && this.store.dispatch(HistoryActions.setIsLoading(true));
    const params = {
      no: pageNumber,
      limit: 5,
    };

    return (
      !isLast &&
      this.httpService
        .get<GetAllHistoryResponse>(url, {
          params: params,
        })
        .then(httpResult => {
          if (httpResult?.data?.contents) {
            this.store.dispatch(
              HistoryActions.setContentList([
                ...historyList,
                ...httpResult?.data?.contents,
              ]),
            );
          }

          if (!httpResult?.data?.last && pageNumber !== null) {
            this.store.dispatch(HistoryActions.setPageNumber(pageNumber + 1));
          } else {
            this.store.dispatch(HistoryActions.setIsLast(true));
          }

          this.store.dispatch(HistoryActions.setIsLoading(false));
        })
    );
  }

  resetHistoryList() {
    const userId = AuthenticationSelectors.idSelector(this.store.getState());
    const url = URL_BASE + URL_GET_ALL_ORDERS_HISTORY + userId;
    this.store.dispatch(HistoryActions.setIsLoading(true));
    this.store.dispatch(HistoryActions.setIsLast(false));
    this.store.dispatch(HistoryActions.setPageNumber(1));

    const params = {
      no: 0,
      limit: 5,
    };

    return this.httpService
      .get<GetAllHistoryResponse>(url, {params})
      .then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            HistoryActions.setContentList(httpResult?.data?.contents),
          );
        }

        this.store.dispatch(HistoryActions.setIsLoading(false));
      });
  }

  getCurrentHistory(orderId) {
    const url = URL_BASE + URL_GET_ALL_ORDER_DETAIL + orderId;

    this.store.dispatch(HistoryActions.setIsLoading(true));
    this.store.dispatch(HistoryActions.setCurrentHistory(null));

    return this.httpService.get<any>(url).then(httpResult => {
      if (httpResult?.data) {
        this.store.dispatch(HistoryActions.setCurrentHistory(httpResult?.data));
      }

      this.store.dispatch(HistoryActions.setIsLoading(false));
    });
  }
}

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
