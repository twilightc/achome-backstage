export interface AddMerchandiseModel {
  Price: number;
  MerchandiseTitle: string;
  MerchandiseContent: string;
  RemainingQty: number;
  CategoryId: string;
  CategoryDetailId: string;
  EnableSpec: boolean;
  MerchandisePhotos: Blob;
  SpecList: AddSpecModel[];
}

export interface AddSpecModel {
  Price: number;
  RemainingQty: number;
  Spec1: string;
  Spec2: string;
  Enable: boolean;
}
