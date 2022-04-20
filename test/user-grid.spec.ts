import { expect, test, describe } from "@jest/globals";
import { UserGrid } from "../src";
import { gridOption } from "./data/common";
import { validJoinActions, invalidJoinActions, validClearActions, invalidClearActions } from "./data/user-grid-data";
describe("test UserGrid", () => {
  const userGrid = new UserGrid(gridOption);
  describe("test isJoinAction", () => {
    test("if action is valid", () => {
      for (const action of validJoinActions) {
        expect(userGrid.isJoinAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidJoinActions) {
        expect(userGrid.isJoinAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test isClearAction", () => {
    test("if action is valid", () => {
      for (const action of validClearActions) {
        expect(userGrid.isClearAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidClearActions) {
        expect(userGrid.isClearAction(action as any)).toEqual(false);
      }
    });
  });
});
