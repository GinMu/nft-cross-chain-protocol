import { test, describe, afterEach, expect } from "@jest/globals";
import { ExecutionGridDB, ManagementAction } from "../src";
import fs from "fs";
import path from "path";
import { executionJoinActions, executionClearActions, userClearActions } from "./data/tx";
describe("test ManagementGridDB", () => {
  const file = path.join(__dirname, "./data/b.json");
  const gridDB = new ExecutionGridDB(file);
  describe("test insert", () => {
    afterEach(() => {
      fs.unlinkSync(file);
    });
    test("save data & not repeat", async () => {
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        latest: null,
        clearing: [],
        user: {
          join: [],
          clearing: []
        }
      });
      gridDB.insertClear(executionClearActions);
      gridDB.insertUserJoin(executionJoinActions);
      gridDB.insertUserClear(userClearActions);
      gridDB.updateLatest("2022-03-21");
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        latest: "2022-03-21",
        clearing: executionClearActions,
        user: {
          join: executionJoinActions.slice(0, 2),
          clearing: userClearActions
        }
      });
      await gridDB.read();
      expect(gridDB.db.data).toEqual({
        latest: "2022-03-21",
        clearing: executionClearActions,
        user: {
          join: executionJoinActions.slice(0, 2),
          clearing: userClearActions
        }
      });

      gridDB.insertClear(executionClearActions);
      gridDB.insertUserJoin(executionJoinActions);
      gridDB.insertUserClear(userClearActions);
      gridDB.updateLatest("2022-03-22");
      await gridDB.write();
      expect(JSON.parse(fs.readFileSync(file, "utf-8"))).toEqual({
        latest: "2022-03-22",
        clearing: executionClearActions,
        user: {
          join: executionJoinActions.slice(0, 2),
          clearing: userClearActions
        }
      });
    });
  });

  describe("test filter", () => {
    test("filter joins ", async () => {
      const account = "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w";
      const gridDB = new ExecutionGridDB(path.join(__dirname, "./data/execution", account + ".json"));

      await gridDB.read();
      const grid = {
        type: "grid",
        version: "0.01",
        name: "JJCC-JTPT",
        action: ManagementAction.CREATE,
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
        clearTime: 1650166450
      };
      const joins = gridDB.filterJoins(grid);
      expect(joins).toEqual([
        {
          account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
          joins: [
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "3",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "2",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "11",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "12",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "4",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "5",
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ]
        },
        {
          account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
          joins: [
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "2",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "3",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "22",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 1
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "23",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "4",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "5",
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ]
        },
        {
          account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
          joins: [
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "34",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647594950,
              hash: "35",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647595049,
              hash: "54",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647595051,
              hash: "55",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                base: {
                  currency: "JTPT",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647595950,
              hash: "36",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            },
            {
              share: {
                counter: {
                  currency: "JJCC",
                  issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                  value: "1"
                },
                quantity: 5
              },
              startTime: 1647142450,
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "join",
              time: 1647595950,
              hash: "37",
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ]
        }
      ]);
    });
  });
});
