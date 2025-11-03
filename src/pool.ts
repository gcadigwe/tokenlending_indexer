import {
  Borrow as BorrowEvent,
  PayDebt as PayDebtEvent,
  Supply as SupplyEvent,
  Withdraw as WithdrawEvent,
} from "../generated/Pool/Pool";
import { Borrow, PayDebt, Supply, Withdraw } from "../generated/schema";

export function handleBorrow(event: BorrowEvent): void {
  let entity = new Borrow(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.asset = event.params.asset;
  entity.amount = event.params.amount;
  entity.amountInDollars = event.params.amountInDollars;
  entity.totalAmountAvailableForBorrowInDollars =
    event.params.totalAmountAvailableForBorrowInDollars;
  entity.userPresent = event.params.userPresent;
  entity.userIndex = event.params.userIndex;
  entity.currentUserTokenBorrowedAmount =
    event.params.currentUserTokenBorrowedAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handlePayDebt(event: PayDebtEvent): void {
  let entity = new PayDebt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.asset = event.params.asset;
  entity.index = event.params.index;
  entity.tokenAmountBorrowed = event.params.tokenAmountBorrowed;
  entity.totalTokenAmountToCollectFromUser =
    event.params.totalTokenAmountToCollectFromUser;
  entity.amountToRepayInUSD = event.params.amountToRepayInUSD;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSupply(event: SupplyEvent): void {
  let entity = new Supply(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.asset = event.params.asset;
  entity.amount = event.params.amount;
  entity.amountInUSD = event.params.amountInUSD;
  entity.currentUserTokenLentAmount = event.params.currentUserTokenLentAmount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.sender = event.params.sender;
  entity.asset = event.params.asset;
  entity.amount = event.params.amount;
  entity.amountInUSD = event.params.amountInUSD;
  entity.totalAmountToWithdraw = event.params.totalAmountToWithdraw;
  entity.totalInterest = event.params.totalInterest;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
