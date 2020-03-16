import { httpClient } from '../middlewares/axios/index';
import { environment } from '../environments';
import { BaseResponse } from '../models/Models';
import {
  CategoryListViewModel,
  MerchandiseWrapper,
  BackStageSearchModel,
  MerchandiseViewModel
} from '../models/CategoryListViewModel';

export const GetCategoryList = () =>
  httpClient.get<BaseResponse<CategoryListViewModel[]>>(
    `${environment.apiUrl}/Merchandise/GetCategoryListAsync`
  );

export const GetMerchandise = (ItemId: string) => {
  return httpClient.get<BaseResponse<MerchandiseViewModel>>(
    `${environment.apiUrl}/Merchandise/GetMerchandise?ItemId=${ItemId}`
  );
};

export const GetBSMerhandiseListDetail = (
  backStageSearchModel: BackStageSearchModel
) =>
  httpClient.post<BaseResponse<MerchandiseWrapper>>(
    `${environment.apiUrl}/Merchandise/GetBSMerhandiseListDetail`,
    backStageSearchModel
  );

export const EditBSMerchandise = (merchandise: MerchandiseViewModel) =>
  httpClient.put<BaseResponse<boolean>>(
    `${environment.apiUrl}/Merchandise/EditBSMerchandise`,
    merchandise
  );
