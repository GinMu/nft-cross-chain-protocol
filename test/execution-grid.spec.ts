import { expect, test, describe } from "@jest/globals";
import { ExecutionGrid } from "../src";
import { gridOption } from "./data/common";
import { validClearActions, invalidClearActions } from "./data/execution-grid-data";
import { executionActions, executionClearActions, executionJoinActions, executionTxs } from "./data/tx";
describe("test ExecutionGrid", () => {
  const executionGrid = new ExecutionGrid(gridOption);
  describe("test isClearAction", () => {
    test("if action is valid", () => {
      for (const action of validClearActions) {
        expect(executionGrid.isClearAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidClearActions) {
        expect(executionGrid.isClearAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test filter", () => {
    const executionGrid = new ExecutionGrid({
      type: "grid",
      version: "0.01",
      name: "JJCC-JTPT"
    });
    test("filterAction", () => {
      expect(executionGrid.filterAction(executionTxs)).toEqual(executionActions);
    });

    test("filterJoin", () => {
      expect(executionGrid.filterUserJoin(executionTxs)).toEqual(executionJoinActions);
    });

    test("filterClear", () => {
      expect(executionGrid.filterClear(executionTxs)).toEqual(executionClearActions);
    });
  });
});
