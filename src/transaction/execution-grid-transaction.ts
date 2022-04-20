import ExecutionGrid from "../grid/execution-grid";
import { IExexcutionClearMemo, IClearTransaction } from "../types/execution";
import { IExecutionGridTransactionOptions } from "../types/options";
import { ExecutionAction } from "../types/execution";
import transfer from "../util/tp-helper";
import { IParsedTransfer, ITransfer } from "../types/transaction";
const invariant = require("tiny-invariant");

export default class ExecutionGridTransaction extends ExecutionGrid {
  private account: string;
  constructor(options: IExecutionGridTransactionOptions) {
    const { name, version, type, account } = options;
    super({ name, version, type });
    invariant(this.isValidAccount(account), "This account is not valid");
    this.account = account;
  }

  public async clearGrid(grid: IClearTransaction): Promise<string> {
    const { account, node, secret } = grid;
    delete grid.node;
    delete grid.secret;
    const memo: IExexcutionClearMemo = Object.assign({}, grid, {
      type: this.type,
      version: this.version,
      name: this.name,
      action: ExecutionAction.CLEAR
    });
    invariant(this.isClearAction(memo), "This clear action is not valid");
    const share: any = grid.share;
    const token = share.base || share.counter;
    const currency = token.currency;
    const issuer = token.issuer;
    const amount = share.total;
    const hash = await transfer({
      node,
      secret,
      from: this.account,
      to: account,
      value: amount,
      currency: currency,
      issuer: issuer,
      memo: JSON.stringify(memo)
    });

    return hash;
  }

  public filterClearByUser(transactions: ITransfer[], user: string): IParsedTransfer[] {
    return this.filterClear(transactions).filter((tx) => tx.account === user);
  }

  public filterJoinByUser(transactions: ITransfer[], user: string): IParsedTransfer[] {
    return this.filterUserJoin(transactions).filter((tx) => tx.account === user);
  }

  public filterActionByUser(transactions: ITransfer[], user: string): IParsedTransfer[] {
    return this.filterAction(transactions).filter((tx) => tx.account === user);
  }
}
