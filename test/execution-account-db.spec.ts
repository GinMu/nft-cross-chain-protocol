import { test, describe, afterEach, expect } from "@jest/globals";
import { ExecutionAccountDB } from "../src";
import fs from "fs";
import path from "path";
import { createActions } from "./data/tx";
describe("test ManagementGridDB", () => {
  const file = path.join(__dirname, "./data/a.json");
  const gridDB = new ExecutionAccountDB(file);
  describe("test insert", () => {
    afterEach(() => {
      fs.unlinkSync(file);
    });

    test("save data & not repeat", async () => {
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        accounts: []
      });
      gridDB.insert(createActions);
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        accounts: ["jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w"]
      });
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        accounts: ["jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w"]
      });

      gridDB.insert(createActions);
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        accounts: ["jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w"]
      });
    });
  });
});
