import { expect, test, describe, afterEach } from "@jest/globals";
import { UserGridTransaction } from "../src";
import { gridOption, wallet, hash, token, account, user } from "./data/common";
import { Transaction } from "@jccdex/jingtum-lib";

import sinon from "sinon";
import { userActions, userClearActions, userJoinActions, userTxs } from "./data/tx";
const tp = require("tp-js-sdk");

const sandbox = sinon.createSandbox();
describe("test UserGridTransaction", () => {
  const userTransaction = new UserGridTransaction(
    Object.assign({}, gridOption, {
      token,
      account: wallet.address
    })
  );
  afterEach(() => {
    sandbox.restore();
  });

  describe("test joinGrid", () => {
    test("if base action is valid", async () => {
      const joinGrid = {
        node: "",
        secret: wallet.secret,
        execution: account,
        share: {
          quantity: 3,
          base: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" }
        },
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

      const h = await userTransaction.joinGrid(joinGrid);
      const action = {
        share: {
          quantity: 3,
          base: {
            currency: "JJCC",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
            value: "100.123"
          }
        },
        startTime: 1000,
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "join"
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: wallet.address,
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "300.369" },
          Destination: account,
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
      const joinGrid = {
        node: "",
        secret: wallet.secret,
        execution: account,
        share: {
          quantity: 3,
          counter: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "100.123" }
        },
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

      const h = await userTransaction.joinGrid(joinGrid);
      const action = {
        share: {
          quantity: 3,
          counter: {
            currency: "JJCC",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
            value: "100.123"
          }
        },
        startTime: 1000,
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "join"
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: wallet.address,
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "300.369" },
          Destination: account,
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
      const joinGrid = {
        node: "",
        execution: wallet.address,
        share: {
          quantity: 3,
          base: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "-1" }
        },
        startTime: 1000
      };
      await expect(userTransaction.joinGrid(joinGrid)).rejects.toThrowError("This join action is not valid");
    });
  });

  describe("test clearAction", () => {
    test("if action is valid", async () => {
      const clearGrid = {
        node: "",
        secret: wallet.secret,
        execution: account,
        quantity: 1,
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

      const h = await userTransaction.clearGrid(clearGrid);
      const action = {
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "clearing",
        startTime: 1000,
        quantity: 1
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: wallet.address,
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
          Destination: account,
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
        execution: wallet.address,
        quantity: -1,
        startTime: 1000
      };
      await expect(userTransaction.clearGrid(clearGrid)).rejects.toThrowError("This clear action is not valid");
    });
  });

  describe("test filter", () => {
    const userGrid = new UserGridTransaction({
      type: "grid",
      version: "0.01",
      name: "JJCC-JTPT",
      account: user,
      token: {
        currency: "JJCC",
        value: "0.01",
        issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
      }
    });
    test("filterAction", () => {
      expect(userGrid.filterActionByExecution(userTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual(userActions);
    });

    test("filterJoin", () => {
      expect(userGrid.filterJoinByExecution(userTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual(userJoinActions);
    });

    test("filterClear", () => {
      expect(userGrid.filterClearByExecution(userTxs, "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79")).toEqual(userClearActions);
    });
  });
});
