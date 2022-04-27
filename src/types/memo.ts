export interface IDepositMemo {
  fromChain: string;
  toChain: string;
  from: string;
  to: string;
  nft: string;
  id: string | number;
  depositHash: string;
}

export interface IWithdrawMemo {
  fromChain: string;
  toChain: string;
  from: string;
  to: string;
  publisher: string;
  id: string;
  fundCode: string;
  depositHash: string;
}
