import { httpClient } from '../middlewares/axios/index';
import { environment } from '../environments';
import { BaseResponse } from '../models/Models';
import { CategoryListViewModel } from '../models/CategoryListViewModel';

export const GetCategoryList = () =>
  httpClient.get<BaseResponse<CategoryListViewModel[]>>(
    `${environment.apiUrl}/Merchandise/GetCategoryListAsync`
  );
