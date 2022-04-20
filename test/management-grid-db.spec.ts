import { test, describe, afterEach, expect } from "@jest/globals";
import { ManagementGridDB } from "../src";
import fs from "fs";
import path from "path";
import { appointActions, clearActions, createActions, destroyActions } from "./data/tx";
describe("test ManagementGridDB", () => {
  const file = path.join(__dirname, "./data/c.json");
  const gridDB = new ManagementGridDB(file);
  describe("test insert", () => {
    afterEach(() => {
      fs.unlinkSync(file);
    });

    test("save data & not repeat", async () => {
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        latest: null,
        create: [],
        appoint: [],
        clearing: [],
        destory: []
      });
      gridDB.insertAppoint(appointActions);
      gridDB.insertClear(clearActions);
      gridDB.insertCreate(createActions);
      gridDB.insertDestory(destroyActions);
      gridDB.updateLatest("2022-03-21");
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        latest: "2022-03-21",
        create: [createActions[0]],
        appoint: [appointActions[0]],
        clearing: [clearActions[0]],
        destory: [destroyActions[0]]
      });
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        latest: "2022-03-21",
        create: [createActions[0]],
        appoint: [appointActions[0]],
        clearing: [clearActions[0]],
        destory: [destroyActions[0]]
      });

      gridDB.insertAppoint(appointActions);
      gridDB.insertClear(clearActions);
      gridDB.insertCreate(createActions);
      gridDB.insertDestory(destroyActions);
      gridDB.updateLatest("2022-03-22");
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        latest: "2022-03-22",
        create: [createActions[0]],
        appoint: [appointActions[0]],
        clearing: [clearActions[0]],
        destory: [destroyActions[0]]
      });
    });
  });

  describe("test filter", () => {
    test("find crowd", async () => {
      const managementGridDB = new ManagementGridDB(
        path.join(__dirname, "./data/management", "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79.json")
      );
      await managementGridDB.read();

      const grids = managementGridDB.findCrowdGrids(
        1648441006,
        {
          currency: "JJCC",
          issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
        },
        2592000
      );
      expect(grids).toEqual([
        {
          type: "grid",
          version: "0.01",
          name: "JJCC-JTPT",
          time: 1647056060,
          action: "create",
          base: {
            amount: {
              value: "1",
              currency: "JTPT",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
            },
            price30: 0.05,
            source: "SWTC"
          },
          counter: {
            amount: {
              value: "1",
              currency: "JJCC",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"
            },
            price30: 0.05,
            source: "SWTC"
          },
          account: "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w",
          startTime: 1647142450,
          crowdTime: 1649734450,
          clearTime: 1650166450,
          hash: "9360DF1972E35187B53D18B2E5C5BDB483D740898A5827600CE34A494072A42E"
        }
      ]);
    });
  });

  describe("test calculate", () => {
    const management = path.join(__dirname, "./data/management", "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79.json");
    const db = new ManagementGridDB(management);

    test("calculate profit", async () => {
      await db.read();
      const profit = db.calculateAllProfit("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w");
      expect(profit).toEqual("0.02607");

      const profit1 = db.calculateCurrentProfit("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w");
      expect(profit1).toEqual("0.02607");
    });
  });
});
