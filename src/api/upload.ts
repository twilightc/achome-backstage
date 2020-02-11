import { httpClient } from '../middlewares/axios/index';
import { environment } from '../environments';

export const Addmerchandise = (addMerchandiseRequestModel: FormData) =>
  httpClient.post(
    `${environment.apiUrl}/Merchandise/AddMerchandise`,
    addMerchandiseRequestModel
  );
