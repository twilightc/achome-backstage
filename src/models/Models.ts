export interface RegisterModel {
  AccountName: string;
  Password: string;
  UserName: string;
  Email: string;
  PhoneNumber: string;
}

export interface AccountModel {
  Account: string;
  Password: string;
}

export interface ArticleModel {
  ArticleTitle: string;
  ArticleContent: string;
}

export interface BaseResponse<T> {
  Success: boolean;
  Msg: string;
  Data: T;
}

export interface TokenBody {
  Account: string;
  UserName: string;
}
