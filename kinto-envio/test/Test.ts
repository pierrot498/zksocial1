import assert from "assert";
import { 
  TestHelpers,
  KintoWallet_AppKeyCreated
} from "generated";
const { MockDb, KintoWallet } = TestHelpers;

describe("KintoWallet contract AppKeyCreated event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for KintoWallet contract AppKeyCreated event
  const event = KintoWallet.AppKeyCreated.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("KintoWallet_AppKeyCreated is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await KintoWallet.AppKeyCreated.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualKintoWalletAppKeyCreated = mockDbUpdated.entities.KintoWallet_AppKeyCreated.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedKintoWalletAppKeyCreated: KintoWallet_AppKeyCreated = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      appKey: event.params.appKey,
      signer: event.params.signer,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualKintoWalletAppKeyCreated, expectedKintoWalletAppKeyCreated, "Actual KintoWalletAppKeyCreated should be the same as the expectedKintoWalletAppKeyCreated");
  });
});
