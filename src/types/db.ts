import { IParsedTransfer } from "@jccdex/grid-protocol/lib/types/transaction";

export interface ICrossChainTable {
  // 最新更新时间
  latest?: string;
  orders?: IParsedTransfer[];
  executedOrders?: IParsedTransfer[];
  canceledOrders?: IParsedTransfer[];
}
