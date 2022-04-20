import { test, describe, expect } from "@jest/globals";
import { CombineGridDB } from "../src";
import path from "path";

describe("test CombineGridDB", () => {
  const management = path.join(__dirname, "./data/management", "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79.json");
  const execution = path.join(__dirname, "./data/execution", "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w.json");
  const combineDB = new CombineGridDB(management, execution);

  describe("test filter", () => {
    test("find crowd", async () => {
      await combineDB.read();

      const grids = combineDB.calculateShare("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", 1647142450);

      expect(grids).toEqual([
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
              hash: "3",
              time: 1647594950,
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
              hash: "2",
              time: 1647594950,
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
              hash: "11",
              time: 1647594950,
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
              hash: "12",
              time: 1647594950,
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
              hash: "4",
              time: 1647594950,
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
              hash: "5",
              time: 1647594950,
              account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ],
          appoints: [],
          clears: [],
          quantity: 7
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
              hash: "2",
              time: 1647594950,
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
              hash: "3",
              time: 1647594950,
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
              hash: "22",
              time: 1647594950,
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
              hash: "23",
              time: 1647594950,
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
              hash: "4",
              time: 1647594950,
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
              hash: "5",
              time: 1647594950,
              account: "jPoebDJaVoy5i2ZbpVwebJ7EWm8xw2Qusb",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ],
          appoints: [],
          clears: [],
          quantity: 7
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
              hash: "34",
              time: 1647594950,
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
              hash: "35",
              time: 1647594950,
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
              hash: "54",
              time: 1647595049,
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
              hash: "55",
              time: 1647595051,
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
              hash: "36",
              time: 1647595950,
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
              hash: "37",
              time: 1647595950,
              account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              amount: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "5"
              }
            }
          ],
          appoints: [
            {
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "appoint",
              account: "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w",
              quantity: 1,
              user: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
              startTime: 1647142450,
              hash: "D3DACBB6C6886F90B48F35D3283B8895284846680D4853D95174F0B8656643C7",
              time: 1647595050
            }
          ],
          clears: [],
          quantity: 6
        },
        {
          account: "jhJ6dBNW3YyCuBV48zYdB5rgoRKrBR4jY9",
          joins: [],
          appoints: [
            {
              type: "grid",
              version: "0.01",
              name: "JJCC-JTPT",
              action: "appoint",
              account: "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w",
              quantity: 1,
              user: "jhJ6dBNW3YyCuBV48zYdB5rgoRKrBR4jY9",
              startTime: 1647142450,
              hash: "D3DACBB6C6886F90B48F35D3283B8895284846680D4853D95174F0B8656643C7",
              time: 1647595050
            }
          ],
          clears: [],
          quantity: 1
        }
      ]);
    });

    test("find clearnum", async () => {
      await combineDB.read();

      const grids = combineDB.calculateExecutionClearByUser(
        combineDB.managementGridDB.findCreateGrid("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", 1647142450),
        "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79"
      );
      expect(grids).toEqual(4);
    });

    test("find user clearnum", async () => {
      await combineDB.read();

      const grids = combineDB.calculateUserClear(
        combineDB.managementGridDB.findCreateGrid("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", 1647142450),
        "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79"
      );
      expect(grids).toEqual(6);
    });

    test("find user share", async () => {
      await combineDB.read();

      const grids = combineDB.calculateShareByUser(
        combineDB.managementGridDB.findCreateGrid("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", 1647142450),
        "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79"
      );
      expect(grids).toEqual({
        account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
        appoints: [],
        clears: [],
        joins: [
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JJCC",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "1"
            },
            hash: "3",
            name: "JJCC-JTPT",
            share: {
              counter: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 1
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          },
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JTPT",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "1"
            },
            hash: "2",
            name: "JJCC-JTPT",
            share: {
              base: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 1
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          },
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JJCC",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "1"
            },
            hash: "11",
            name: "JJCC-JTPT",
            share: {
              counter: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 1
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          },
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JTPT",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "1"
            },
            hash: "12",
            name: "JJCC-JTPT",
            share: {
              base: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 1
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          },
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JTPT",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "5"
            },
            hash: "4",
            name: "JJCC-JTPT",
            share: {
              base: {
                currency: "JTPT",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 5
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          },
          {
            account: "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79",
            action: "join",
            amount: {
              currency: "JJCC",
              issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
              value: "5"
            },
            hash: "5",
            name: "JJCC-JTPT",
            share: {
              counter: {
                currency: "JJCC",
                issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or",
                value: "1"
              },
              quantity: 5
            },
            startTime: 1647142450,
            time: 1647594950,
            type: "grid",
            version: "0.01"
          }
        ],
        quantity: 7
      });
    });

    test("find user share breforegrid", async () => {
      await combineDB.read();

      const grids = combineDB.calculateShareByUser(
        combineDB.managementGridDB.findCreateGrid("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853", 1647142450),
        "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK"
      );
      expect(grids).toEqual({
        account: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
        appoints: [
          {
            account: "jGn12m77KhXLgdrb5UaGQ9T4RWQz65853",
            action: "appoint",
            hash: "100",
            name: "JJCC-JTPT",
            quantity: 1,
            startTime: 1647142450,
            time: 1647595050,
            type: "grid",
            user: "jwhN7ysDTo4xShnZEMhj214abhakvNN6kK",
            version: "0.01"
          }
        ],
        clears: [],
        joins: [],
        quantity: 1
      });
    });

    test("check user join", async () => {
      await combineDB.read();

      const joined = combineDB.isJoined("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh79");
      expect(joined).toEqual(true);
    });

    test("check user not join", async () => {
      await combineDB.read();

      const joined = combineDB.isJoined("jGn12m77KhXLgdrb5UaGQ9T4RWQz65853w", "jwnqKpXJYJPeAnUdVUv3LfbxiJh5ZVXh7");
      expect(joined).toEqual(false);
    });
  });
});
