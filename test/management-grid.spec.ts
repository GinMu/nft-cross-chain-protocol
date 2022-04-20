import { expect, test, describe } from "@jest/globals";
import { ManagementGrid } from "../src";
import { managementGridOption } from "./data/common";
import {
  validClearActions,
  invalidClearActions,
  validCreateActions,
  invalidCreateActions,
  validDestoryActions,
  invalidDestoryActions,
  validAppointActions,
  invalidAppointActions
} from "./data/management-grid-data";
import {
  appointActions,
  clearActions,
  createActions,
  destroyActions,
  managementActions,
  managementTransactions
} from "./data/tx";

describe("test ManagementGrid", () => {
  const managementGrid = new ManagementGrid(managementGridOption);
  describe("test isClearAction", () => {
    test("if action is valid", () => {
      for (const action of validClearActions) {
        expect(managementGrid.isClearAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidClearActions) {
        expect(managementGrid.isClearAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test isCreateAction", () => {
    test("if action is valid", () => {
      for (const action of validCreateActions) {
        expect(managementGrid.isCreateAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidCreateActions) {
        expect(managementGrid.isCreateAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test isDestroyAction", () => {
    test("if action is valid", () => {
      for (const action of validDestoryActions) {
        expect(managementGrid.isDestroyAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidDestoryActions) {
        expect(managementGrid.isDestroyAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test isAppointAction", () => {
    test("if action is valid", () => {
      for (const action of validAppointActions) {
        expect(managementGrid.isAppointAction(action as any)).toEqual(true);
      }
    });

    test("if action is not valid", () => {
      for (const action of invalidAppointActions) {
        expect(managementGrid.isAppointAction(action as any)).toEqual(false);
      }
    });
  });

  describe("test filter", () => {
    const manage = new ManagementGrid({
      name: "JJCC-JTPT",
      version: "0.01",
      type: "grid"
    });
    test("filterAction", () => {
      expect(manage.filterAction(managementTransactions)).toEqual(managementActions);
    });

    test("filterDestroy", () => {
      expect(manage.filterDestroy(managementTransactions)).toEqual(destroyActions);
    });

    test("filterClear", () => {
      expect(manage.filterClear(managementTransactions)).toEqual(clearActions);
    });

    test("filterAppoint", () => {
      expect(manage.filterAppoint(managementTransactions)).toEqual(appointActions);
    });

    test("filterCreate", () => {
      expect(manage.filterCreate(managementTransactions)).toEqual(createActions);
    });
  });
});
