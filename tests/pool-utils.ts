import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AdminUpdated,
  Borrow,
  BorrowTesting1,
  BorrowTesting2,
  DaoUpdated,
  FeeParamsUpdated,
  Initialized,
  Liquidation,
  OracleSet,
  OwnershipTransferred,
  Paused,
  PayDebt,
  RatesUpdated,
  RepayTesting1,
  RepayTesting2,
  Supply,
  TokenForBorrowingAdded,
  TokenForLendingAdded,
  Unpaused,
  Upgraded,
  UtilizationReset,
  Withdraw,
  WithdrawTesting
} from "../generated/Pool/Pool"

export function createAdminUpdatedEvent(newAdmin: Address): AdminUpdated {
  let adminUpdatedEvent = changetype<AdminUpdated>(newMockEvent())

  adminUpdatedEvent.parameters = new Array()

  adminUpdatedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminUpdatedEvent
}

export function createBorrowEvent(
  sender: Address,
  asset: Address,
  amount: BigInt,
  amountInDollars: BigInt,
  totalAmountAvailableForBorrowInDollars: BigInt,
  userPresent: boolean,
  userIndex: BigInt,
  currentUserTokenBorrowedAmount: BigInt
): Borrow {
  let borrowEvent = changetype<Borrow>(newMockEvent())

  borrowEvent.parameters = new Array()

  borrowEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "amountInDollars",
      ethereum.Value.fromUnsignedBigInt(amountInDollars)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmountAvailableForBorrowInDollars",
      ethereum.Value.fromUnsignedBigInt(totalAmountAvailableForBorrowInDollars)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "userPresent",
      ethereum.Value.fromBoolean(userPresent)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "userIndex",
      ethereum.Value.fromSignedBigInt(userIndex)
    )
  )
  borrowEvent.parameters.push(
    new ethereum.EventParam(
      "currentUserTokenBorrowedAmount",
      ethereum.Value.fromUnsignedBigInt(currentUserTokenBorrowedAmount)
    )
  )

  return borrowEvent
}

export function createBorrowTesting1Event(
  sender: Address,
  amountInDollars: BigInt,
  totalAmountAvailableForBorrowInDollars: BigInt
): BorrowTesting1 {
  let borrowTesting1Event = changetype<BorrowTesting1>(newMockEvent())

  borrowTesting1Event.parameters = new Array()

  borrowTesting1Event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  borrowTesting1Event.parameters.push(
    new ethereum.EventParam(
      "amountInDollars",
      ethereum.Value.fromUnsignedBigInt(amountInDollars)
    )
  )
  borrowTesting1Event.parameters.push(
    new ethereum.EventParam(
      "totalAmountAvailableForBorrowInDollars",
      ethereum.Value.fromUnsignedBigInt(totalAmountAvailableForBorrowInDollars)
    )
  )

  return borrowTesting1Event
}

export function createBorrowTesting2Event(
  sender: Address,
  balance: BigInt,
  amount: BigInt
): BorrowTesting2 {
  let borrowTesting2Event = changetype<BorrowTesting2>(newMockEvent())

  borrowTesting2Event.parameters = new Array()

  borrowTesting2Event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  borrowTesting2Event.parameters.push(
    new ethereum.EventParam(
      "balance",
      ethereum.Value.fromUnsignedBigInt(balance)
    )
  )
  borrowTesting2Event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return borrowTesting2Event
}

export function createDaoUpdatedEvent(dao: Address): DaoUpdated {
  let daoUpdatedEvent = changetype<DaoUpdated>(newMockEvent())

  daoUpdatedEvent.parameters = new Array()

  daoUpdatedEvent.parameters.push(
    new ethereum.EventParam("dao", ethereum.Value.fromAddress(dao))
  )

  return daoUpdatedEvent
}

export function createFeeParamsUpdatedEvent(
  feeWallet: Address,
  fee: BigInt,
  liquidationPenalty: BigInt
): FeeParamsUpdated {
  let feeParamsUpdatedEvent = changetype<FeeParamsUpdated>(newMockEvent())

  feeParamsUpdatedEvent.parameters = new Array()

  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam("feeWallet", ethereum.Value.fromAddress(feeWallet))
  )
  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )
  feeParamsUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationPenalty",
      ethereum.Value.fromUnsignedBigInt(liquidationPenalty)
    )
  )

  return feeParamsUpdatedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createLiquidationEvent(
  liquidator: Address,
  borrower: Address,
  tokenRepaid: Address,
  repayAmount: BigInt,
  collateralToken: Address,
  collateralSeizedAmount: BigInt
): Liquidation {
  let liquidationEvent = changetype<Liquidation>(newMockEvent())

  liquidationEvent.parameters = new Array()

  liquidationEvent.parameters.push(
    new ethereum.EventParam(
      "liquidator",
      ethereum.Value.fromAddress(liquidator)
    )
  )
  liquidationEvent.parameters.push(
    new ethereum.EventParam("borrower", ethereum.Value.fromAddress(borrower))
  )
  liquidationEvent.parameters.push(
    new ethereum.EventParam(
      "tokenRepaid",
      ethereum.Value.fromAddress(tokenRepaid)
    )
  )
  liquidationEvent.parameters.push(
    new ethereum.EventParam(
      "repayAmount",
      ethereum.Value.fromUnsignedBigInt(repayAmount)
    )
  )
  liquidationEvent.parameters.push(
    new ethereum.EventParam(
      "collateralToken",
      ethereum.Value.fromAddress(collateralToken)
    )
  )
  liquidationEvent.parameters.push(
    new ethereum.EventParam(
      "collateralSeizedAmount",
      ethereum.Value.fromUnsignedBigInt(collateralSeizedAmount)
    )
  )

  return liquidationEvent
}

export function createOracleSetEvent(oracle: Address): OracleSet {
  let oracleSetEvent = changetype<OracleSet>(newMockEvent())

  oracleSetEvent.parameters = new Array()

  oracleSetEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return oracleSetEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createPayDebtEvent(
  sender: Address,
  asset: Address,
  index: BigInt,
  tokenAmountBorrowed: BigInt,
  totalTokenAmountToCollectFromUser: BigInt,
  amountToRepayInUSD: BigInt
): PayDebt {
  let payDebtEvent = changetype<PayDebt>(newMockEvent())

  payDebtEvent.parameters = new Array()

  payDebtEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromSignedBigInt(index))
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAmountBorrowed",
      ethereum.Value.fromUnsignedBigInt(tokenAmountBorrowed)
    )
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam(
      "totalTokenAmountToCollectFromUser",
      ethereum.Value.fromUnsignedBigInt(totalTokenAmountToCollectFromUser)
    )
  )
  payDebtEvent.parameters.push(
    new ethereum.EventParam(
      "amountToRepayInUSD",
      ethereum.Value.fromUnsignedBigInt(amountToRepayInUSD)
    )
  )

  return payDebtEvent
}

export function createRatesUpdatedEvent(
  token: Address,
  baseRate: BigInt,
  slope1: BigInt,
  slope2: BigInt,
  kink: BigInt
): RatesUpdated {
  let ratesUpdatedEvent = changetype<RatesUpdated>(newMockEvent())

  ratesUpdatedEvent.parameters = new Array()

  ratesUpdatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  ratesUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "baseRate",
      ethereum.Value.fromUnsignedBigInt(baseRate)
    )
  )
  ratesUpdatedEvent.parameters.push(
    new ethereum.EventParam("slope1", ethereum.Value.fromUnsignedBigInt(slope1))
  )
  ratesUpdatedEvent.parameters.push(
    new ethereum.EventParam("slope2", ethereum.Value.fromUnsignedBigInt(slope2))
  )
  ratesUpdatedEvent.parameters.push(
    new ethereum.EventParam("kink", ethereum.Value.fromUnsignedBigInt(kink))
  )

  return ratesUpdatedEvent
}

export function createRepayTesting1Event(
  sender: Address,
  index: BigInt
): RepayTesting1 {
  let repayTesting1Event = changetype<RepayTesting1>(newMockEvent())

  repayTesting1Event.parameters = new Array()

  repayTesting1Event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  repayTesting1Event.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromSignedBigInt(index))
  )

  return repayTesting1Event
}

export function createRepayTesting2Event(
  sender: Address,
  tokenBorrowed: BigInt
): RepayTesting2 {
  let repayTesting2Event = changetype<RepayTesting2>(newMockEvent())

  repayTesting2Event.parameters = new Array()

  repayTesting2Event.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  repayTesting2Event.parameters.push(
    new ethereum.EventParam(
      "tokenBorrowed",
      ethereum.Value.fromUnsignedBigInt(tokenBorrowed)
    )
  )

  return repayTesting2Event
}

export function createSupplyEvent(
  sender: Address,
  asset: Address,
  amount: BigInt,
  amountInUSD: BigInt,
  currentUserTokenLentAmount: BigInt
): Supply {
  let supplyEvent = changetype<Supply>(newMockEvent())

  supplyEvent.parameters = new Array()

  supplyEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam(
      "amountInUSD",
      ethereum.Value.fromUnsignedBigInt(amountInUSD)
    )
  )
  supplyEvent.parameters.push(
    new ethereum.EventParam(
      "currentUserTokenLentAmount",
      ethereum.Value.fromUnsignedBigInt(currentUserTokenLentAmount)
    )
  )

  return supplyEvent
}

export function createTokenForBorrowingAddedEvent(
  name: string,
  tokenAddress: Address,
  LTV: BigInt,
  borrowStableRate: BigInt,
  liquidationThreshold: BigInt
): TokenForBorrowingAdded {
  let tokenForBorrowingAddedEvent = changetype<TokenForBorrowingAdded>(
    newMockEvent()
  )

  tokenForBorrowingAddedEvent.parameters = new Array()

  tokenForBorrowingAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  tokenForBorrowingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenForBorrowingAddedEvent.parameters.push(
    new ethereum.EventParam("LTV", ethereum.Value.fromUnsignedBigInt(LTV))
  )
  tokenForBorrowingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "borrowStableRate",
      ethereum.Value.fromUnsignedBigInt(borrowStableRate)
    )
  )
  tokenForBorrowingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationThreshold",
      ethereum.Value.fromUnsignedBigInt(liquidationThreshold)
    )
  )

  return tokenForBorrowingAddedEvent
}

export function createTokenForLendingAddedEvent(
  name: string,
  tokenAddress: Address,
  LTV: BigInt,
  supplyStableRate: BigInt,
  liquidationThreshold: BigInt
): TokenForLendingAdded {
  let tokenForLendingAddedEvent = changetype<TokenForLendingAdded>(
    newMockEvent()
  )

  tokenForLendingAddedEvent.parameters = new Array()

  tokenForLendingAddedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  tokenForLendingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  tokenForLendingAddedEvent.parameters.push(
    new ethereum.EventParam("LTV", ethereum.Value.fromUnsignedBigInt(LTV))
  )
  tokenForLendingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "supplyStableRate",
      ethereum.Value.fromUnsignedBigInt(supplyStableRate)
    )
  )
  tokenForLendingAddedEvent.parameters.push(
    new ethereum.EventParam(
      "liquidationThreshold",
      ethereum.Value.fromUnsignedBigInt(liquidationThreshold)
    )
  )

  return tokenForLendingAddedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createUtilizationResetEvent(token: Address): UtilizationReset {
  let utilizationResetEvent = changetype<UtilizationReset>(newMockEvent())

  utilizationResetEvent.parameters = new Array()

  utilizationResetEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )

  return utilizationResetEvent
}

export function createWithdrawEvent(
  sender: Address,
  asset: Address,
  amount: BigInt,
  amountInUSD: BigInt,
  totalAmountToWithdraw: BigInt,
  totalInterest: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "amountInUSD",
      ethereum.Value.fromUnsignedBigInt(amountInUSD)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "totalAmountToWithdraw",
      ethereum.Value.fromUnsignedBigInt(totalAmountToWithdraw)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "totalInterest",
      ethereum.Value.fromUnsignedBigInt(totalInterest)
    )
  )

  return withdrawEvent
}

export function createWithdrawTestingEvent(
  sender: Address,
  tokentoWithdrawInDollars: BigInt,
  availableToWithdraw: BigInt
): WithdrawTesting {
  let withdrawTestingEvent = changetype<WithdrawTesting>(newMockEvent())

  withdrawTestingEvent.parameters = new Array()

  withdrawTestingEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  withdrawTestingEvent.parameters.push(
    new ethereum.EventParam(
      "tokentoWithdrawInDollars",
      ethereum.Value.fromUnsignedBigInt(tokentoWithdrawInDollars)
    )
  )
  withdrawTestingEvent.parameters.push(
    new ethereum.EventParam(
      "availableToWithdraw",
      ethereum.Value.fromUnsignedBigInt(availableToWithdraw)
    )
  )

  return withdrawTestingEvent
}
