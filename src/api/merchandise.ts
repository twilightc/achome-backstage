import { httpClient } from '../middlewares/axios/index';
import { environment } from '../environments';
import { BaseResponse } from '../models/Models';
import {
  CategoryListViewModel,
  MerchandiseWrapper,
  BackStageSearchModel
} from '../models/CategoryListViewModel';

export const GetCategoryList = () =>
  httpClient.get<BaseResponse<CategoryListViewModel[]>>(
    `${environment.apiUrl}/Merchandise/GetCategoryListAsync`
  );

export const GetBSMerhandiseListDetail = (
  backStageSearchModel: BackStageSearchModel
) =>
  httpClient.post<BaseResponse<MerchandiseWrapper>>(
    `${environment.apiUrl}/Merchandise/GetBSMerhandiseListDetail`,
    backStageSearchModel
  );
