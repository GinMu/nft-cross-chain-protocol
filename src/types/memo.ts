export interface IOrderMemo {
  fromChain: string;
  toChain: string;
  from: string;
  to: string;
  nft: string;
  id: string | number;
  depositHash: string;
}
