import FormData from 'form-data';
import {useSelector} from 'react-redux';
import {HttpResult, HttpService} from '../../Services/http.services';
import {
  ACCEPT,
  CONTENT_TYPE,
  MULTIPART_FORM_DATA,
  URL_BASE,
} from '../../Services/url.constant';
import {useRootSelector} from '../domain/hooks';
import {RootState, RootStore, RootStoreType} from '../domain/store';
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
import {ExploreSelectors} from '../state/explore/explore.selector';
import {ExploreActions} from '../state/explore/explore.state';
import {ProductListSelectors} from '../state/product-list/product-list.selector';
import {ProductListActions} from '../state/product-list/product-list.state';
import {I18n} from '../translation';
import {ErrorHandle} from '../utilities/help-utilities';

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

  return httpService.get<any>(url, {
    params: req,
  });
};

export class ProductService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getExploreProduct() {
    const url = URL_BASE + URL_GET_ALL_PRODUCT;
    const isLast = ExploreSelectors.isLastSelector(this.store.getState());
    !isLast && this.store.dispatch(ExploreActions.setIsLoading(true));

    const pageNumber =
      ExploreSelectors.pageNumberSelector(this.store.getState()) || 0;
    const productList =
      ExploreSelectors.productListSelector(this.store.getState()) || [];

    const params = {
      no: pageNumber,
      limit: 10,
    };

    return (
      !isLast &&
      this.httpService.get<ProductResponse>(url, {params}).then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            ExploreActions.setProductList([
              ...productList,
              ...httpResult?.data?.contents,
            ]),
          );
        }

        if (!httpResult?.data?.last && pageNumber !== null) {
          this.store.dispatch(ExploreActions.setPageNumber(pageNumber + 1));
        } else {
          this.store.dispatch(ExploreActions.setIsLast(true));
        }

        this.store.dispatch(ExploreActions.setIsLoading(false));
      })
    );
  }

  resetProductList() {
    const url = URL_BASE + URL_GET_ALL_PRODUCT;
    this.store.dispatch(ExploreActions.setIsLoading(true));
    this.store.dispatch(ExploreActions.setIsLast(false));
    this.store.dispatch(ExploreActions.setPageNumber(1));

    const params = {
      no: 0,
      limit: 10,
    };

    return this.httpService
      .get<ProductResponse>(url, {params})
      .then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            ExploreActions.setProductList(httpResult?.data?.contents),
          );
        }

        httpResult?.data?.totalItems &&
          this.store.dispatch(
            ProductListActions.setTotalItems(httpResult?.data?.totalItems),
          );

        this.store.dispatch(ExploreActions.setIsLoading(false));
      });
  }

  searchProductList(req: FilterProductRequest) {
    const url = URL_BASE + URL_GET_FILTER_PRODUCT;

    this.store.dispatch(ProductListActions.setIsLoading(true));
    const productList =
      ProductListSelectors.productListSelector(this.store.getState()) || [];
    const isLast = ProductListSelectors.isLastSelector(this.store.getState());

    return !isLast
      ? this.httpService
          .get<ProductResponse>(url, {params: req})
          .then(httpResult => {
            if (httpResult?.data?.contents) {
              this.store.dispatch(
                ProductListActions.setProductList([
                  ...productList,
                  ...httpResult?.data?.contents,
                ]),
              );

              httpResult?.data?.totalItems &&
                this.store.dispatch(
                  ProductListActions.setTotalItems(
                    httpResult?.data?.totalItems,
                  ),
                );
            }

            if (httpResult?.data?.last !== undefined) {
              this.store.dispatch(
                ProductListActions.setIsLast(httpResult?.data?.last),
              );
            }

            this.store.dispatch(ProductListActions.setIsLoading(false));
          })
      : this.store.dispatch(ProductListActions.setIsLoading(false));
  }

  resetSearchProductList(req: FilterProductRequest) {
    const url = URL_BASE + URL_GET_FILTER_PRODUCT;
    this.store.dispatch(ProductListActions.setIsLoading(true));

    return this.httpService
      .get<ProductResponse>(url, {
        params: req,
      })
      .then(httpResult => {
        if (httpResult?.data?.contents) {
          this.store.dispatch(
            ProductListActions.setProductList(httpResult?.data?.contents),
          );

          if (httpResult?.data?.last !== undefined) {
            this.store.dispatch(
              ProductListActions.setIsLast(httpResult?.data?.last),
            );
          }

          httpResult?.data?.totalItems !== undefined &&
            this.store.dispatch(
              ProductListActions.setTotalItems(httpResult?.data?.totalItems),
            );
        }

        this.store.dispatch(ProductListActions.setIsLoading(false));
      });
  }

  productDetect(image: any) {
    const url =
      'https://fruit-vegetable-detect-production.up.railway.app/image_search';

    var bodyFormData = new FormData();

    image &&
      bodyFormData.append('image', {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });

    const httpDetect = new HttpService({
      [ACCEPT]: '*/*',
      [CONTENT_TYPE]:
        MULTIPART_FORM_DATA + `; boundary=${bodyFormData._boundary}`,
    });

    this.store.dispatch(ProductListActions.setIsLoading(true));

    return httpDetect.post<any, any>(url, bodyFormData).then(httpResult => {
      if (httpResult?.data?.contents) {
        this.store.dispatch(
          ProductListActions.setProductList(httpResult?.data?.contents),
        );

        if (httpResult?.data?.last !== undefined)
          this.store.dispatch(
            ProductListActions.setIsLast(httpResult?.data?.last),
          );

        httpResult?.data?.totalItems !== undefined &&
          this.store.dispatch(
            ProductListActions.setTotalItems(httpResult?.data?.totalItems),
          );
      } else {
        this.store.dispatch(ProductListActions.setProductList([]));
        this.store.dispatch(ProductListActions.setIsLast(true));
        this.store.dispatch(ProductListActions.setTotalItems(0));
      }

      this.store.dispatch(ProductListActions.setIsLoading(false));
    });
  }
}
