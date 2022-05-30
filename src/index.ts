import invariant from "@jccdex/grid-protocol/lib/util/tiny-invariant";
import wallet from "@jccdex/grid-protocol/lib/util/wallet";
import { isDef } from "@jccdex/grid-protocol/lib/util";
import { ethWallet } from "jcc_wallet";
import { IDepositOrder, IWithdrawOrder } from "./types/transaction";
import { Transaction } from "@jccdex/jingtum-lib";
import { IToken, IAmount } from "@jccdex/grid-protocol/lib/types/common";
import { ITransfer, IParsedTransfer } from "@jccdex/grid-protocol/lib/types/transaction";
import { convertTime, convertMemo } from "@jccdex/grid-protocol/lib/util";
import NFTCrossChainDB, { NFTDateDB } from "./db/nft-cross-chain-db";

export { NFTCrossChainDB, NFTDateDB };

export default class NFTTransaction {
  public static SWT = "SWTC";
  public static ETHEREUM = "ETH";
  public static POLYGON = "POLYGON";

  public static isHash(value): boolean {
    return /^(0x)?[a-f0-9]{64}$/gi.test(value);
  }

  public static parseTransaction(transaction: ITransfer): IParsedTransfer {
    const tx: any = Object.assign({}, transaction);
    const memos = tx.memos;
    delete tx.memos;
    tx.time = convertTime(tx.time);
    tx.memo = convertMemo(memos);

    return tx as IParsedTransfer;
  }
  public static hasValidLength(memo, len: number): boolean {
    if (!isDef(memo)) {
      return false;
    }
    return Object.keys(memo).length === len;
  }

  public static isSend(type: string): boolean {
    return type === "Send";
  }

  public static isReceive(type: string): boolean {
    return type === "Receive";
  }

  public static isSuccess(v: string): boolean {
    return v === "tesSUCCESS";
  }

  public static isNativeToken(token: IToken): boolean {
    return (token.currency.toUpperCase() === "SWT" || token.currency.toUpperCase() === "SWTC") && token.issuer === "";
  }

  public static isSWTC(chain: string): boolean {
    return chain === NFTTransaction.SWT;
  }
  public static notSWTC(chain: string): boolean {
    return chain === NFTTransaction.ETHEREUM || chain === NFTTransaction.POLYGON;
  }

  /**
   * 检查是否是 eth -> swtc 订单报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isDeposit(data): boolean {
    const { fromChain, toChain, from, to, nft, id, depositHash } = data || {};

    return (
      NFTTransaction.hasValidLength(data, 7) &&
      NFTTransaction.notSWTC(fromChain) &&
      NFTTransaction.isSWTC(toChain) &&
      ethWallet.isValidAddress(from) &&
      wallet.isValidAddress(to) &&
      ethWallet.isValidAddress(nft) &&
      isDef(id) &&
      NFTTransaction.isHash(depositHash)
    );
  }

  /**
   * 检查是否是 eth -> swtc 订单执行报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isExecutedDeposit(data): boolean {
    const { fromChain, toChain, from, to, nft, id, depositHash, withdrawHash } = data || {};
    return (
      NFTTransaction.isDeposit({ fromChain, toChain, from, to, nft, id, depositHash }) &&
      NFTTransaction.isHash(withdrawHash)
    );
  }

  /**
   * 检查是否是 eth -> swtc 订单取消报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isCanceledDeposit(data): boolean {
    const { fromChain, toChain, from, to, nft, id, depositHash, status } = data || {};
    return NFTTransaction.isDeposit({ fromChain, toChain, from, to, nft, id, depositHash }) && status === "cancel";
  }

  /**
   * 检查是否是 swtc -> eth 订单报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isWithdraw(data): boolean {
    const { fromChain, toChain, from, to, publisher, id, fundCode, depositHash } = data || {};

    return (
      NFTTransaction.hasValidLength(data, 8) &&
      NFTTransaction.isSWTC(fromChain) &&
      NFTTransaction.notSWTC(toChain) &&
      wallet.isValidAddress(from) &&
      ethWallet.isValidAddress(to) &&
      wallet.isValidAddress(publisher) &&
      isDef(fundCode) &&
      NFTTransaction.isHash(id) &&
      NFTTransaction.isHash(depositHash)
    );
  }

  /**
   * 检查是否是 swtc -> eth 订单执行报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isExecutedWithdraw(data): boolean {
    const { fromChain, toChain, from, to, publisher, id, fundCode, depositHash, withdrawHash } = data || {};
    return (
      NFTTransaction.isWithdraw({ fromChain, toChain, from, to, publisher, fundCode, id, depositHash }) &&
      NFTTransaction.isHash(withdrawHash)
    );
  }

  /**
   * 检查是否是 swtc -> eth 订单取消报文
   *
   * @static
   * @param {*} data
   * @returns {boolean}
   * @memberof NFTTransaction
   */
  public static isCanceledWithdraw(data): boolean {
    const { fromChain, toChain, from, to, publisher, id, fundCode, depositHash, status } = data || {};
    return (
      NFTTransaction.isWithdraw({ fromChain, toChain, from, to, publisher, fundCode, id, depositHash }) &&
      status === "cancel"
    );
  }

  private nftFingate: string;
  private transaction: Transaction;

  private token = {
    currency: "SWT",
    value: "1",
    issuer: ""
  };

  private fee: IAmount;

  /**
   * Creates an instance of NFTTransaction.
   * @param {string} nftFingate 井通nft银关地址
   * @param {string[]} nodes 井通rpc节点
   * @param {IAmount} [fee] 提币手续费
   * @memberof NFTTransaction
   */
  constructor(nftFingate: string, nodes: string[], fee?: IAmount) {
    invariant(wallet.isValidAddress(nftFingate), "jingtum nft fingate is not valid!");
    this.nftFingate = nftFingate;
    this.transaction = new Transaction("jingtum", nodes, 0);
    this.fee = fee || {
      currency: "JETH",
      value: "0.0075",
      issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
    };
  }

  /**
   * ethereum -> swt 充币订单登记
   *
   * @param {IDepositOrder} data
   * @returns
   * @memberof NFTTransaction
   */
  public async submitDepositOrder(data: IDepositOrder) {
    const { fromChain, toChain, from, address, secret, nft, id, depositHash } = data;
    const memo = {
      fromChain,
      toChain,
      from,
      to: address,
      nft,
      id,
      depositHash
    };
    invariant(NFTTransaction.isDeposit(memo), "The deposit order is not valid!");

    const hash = await this.transaction.transfer(
      address,
      secret,
      this.token.value,
      JSON.stringify(memo),
      this.nftFingate,
      this.token.currency,
      this.token.issuer
    );
    return hash;
  }

  /**
   * swt -> ethereum 提币订单登记
   *
   * @param {IWithdrawOrder} data
   * @returns {Promise<string>}
   * @memberof NFTTransaction
   */
  public async submitWithdrawOrder(data: IWithdrawOrder): Promise<string> {
    const { fromChain, toChain, address, secret, to, publisher, fundCode, tokenId, depositHash } = data;

    const memo = {
      fromChain,
      toChain,
      from: address,
      to,
      publisher,
      fundCode,
      id: tokenId,
      depositHash
    };
    invariant(NFTTransaction.isWithdraw(memo), "The withdraw order is not valid!");

    const hash = await this.transaction.transfer(
      address,
      secret,
      this.fee.value,
      JSON.stringify(memo),
      this.nftFingate,
      this.fee.currency,
      this.fee.issuer
    );
    return hash;
  }

  /**
   * 井通721转账
   *
   * @param {string} address 用户井通钱包地址
   * @param {string} secret 用户井通钱包秘钥
   * @param {(string | number)} id 井通721通证id
   * @returns {Promise<string>}
   * @memberof NFTTransaction
   */
  public async transfer721(address: string, secret: string, id: string | number): Promise<string> {
    const hash = await this.transaction.transfer721(address, secret, this.nftFingate, id as string);
    return hash;
  }
}
