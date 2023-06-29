export interface Preferezes {
  subCategoryId: number;
  name: string;
  status: boolean;
}

export interface CategoryProp {
  categoryId: number;
  name: string;
  subCategories: Preferezes[];
}

export interface ProfileResponse {
  balance: {
    balanceId: number;
    balancePoints: number;
    bankBalance: number;
    cashbackCharged: number;
    cashbackPending: number;
  };
  avatar_photo: string;
  best_customer_id: number;
  birth_date: string;
  cap_id: number;
  card: string;
  category_id: number;
  email: string;
  email_bs: string;
  first_name: string;
  fnet_customer_id: number;
  friend_id: number;
  gender: 'F' | 'M' | 'X';
  last_name: string;
  privacy_analysis_data: number;
  privacy_mkt: number;
  privacy_third_partner: number;
  province_code: string;
  status: number;
  updated_at: string;
  username: string;
  enabledEmail: boolean;
  email_old: string | null;
}

export interface MovementsProps {
  movementId: number;
  createdAt: string;
  movementType: string | null;
  businessName: string;
  totalAmount: number;
  pointsCharged: number;
  pointsUsed: number;
  pointsStatusCharged: number;
  pointsStatusDischarged: number;
  cashbackCharged: number;
  cashbackUsed: number;
  cashbackPending: number;
  status: boolean;
  categoryName: string;
  categoryId: number;
  dateMovement: string;
}

export interface Filters {
  date_from?: string;
  date_to?: string;
  kind_id?: number;
  status?: 0 | 1;
  city_id?: number | string;
  shop_id?: number | string;
}

export interface FiltersMerchant {
  page?: string;
  pageSize?: string;
  order?: 'DESC' | 'ASC';
  cashbackCategory?: '1' | '2' | '3';
  shopCategory?: string;
  merchantNameOrder?: string;
  shopSubcategory?: string;
}
export interface Cashbacks {
  id: number;
  merchantId?: number;
  cashbackValue: string;
  currencySymbol: string;
  description: string | null;
  cashbackCategory: string;
  validFrom: string;
  validTo: string;
  oldCashbackValue?: string | null;
  cashbackId?: number | null;
  logoUrl?: string | null;
  sortId?: number;
  available?: any | null;
  updatedAt?: string;
}

export interface ITicket {
  ticketId: string;
  shopId: number;
  shopName: string;
  logoUrl: string;
  status: string;
  createdAt: string;
  orderDate: string | null;
  expense: number;
  notifications?: number | null;
}
export interface CashbacksList {
  cashback_id: string;
  cashback_value: string | null;
  currency_symbol: string;
  description: string | null;
  cashback_category: string;
  valid_from: string;
  valid_to: string;
  event_type: string | null;
  cashback_label: string | null;
  href_category: string | null;
  cashback_type: number;
}

export interface HomeShopsResp {
  id: number;
  name: string;
  quantity: number;
  shopBsList: Array<Merchant>;
}

export interface HomeGiftCardResp {
  id: number;
  name: string;
  quantity: number;
  shopDetailGiftCardDtoList: Array<GiftCardShop>;
}

export interface GiftCardShop {
  shopId: number;
  merchantId: number;
  name: string;
  shopDescription: string;
  website: null;
  businessName: string;
  label: string;
  createdAt: string;
  sortId: string;
  affiliateUrl: string;
  logoUrl: string;
  terms: any | null;
  merchantRating: string;
  backgroundImageUrl: string | null;
  merchantCategoryId: string;
  merchantCategory: string;
  description: string | null;
  merchantSite: string | null;
  merchantUrlText: string | null;
  catalogoBsId: string;
  catalogoAmount: string;
  catalogoName: string;
  catalogoImageUrl: string;
  catalogoAvailableTo: string;
  catalogoIdMerchant: string;
  catalogoDiscountAmountSingle: string | null;
  catalogoFullprice: string;
  catalogoCashbackValue: string;
  catalogoCurrencySymbol: string;
  catalogoAffiliateUrl: string;
  catalogoUpdatedAt: string | null;
}

export interface Merchant {
  createdAt: string;
  shopId: number;
  merchantId: number;
  name: string;
  label: string;
  cashbackLabel: string;
  cashbackValue: string;
  currencySymbol: string;
  comm: string;
  sortId: string;
  affiliateUrl: string;
  logoUrl: string;
  terms: any | null;
  description: string;
  merchantRating: string;
  averageDaysToCashback: string;
  averagePaymentTime: string;
  backgroundImageUrl: string | null;
  merchantSite: string;
  merchantCategoryId: string;
  merchantCategory: string;
  merchantUrlText: string | null;
  ragionesocialeText: string;
  cashbacks: Array<Cashbacks>;
  // catalogo: Array<GiftCardType>;
  enabled: boolean;
  updatedAt: string;
}

export interface MerchantGiftCard {
  createdAt: string;
  shopId: number;
  merchantId: number;
  name: string;
  label: string;
  cashbackLabel: string;
  cashbackValue: string;
  currencySymbol: string;
  comm: string;
  sortId: string;
  affiliateUrl: string;
  logoUrl: string;
  terms: any | null;
  description: string;
  merchantRating: string;
  averageDaysToCashback: string;
  averagePaymentTime: string;
  backgroundImageUrl: string | null;
  merchantSite: string;
  merchantCategoryId: string;
  merchantCategory: string;
  merchantUrlText: string | null;
  ragionesocialeText: string;
  // cashbacks: Array<Cashbacks>;
  catalogo: Array<GiftCardType>;
  enabled: boolean;
  updatedAt: string;
}

export interface SearchShop {
  name: string;
  currencySymbol: string;
  logoUrl: string;
  cashbackValue: string;
  shopId: number;
}

export interface SearchGiftCard {
  name: string;
  logoUrl: string;
  displayAmount: string;
  shopId: number;
}

export interface CategoriesMerchant {
  id: number;
  quantity: number;
  name: string;
  categoryId: number;
  couponQuantity: number;
  subcategoryBSList: Array<subcategoryMerchant>;
  enabled: true;
}
export interface subcategoryMerchant {
  id: number;
  name: string;
  subCategoryId: number;
  quantity: number;
}

export interface MerchatnDetail {
  createdAt: string;
  shopId: number;
  merchantId: number;
  name: string;
  label: string;
  cashbackLabel: string;
  cashbackValue: string;
  currencySymbol: string;
  comm: string | null;
  sortId: string | null;
  affiliateUrl: string;
  logoUrl: string;
  terms: any | null;
  description: string;
  merchantRating: string;
  averageDaysToCashback: string;
  averagePaymentTime: string;
  backgroundImageUrl: string;
  merchantSite: string;
  merchantCategoryId: string;
  merchantCategory: string;
  merchantUrlText: string | null;
  ragionesocialeText: string;
  cashbacks: Array<Cashbacks>;
  catalogoGiftCard: Array<GiftCardData>;
}

export interface GiftCardData {
  id: number;
  idCatalogoBs: string;
  amount: string;
  displayAmount: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  availableQuantity: string;
  deliveryMode: string;
  availableTo: string;
  vatPercentage: string;
  availableToTimestamp: string;
  idMerchant: string;
  spendMode: string;
  spendSingle: string;
  spendPartial: string;
  discountDateStart: any | null;
  discountDateEnd: any | null;
  discountQuantityMax: any | null;
  discountQuantityCurrent: any | null;
  discountAmountSingle: any | null;
  fullprice: string;
  commissionCategory: string;
  cashbackValue: string;
  currencySymbol: string;
  affiliateUrl: string;
  superDiscountedCard: boolean;
  enabled: boolean;
  updatedAt: string | null;
}

export interface GiftCardType {
  catalogoBsId: string;
  catalogoAmount: string;
  catalogoName: string;
  catalogoDescription: string | null;
  catalogoImageUrl: string;
  catalogoAvailableTo: string;
  catalogoIdMerchant: string;
  catalogoDiscountAmountSingle: string | null;
  catalogoFullprice: string;
  catalogoCashbackValue: string;
  catalogoCurrencySymbol: string;
  catalogoAffiliateUrl: string;
  catalogoUpdatedAt: string | null;
}
export interface RespMerchantList {
  content: Array<Merchant>;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface RespGiftCardsList {
  content: Array<MerchantGiftCard>;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface RespPaginated<T> {
  content: Array<T>;
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface PresentBody {
  kind: number;
  giftCardId: number;
  destEmailTo: string;
  senderName: string;
  message: string;
  destNameTo: string;
}

export interface PresentsResponse {
  message: string;
  id: number;
  status: string;
  createdAt: string;
  kind: string;
  cardName: string;
  cardAmount: number;
  destNameTo: string;
  imageURL: string;
  destEmail: string;
  memberNameFrom: string;
  direction: string;
  memberEmailFrom: string;
}

export interface CashbackRedemptionResponse {
  id: number;
  amount: number;
  iban: string;
  nameDest: string;
  status: string;
  userId: number;
  paymentDate: string | null;
  createdAt: string;
}

export interface CashbackRedemptionBody {
  orderId?: number;
  amount: number;
  iban: string;
  nameDest: string;
}

export interface PaymentBody {
  amount: number;
  kind: number;
  type: string;
  catalogueId: string;
}

export interface PaymentRequestResponse {
  id: number;
  url: string;
}

export interface PaymentStatusRequestResponse {
  status: string;
}

export interface CashbackRedemptionFilters {
  page: number;
  pageSize: number;
  order?: string;
}

export interface FiltersPresents {
  page: number;
  pageSize: number;
  order?: string;
  status?: number;
  direction?: 'received' | 'sent';
}

export interface INotification {
  notificationId: number;
  //  kind: "shop" | "ticket" | "giftCard";
  kindId: number;
  viewed: boolean;
  title: string;
  message: string;
  createdAt: string;
  available: boolean;
  viewedAt: string | null;
  objectId: string;
}

export interface Provinces {
  fnetId: number;
  id: number;
  initials: string;
  province: string;
  regionId: number;
}

export interface BalanceProps {
  balanceId: number;
  userId: number;
  pointsCharged: number;
  pointsUsed: number;
  balancePoints: number;
  pointsChargedCount: number;
  pointsUsedCount: number;
  cashbackCharged: number;
  cashbackUsed: number;
  cashbackPending: number;
  totalMoneyInSale: number;
  paidMoneyInSale: number;
  kycDigitale: any | null;
  bankBalance: number;
  invitorCode: string;
  updatedAt: string;
}

export interface ITicketDetail {
  ticketId: string;
  reportType: string | null;
  reportProblem: string | null;
  code: string | null;
  orderNumber: number;
  expense: number;
  orderDate: string;
  logoUrl: string;
  ticketOpenedOn: string;
  state: string;
  shopId: number;
  shopName: string;
  nameUsed: string;
  surnameUsed: string;
  emailUsed: string;
  notes?: Notes[];
}

export interface Notes {
  id: number;
  viewed: boolean | null;
  comment: string;
  createdAt: string;
  createdBy: string;
  externalLink: string | null;
  file: Files | null;
}

export interface Files {
  id: number;
  name: string;
  downloadLink: string | null;
  createdAt: string;
  imageUrl: string | null;
  createdBy: string;
  mediaType: string;
}

export interface User {
  id: string;
  name: string;
  identifier: string;
  telephone: number;
  email: string;
  potentialAction: Array<string>;
  image: string;
}

export interface LoginResp {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

export interface LoginProps {
  username?: string;
  password?: string;
  grant_type: string;
  refresh_token?: string;
}

export interface CreateUserBody {
  name: string;
  surname: string;
  identifier: string;
  telephone: string;
  email: string;
  birthDate: string;
  gender: 'M' | 'L';
  password: string;
  repeatPassword: string;
}

export interface RegisterStep1Body {
  phoneNumber: string;
  password: string;
}

export interface CreateUserResp {
  name: string;
  surname: string;
  identifier: string;
  telephone: string;
  email: string;
  dateCreate: string;
  userUpdate: string;
  birthDate: string;
  gender: string;
  nationality: string;
  potentialAction: Array<String>;
  image: string;
  url: string;
  config: string;
  active: string;
  _id: string;
  __v: string;
}

export interface Error {
  additionalInfo: String;
  message: string;
  status: number;
}

export interface Message2 {
  _id: string;
  type: string;
  streamId: string;
  message: string;
  user: {
    _id: string;
    name: string;
    image: Array<string>;
  };
  elapsed: number;
  livestream: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Rimbroso {
  unsType: string;
  unsTypeId: number;
  labelItIT: string;
  label: string;
}

export interface AvailableMerchantsTickets {
  merchantName: string;
  idMerchant: number;
  conditions: string;
  merchantLabel: string;
  realtime: string;
  masterCategoryId: string;
}

export interface NewTicketBody {
  idMerchant: number;
  orderDate: string;
  orderNumber: string;
  orderAmount: string;
  firstnameOnMerchant: string;
  lastnameOnMerchant: string;
  mailBody: string;
  emailOnMerchant: string;
  idUser: number;
  unsTypeId: number;
}

export interface NewTicketStep3Resp {
  ticketSubmitFields: {
    clicks: any[];
    merchantName: string;
    merchantLabel: string;
    comments: string;
    commentsItIT: string;
    messageTop: string;
    messageMandatory: string;
    requiredFields: {
      TicketFields: any[];
    };
    messageMandatoryItIT: string;
  };
}

export interface NewTicktCreateResp {
  code: string;
  isDuplicate: boolean;
  message: string;
  image: string;
  errorReason: string;
  errId: number;
  statusId: number;
  statusItIT: string;
}
export interface FiltersNewTicketLoad {
  merchantId: string;
  orderDate: string;
  unsTypeId: string;
}

export interface CheckAuthProps {
  user_name: string;
  scope: Array<string>;
  active: boolean;
  exp: number;
  authorities: Array<string>;
  jti: string;
  client_id: string;
}

export interface Ticket {
  sortId: number;
  idUser: string;
  idTicket: string;
  ticketNumber: string;
  ticketDate: number;
  ticketDateHuman: string;
  merchantIcon: string;
  merchantLogo: string | null;
  merchantName: string;
  merchantLabel: string;
  merchantId: string;
  amountPurchasedFulltext: string;
  amountPurchased: string;
  orderNumber: string;
  status: string;
  statusLabelItIT: string;
  orderDate: string | null;
  orderDateTimestampMs: string | null;
  checkoutDate: number;
  checkoutDateTimestampMs: string | null;
  checkoutDateIsSet: string | null;
  checkoutDateItIT: string;
  firstNameOnMerchant: string | null;
  lastNameOnMerchant: string | null;
  emailOnMerchant: string | null;
  texts: null;
}

export interface TicketDetail {
  sortId: number;
  idUser: string;
  idTicket: string;
  ticketNumber: string;
  ticketDate: number;
  ticketDateHuman: string | null;
  merchantIcon: string | null;
  merchantLogo: string;
  merchantName: string;
  merchantLabel: string;
  merchantId: string;
  amountPurchasedFulltext: null;
  amountPurchased: string;
  orderNumber: string;
  status: string;
  statusLabelItIT: string;
  orderDate: number;
  orderDateTimestampMs: string | null;
  checkoutDate: number;
  checkoutDateTimestampMs: string | null;
  checkoutDateIsSet: boolean;
  checkoutDateItIT: string;
  firstNameOnMerchant: string;
  lastNameOnMerchant: string;
  emailOnMerchant: string;
  texts: {
    ticketSchema: TicketMessages[];
  } | null;
}
export interface TicketMessages {
  corpo: string;
  sortId: number;
  idUser: string;
  ticketDate: number;
  ticketDateItIT: string;
  author: string;
  hasAttachment: number;
  attachmentUrl: string;
  attachmentFilename: string;
  attachmentFile: string;
  attachmentExtension: string;
  attachmentHref: string;
}

export interface RespCreateMessage {
  errId: number;
  error: string;
  errorLocale: string;
  errorItIT: string;
}

export interface UnavailableShops {
  id: string;
  name: string;
  messageMandatory: string;
}

export interface Ifavorites {
  shopId: number;
  merchantId: number;
  merchantCategoryId: number;
  merchantCategory: string;
  allowed: boolean;
  logoUrl: string;
  shopName: string;
}

export interface GiftcardList {
  id: number;
  orderId: string;
  orderNumber: number;
  status: string;
  bestCustomerId: number;
  voucherPdf: string | null;
  voucherPng: string | null;
  cardId: any | null;
  cardSku: any | null;
  cardName: string | null;
  cardAmount: any | null;
  miaOrderNumber: string;
  imgUrl: string;
  userIp: string | null;
  userId: any | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface GiftCardListNew {
  id: number;
  imageUrl: string;
  cardId: string | null;
  cardName: string;
  cardAmount: number;
  spendMode: string;
  spendSingle: string;
  spendPartial: any | null;
  availableTo: string;
  voucherPng: any | null;
}

export interface PaginatedResponseGiftList {
  content: GiftCardListNew[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: false;
    sorted: true;
    unsorted: false;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
