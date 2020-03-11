export interface CategoryListViewModel {
  Cid: string;
  Cname: string;
  GroupSeq: number;
  Detail: CategoryListDetailViewModel[];
}

export interface CategoryListDetailViewModel {
  DetailId: string;
  DetailName: string;
  Seq: number;
}

export interface MerchandiseWrapper {
  MerchandiseViewModel: MerchandiseViewModel[];
  MerchandiseAmount: number;
}

export interface MerchandiseViewModel {
  MerchandiseId: string;
  OwnerAccount: string;
  MerchandiseTitle: string;
  MerhandiseContent: string;
  SoldQty: number;
  RemainingQty: number;
  CategoryId: string;
  CategoryDetailId: string;
  ImagePath: string;
  Price: number;
  EnableSpec: boolean;
  MerchandiseSpec: MerchandiseSpecViewModel[];
  MerchandiseQa: MerchandiseQaViewModel[];
  Spec1: string[];
  Spec2: string[];
}

export interface BackStageSearchModel {
  PageSize: number;
  PageIndex: number;
  OrderString: string;
  isOrderByDesc: boolean;
}

export interface MerchandiseSpecViewModel {
  SpecId: number;
  Price: number;
  SoldQty: number;
  RemainingQty: number;
  Spec1: string;
  Spec2: string;
  Enable: boolean;
}

export interface MerchandiseQaViewModel {
  MerchandiseId: string;
  Seq: number;
  QuestionAccount: string;
  Question: string;
  AskingTime: Date;
  Answer: string;
  AnswerTime: Date;
}
