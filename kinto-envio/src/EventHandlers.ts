/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  KintoWallet,
  KintoWallet_AppKeyCreated,
  KintoWallet_Initialized,
  KintoWallet_InsurancePolicyChanged,
  KintoWallet_KintoWalletInitialized,
  KintoWallet_RecovererChanged,
  KintoWallet_SignersChanged,
  KintoWallet_WalletPolicyChanged,
  KintoWalletFactory,
  KintoWalletFactory_AdminChanged,
  KintoWalletFactory_BeaconUpgraded,
  KintoWalletFactory_Initialized,
  KintoWalletFactory_KintoWalletFactoryCreation,
  KintoWalletFactory_KintoWalletFactoryUpgraded,
  KintoWalletFactory_OwnershipTransferred,
  KintoWalletFactory_Upgraded,
} from "generated";

KintoWallet.AppKeyCreated.handler(async ({ event, context }) => {
  const entity: KintoWallet_AppKeyCreated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    appKey: event.params.appKey,
    signer: event.params.signer,
  };

  context.KintoWallet_AppKeyCreated.set(entity);
});


KintoWallet.Initialized.handler(async ({ event, context }) => {
  const entity: KintoWallet_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.KintoWallet_Initialized.set(entity);
});


KintoWallet.InsurancePolicyChanged.handler(async ({ event, context }) => {
  const entity: KintoWallet_InsurancePolicyChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newPolicy: event.params.newPolicy,
    oldPolicy: event.params.oldPolicy,
  };

  context.KintoWallet_InsurancePolicyChanged.set(entity);
});


KintoWallet.KintoWalletInitialized.handler(async ({ event, context }) => {
  const entity: KintoWallet_KintoWalletInitialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    entryPoint: event.params.entryPoint,
    owner: event.params.owner,
  };

  context.KintoWallet_KintoWalletInitialized.set(entity);
});


KintoWallet.RecovererChanged.handler(async ({ event, context }) => {
  const entity: KintoWallet_RecovererChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newRecoverer: event.params.newRecoverer,
    recoverer: event.params.recoverer,
  };

  context.KintoWallet_RecovererChanged.set(entity);
});


KintoWallet.SignersChanged.handler(async ({ event, context }) => {
  const entity: KintoWallet_SignersChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newSigners: event.params.newSigners,
    oldSigners: event.params.oldSigners,
  };

  context.KintoWallet_SignersChanged.set(entity);
});


KintoWallet.WalletPolicyChanged.handler(async ({ event, context }) => {
  const entity: KintoWallet_WalletPolicyChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newPolicy: event.params.newPolicy,
    oldPolicy: event.params.oldPolicy,
  };

  context.KintoWallet_WalletPolicyChanged.set(entity);
});


KintoWalletFactory.AdminChanged.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_AdminChanged = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousAdmin: event.params.previousAdmin,
    newAdmin: event.params.newAdmin,
  };

  context.KintoWalletFactory_AdminChanged.set(entity);
});


KintoWalletFactory.BeaconUpgraded.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_BeaconUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    beacon: event.params.beacon,
  };

  context.KintoWalletFactory_BeaconUpgraded.set(entity);
});


KintoWalletFactory.Initialized.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_Initialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    version: event.params.version,
  };

  context.KintoWalletFactory_Initialized.set(entity);
});


KintoWalletFactory.KintoWalletFactoryCreation.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_KintoWalletFactoryCreation = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    account: event.params.account,
    owner: event.params.owner,
    version: event.params.version,
  };

  context.KintoWalletFactory_KintoWalletFactoryCreation.set(entity);
});


KintoWalletFactory.KintoWalletFactoryUpgraded.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_KintoWalletFactoryUpgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    oldImplementation: event.params.oldImplementation,
    newImplementation: event.params.newImplementation,
  };

  context.KintoWalletFactory_KintoWalletFactoryUpgraded.set(entity);
});


KintoWalletFactory.OwnershipTransferred.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_OwnershipTransferred = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    previousOwner: event.params.previousOwner,
    newOwner: event.params.newOwner,
  };

  context.KintoWalletFactory_OwnershipTransferred.set(entity);
});


KintoWalletFactory.Upgraded.handler(async ({ event, context }) => {
  const entity: KintoWalletFactory_Upgraded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    implementation: event.params.implementation,
  };

  context.KintoWalletFactory_Upgraded.set(entity);
});

