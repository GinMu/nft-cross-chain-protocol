export interface IDepositOrder {
  // 跨链的发起链
  fromChain: string;

  // 跨链的目的链
  toChain: string;

  // 用户以太坊地址
  from: string;

  // 用户井通地址
  address: string;

  // 用户井通密钥
  secret: string;

  // nft合约地址
  nft: string;

  // nft id
  id: string | number;

  // 用户在以太坊上721转账hash
  depositHash: string;
}

export interface IWithdrawOrder {
  // 跨链的发起链
  fromChain: string;

  // 跨链的目的链
  toChain: string;

  // 用户井通地址
  address: string;

  // 用户井通密钥
  secret: string;

  // 以太坊地址
  to: string;

  // 井通nft发行方地址
  publisher: string;

  // 井通nft fund code
  fundCode: string;

  // 井通nft token id
  tokenId: string;

  // 用户在井通上721转账hash
  depositHash: string;
}
