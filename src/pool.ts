import {
  AdminUpdated as AdminUpdatedEvent,
  Borrow as BorrowEvent,
  BorrowTesting1 as BorrowTesting1Event,
  BorrowTesting2 as BorrowTesting2Event,
  DaoUpdated as DaoUpdatedEvent,
  FeeParamsUpdated as FeeParamsUpdatedEvent,
  Initialized as InitializedEvent,
  Liquidation as LiquidationEvent,
  OracleSet as OracleSetEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  PayDebt as PayDebtEvent,
  RatesUpdated as RatesUpdatedEvent,
  RepayTesting1 as RepayTesting1Event,
  RepayTesting2 as RepayTesting2Event,
  Supply as SupplyEvent,
  TokenForBorrowingAdded as TokenForBorrowingAddedEvent,
  TokenForLendingAdded as TokenForLendingAddedEvent,
  Unpaused as UnpausedEvent,
  Upgraded as UpgradedEvent,
  UtilizationReset as UtilizationResetEvent,
  Withdraw as WithdrawEvent,
  WithdrawTesting as WithdrawTestingEvent
} from "../generated/Pool/Pool"
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
} from "../generated/schema"

export function handleAdminUpdated(event: AdminUpdatedEvent): void {
  let entity = new AdminUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBorrow(event: BorrowEvent): void {
  let entity = new Borrow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.asset = event.params.asset
  entity.amount = event.params.amount
  entity.amountInDollars = event.params.amountInDollars
  entity.totalAmountAvailableForBorrowInDollars =
    event.params.totalAmountAvailableForBorrowInDollars
  entity.userPresent = event.params.userPresent
  entity.userIndex = event.params.userIndex
  entity.currentUserTokenBorrowedAmount =
    event.params.currentUserTokenBorrowedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBorrowTesting1(event: BorrowTesting1Event): void {
  let entity = new BorrowTesting1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amountInDollars = event.params.amountInDollars
  entity.totalAmountAvailableForBorrowInDollars =
    event.params.totalAmountAvailableForBorrowInDollars

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBorrowTesting2(event: BorrowTesting2Event): void {
  let entity = new BorrowTesting2(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.balance = event.params.balance
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDaoUpdated(event: DaoUpdatedEvent): void {
  let entity = new DaoUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dao = event.params.dao

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeParamsUpdated(event: FeeParamsUpdatedEvent): void {
  let entity = new FeeParamsUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.feeWallet = event.params.feeWallet
  entity.fee = event.params.fee
  entity.liquidationPenalty = event.params.liquidationPenalty

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidation(event: LiquidationEvent): void {
  let entity = new Liquidation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.liquidator = event.params.liquidator
  entity.borrower = event.params.borrower
  entity.tokenRepaid = event.params.tokenRepaid
  entity.repayAmount = event.params.repayAmount
  entity.collateralToken = event.params.collateralToken
  entity.collateralSeizedAmount = event.params.collateralSeizedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOracleSet(event: OracleSetEvent): void {
  let entity = new OracleSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oracle = event.params.oracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayDebt(event: PayDebtEvent): void {
  let entity = new PayDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.asset = event.params.asset
  entity.index = event.params.index
  entity.tokenAmountBorrowed = event.params.tokenAmountBorrowed
  entity.totalTokenAmountToCollectFromUser =
    event.params.totalTokenAmountToCollectFromUser
  entity.amountToRepayInUSD = event.params.amountToRepayInUSD

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRatesUpdated(event: RatesUpdatedEvent): void {
  let entity = new RatesUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token
  entity.baseRate = event.params.baseRate
  entity.slope1 = event.params.slope1
  entity.slope2 = event.params.slope2
  entity.kink = event.params.kink

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepayTesting1(event: RepayTesting1Event): void {
  let entity = new RepayTesting1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.index = event.params.index

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepayTesting2(event: RepayTesting2Event): void {
  let entity = new RepayTesting2(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.tokenBorrowed = event.params.tokenBorrowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSupply(event: SupplyEvent): void {
  let entity = new Supply(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.asset = event.params.asset
  entity.amount = event.params.amount
  entity.amountInUSD = event.params.amountInUSD
  entity.currentUserTokenLentAmount = event.params.currentUserTokenLentAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenForBorrowingAdded(
  event: TokenForBorrowingAddedEvent
): void {
  let entity = new TokenForBorrowingAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.tokenAddress = event.params.tokenAddress
  entity.LTV = event.params.LTV
  entity.borrowStableRate = event.params.borrowStableRate
  entity.liquidationThreshold = event.params.liquidationThreshold

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenForLendingAdded(
  event: TokenForLendingAddedEvent
): void {
  let entity = new TokenForLendingAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.tokenAddress = event.params.tokenAddress
  entity.LTV = event.params.LTV
  entity.supplyStableRate = event.params.supplyStableRate
  entity.liquidationThreshold = event.params.liquidationThreshold

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUtilizationReset(event: UtilizationResetEvent): void {
  let entity = new UtilizationReset(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.asset = event.params.asset
  entity.amount = event.params.amount
  entity.amountInUSD = event.params.amountInUSD
  entity.totalAmountToWithdraw = event.params.totalAmountToWithdraw
  entity.totalInterest = event.params.totalInterest

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawTesting(event: WithdrawTestingEvent): void {
  let entity = new WithdrawTesting(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.tokentoWithdrawInDollars = event.params.tokentoWithdrawInDollars
  entity.availableToWithdraw = event.params.availableToWithdraw

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
