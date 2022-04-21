# nft-cross-chain-protocol

NFT cross chain protocol on jingtum chain

## ETH -> SWTC

NFT 从以太坊跨链到井通

交易分两步：

1. 用户在以太坊调用 nft dao 合约 deposit，将 721 转账给以太坊合约。
2. 用户调用 submitDepositOrder 在井通链上转账 1 swt 到井通 nft 银关地址, 附带相关跨链信息。

```javascript
import { NFTDao } from "@jccdex/ethereum-contract";
import NFTTransaction from "@jccdex/nft-cross-chain-protocol";

const options = {
  account: ethereum.selectedAddress,
  chainId: "以太坊chain id",
  web3: this.web3,
  nftDaoContract: "以太坊nft dao合约地址",
  multicallAddress: "以太坊multicall合约地址"
};
const nftDao = new NFTDao(options);

const nft = "NFT合约地址";
const id = "NFT id";
const jingtum = "井通地址";
const fee = "手续费，默认为0";

// 充币，从以太坊到井通

// 充币前需检查nft是否授权给nft dao合约，调用erc-721.ts isApprovedForAll方法
// 如果未授权，调用setApprovalForAll方法
const result = await nftDao.deposit(nft, id, jingtum, fee);

const jingtumNft = "井通NFT银关地址";
// 井通rpc节点数组
const nodes = [""];
const nftTransaction = new NFTTransaction(jingtumNft, nodes);

const depositData = {

  from: "用户以太坊地址";

  address: "用户井通地址";

  secret: "用户井通密钥";

  nft: "以太坊nft合约地址";

  id: "以太坊nft id";

  depositHash: "上述deposit交易hash";
}

const hash = await nftTransaction.submitDepositOrder(depositData);


```

## SWTC -> ETH

NFT 从井通跨链到以太坊

交易分两步：

1. 用户调用 transfer721 在井通链上将 721 转账给井通 721 银关地址。
2. 用户调用 submitWithdrawOrder 支付 0.0075 jeth 作为手续费到井通 721 银关地址，附带相关跨链信息。

```javascript
import NFTTransaction from "@jccdex/nft-cross-chain-protocol";

const jingtumNft = "井通NFT银关地址";
// 井通rpc节点数组
const nodes = [""];
const nftTransaction = new NFTTransaction(jingtumNft, nodes);

const address = "";
const secret = "";
const id = "";

const hash721 = await nftTransaction.transfer721(address, secret, id);


const withdrawData = {


  address: "用户井通地址";

  secret: "用户井通密钥";

  to: "用户以太坊地址";

  nft: "井通nft发行方地址";

  id: "井通nft id";

  depositHash: "上述transfer721 hash";
}

const hash = await nftTransaction.submitWithdrawOrder(withdrawData);


```
