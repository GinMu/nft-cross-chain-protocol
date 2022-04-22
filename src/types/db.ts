import { IParsedTransfer } from "@jccdex/grid-protocol/lib/types/transaction";

export interface ICrossChainTable {
  orders?: IParsedTransfer[];
  executedOrders?: IParsedTransfer[];
  canceledOrders?: IParsedTransfer[];
}

export interface ICrossChainDate {
  latest?: string;
}
