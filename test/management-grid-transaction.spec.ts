import { expect, test, describe, afterEach } from "@jest/globals";
import { ManagementGridTransaction } from "../src";
import { managementGridOption, wallet, user, hash, token, account } from "./data/common";
import { Transaction } from "@jccdex/jingtum-lib";

import sinon from "sinon";
import { appointActions, clearActions, createActions, destroyActions, managementTransactions } from "./data/tx";
const tp = require("tp-js-sdk");

const sandbox = sinon.createSandbox();
describe("test ManagementGridTransaction", () => {
  const managementTransaction = new ManagementGridTransaction(
    Object.assign({}, managementGridOption, {
      token
    })
  );
  afterEach(() => {
    sandbox.restore();
  });

  describe("test createGrid", () => {
    const createGrid = {
      node: "",
      secret: wallet.secret,
      execution: wallet.address,
      base: {
        amount: {
          currency: "JJCC",
          value: "1000",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        },
        price30: 0.05,
        source: "SWT"
      },
      counter: {
        amount: {
          currency: "JTPT",
          value: "1000",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        },
        price30: 0.05,
        source: "SWT"
      },
      startTime: 1000,
      crowdTime: 2000,
      clearTime: 3000
    };
    test("if action is valid", async () => {
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await managementTransaction.createGrid(createGrid);
      const action = {
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "create",
        base: {
          amount: {
            currency: "JJCC",
            value: "1000",
            issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
          },
          price30: 0.05,
          source: "SWT"
        },
        counter: {
          amount: { currency: "JTPT", value: "1000", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or" },
          price30: 0.05,
          source: "SWT"
        },
        account: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
        startTime: 1000,
        crowdTime: 2000,
        clearTime: 3000
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: "j44w31aGCgzhViTKRXNp9ufWsfLDUcAUXT",
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
          Destination: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
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
      expect(stub.calledOnceWithExactly("", account)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if action is not valid", async () => {
      await expect(
        managementTransaction.createGrid(Object.assign({}, createGrid, { clearTime: 1 }))
      ).rejects.toThrowError("This create action is not valid");
    });
  });

  describe("test clearGrid", () => {
    const clearGrid = {
      node: "",
      secret: wallet.secret,
      execution: wallet.address,
      tokens: {
        base: { currency: "JJCC", value: "100.123", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or" },
        counter: { currency: "JTPT", value: "0.0123", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or" }
      },
      before: {
        base: "100.123",
        counter: "0.0123"
      },
      after: {
        base: "100.123",
        counter: "0.0123"
      },
      margin: {
        base: "100.123",
        counter: "0.0123"
      },
      price30: {
        base: { price: "100.123", source: "SWTC" },
        counter: { price: "0.0123", source: "huobi" }
      },
      quantity: 1,
      startTime: 1000,
      clearTime: 2000
    };
    test("if action is valid", async () => {
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await managementTransaction.clearGrid(clearGrid);
      const action = {
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "clearing",
        account: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
        tokens: {
          base: { currency: "JJCC", value: "100.123", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or" },
          counter: { currency: "JTPT", value: "0.0123", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or" }
        },
        before: { base: "100.123", counter: "0.0123" },
        after: { base: "100.123", counter: "0.0123" },
        margin: { base: "100.123", counter: "0.0123" },
        price30: { base: { price: "100.123", source: "SWTC" }, counter: { price: "0.0123", source: "huobi" } },
        quantity: 1,
        startTime: 1000,
        clearTime: 2000
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: "j44w31aGCgzhViTKRXNp9ufWsfLDUcAUXT",
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
          Destination: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
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
      expect(stub.calledOnceWithExactly("", account)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if action is not valid", async () => {
      await expect(
        managementTransaction.clearGrid(Object.assign({}, clearGrid, { clearTime: 1 }))
      ).rejects.toThrowError("This clear action is not valid");
    });
  });

  describe("test destoryGrid", () => {
    const destroyGrid = {
      node: "",
      secret: wallet.secret,
      execution: wallet.address,
      startTime: 1000
    };
    test("if action is valid", async () => {
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await managementTransaction.destoryGrid(destroyGrid);
      const action = {
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "destory",
        account: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
        startTime: 1000
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: "j44w31aGCgzhViTKRXNp9ufWsfLDUcAUXT",
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
          Destination: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
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
      expect(stub.calledOnceWithExactly("", account)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if action is not valid", async () => {
      await expect(
        managementTransaction.destoryGrid(Object.assign({}, destroyGrid, { startTime: -1 }))
      ).rejects.toThrowError("This destroy action is not valid");
    });
  });

  describe("test appointGrid", () => {
    const appointGrid = {
      node: "",
      secret: wallet.secret,
      execution: wallet.address,
      user,
      quantity: 1,
      startTime: 1000
    };
    test("if action is valid", async () => {
      const stub = sandbox.stub(Transaction, "fetchSequence");
      stub.resolves(1);
      const stub1 = sandbox.stub(Transaction, "sendRawTransaction");
      stub1.resolves(hash);
      const stub2 = sandbox.stub(tp, "signJingtumTransaction");
      stub2.resolves({
        result: true,
        data: "test"
      });

      const h = await managementTransaction.appointGrid(appointGrid);
      const action = {
        type: "grid",
        version: "0.01",
        name: "JCC-TPT",
        action: "appoint",
        account: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
        quantity: 1,
        user: "jBSDx7ftHMRKmnQgE9CDs6uJoVvd6YK8Y6",
        startTime: 1000
      };

      expect(
        stub2.calledOnceWithExactly({
          Account: "j44w31aGCgzhViTKRXNp9ufWsfLDUcAUXT",
          Amount: { currency: "JJCC", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", value: "0.01" },
          Destination: "jPCYhbTXrNhPMH5bsa8b1BWGz4cTmiS4JA",
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
      expect(stub.calledOnceWithExactly("", account)).toEqual(true);
      expect(
        stub1.calledOnceWithExactly({
          url: "",
          blob: "test"
        })
      );
      expect(h).toEqual(hash);
    });

    test("if action is not valid", async () => {
      await expect(
        managementTransaction.appointGrid(Object.assign({}, appointGrid, { startTime: -1 }))
      ).rejects.toThrowError("This appoint action is not valid");
    });
  });

  describe("test filter", () => {
    const manage = new ManagementGridTransaction({
      name: "JJCC-JTPT",
      version: "0.01",
      type: "grid",
      token: {
        value: "0.01",
        currency: "JTPT",
        issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
      },
      account: "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w"
    });
    test("filterActionByExecution", () => {
      expect(manage.filterActionByExecution(managementTransactions, "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w")).toEqual([
        destroyActions[0],
        clearActions[0],
        appointActions[0],
        createActions[0]
      ]);
    });

    test("filterDestroyByExecution", () => {
      expect(manage.filterDestroyByExecution(managementTransactions, "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w")).toEqual([
        destroyActions[0]
      ]);
    });

    test("filterClearByExecution", () => {
      expect(manage.filterClearByExecution(managementTransactions, "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w")).toEqual([
        clearActions[0]
      ]);
    });

    test("filterAppointByExecution", () => {
      expect(manage.filterAppointByExecution(managementTransactions, "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w")).toEqual([
        appointActions[0]
      ]);
    });

    test("filterCreateByExecution", () => {
      expect(manage.filterCreateByExecution(managementTransactions, "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w")).toEqual([
        createActions[0]
      ]);
    });
  });
});
