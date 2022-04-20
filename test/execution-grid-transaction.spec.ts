import { expect, test, describe, afterEach } from "@jest/globals";
import { ExecutionGridTransaction } from "../src";
import { gridOption, wallet, user, hash } from "./data/common";
import { Transaction } from "@jccdex/jingtum-lib";

import sinon from "sinon";
import { executionActions, executionJoinActions, executionTxs } from "./data/tx";
const tp = require("tp-js-sdk");

const sandbox = sinon.createSandbox();
describe("test ExecutionGridTransaction", () => {
  const executionTransaction = new ExecutionGridTransaction(Object.assign({}, gridOption, { account: wallet.address }));

  afterEach(() => {
    sandbox.restore();
  });

  describe("test clearGrid", () => {
    test("if base action is valid", async () => {
      const clearGrid = {
        node: "",
        secret: wallet.secret,
        share: {
          quantity: 3,
          base: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" },
          total: "300.369"
        },
        account: user,
        startTime: 1000
      };
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await executionTransaction.clearGrid(clearGrid);
      const action = {
        share: {
          quantity: 3,
          base: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" },
          total: "300.369"
        },
        account: user,
        startTime: 1000,
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "clearing"
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: wallet.address,
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "300.369" },
          Destination: user,
          Fee: 0.01,
          Flags: 0,
          Memos: [
            {
              Memo: {
                MemoData: JSON.stringify(action),
                MemoType: "string"
              }
            }
          ],
          TransactionType: "Payment",
          Sequence: 1
        })
      ).toEqual(true);
      expect(stub.calledOnceWithExactly("", wallet.address)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if counter action is valid", async () => {
      const clearGrid = {
        node: "",
        secret: wallet.secret,
        share: {
          quantity: 3,
          counter: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" },
          total: "300.369"
        },
        account: user,
        startTime: 1000
      };
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await executionTransaction.clearGrid(clearGrid);
      const action = {
        share: {
          quantity: 3,
          counter: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" },
          total: "300.369"
        },
        account: user,
        startTime: 1000,
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "clearing"
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: wallet.address,
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "300.369" },
          Destination: user,
          Fee: 0.01,
          Flags: 0,
          Memos: [
            {
              Memo: {
                MemoData: JSON.stringify(action),
                MemoType: "string"
              }
            }
          ],
          TransactionType: "Payment",
          Sequence: 1
        })
      ).toEqual(true);
      expect(stub.calledOnceWithExactly("", wallet.address)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if action is not valid", async () => {
      const clearGrid = {
        node: "",
        address: wallet.address,
        share: {
          quantity: 3,
          base: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" },
          total: "300.36"
        },
        account: user,
        startTime: 1000
      };
      await expect(executionTransaction.clearGrid(clearGrid)).rejects.toThrowError("This clear action is not valid");
    });
  });

  describe("test filter", () => {
    const executionGrid = new ExecutionGridTransaction({
      type: "grid",
      version: "0.01",
      name: "JJCC-JTPT",
      account: user
    });
    test("filterAction", () => {
      expect(executionGrid.filterActionByUser(executionTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual([
        executionActions[2]
      ]);
    });

    test("filterJoin", () => {
      expect(executionGrid.filterJoinByUser(executionTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual([
        executionJoinActions[2]
      ]);
    });

    test("filterClear", () => {
      expect(executionGrid.filterClearByUser(executionTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual([]);
    });
  });
});
