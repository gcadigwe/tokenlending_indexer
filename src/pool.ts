import { BigInt } from "@graphprotocol/graph-ts";
import {
  Borrow as BorrowEvent,
  PayDebt as PayDebtEvent,
  Supply as SupplyEvent,
  Withdraw as WithdrawEvent,
} from "../generated/Pool/Pool";
import {
  Borrow,
  DailyBorrowTopPerformers,
  DailySupplyTopPerformers,
  PayDebt,
  Supply,
  Transaction,
  TransactionCount,
  TvlOverview,
  User,
  UserAsset,
  UserLoan,
  UserMonthlyPortfolio,
  Withdraw,
} from "../generated/schema";

const TOKEN_LENDING_CONTRACT = "0x3AF7D19aAeCf142C91FF1A8575A316807a0f611A";

function getMonthYearFromTimestamp(timestamp: number): String {
  const date = new Date(<i64>timestamp);
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  return `${monthNames[monthIndex]}${year}`;
}

function getMonthYearDayFromTimestamp(timestamp: number): String {
  const date = new Date(<i64>timestamp);
  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();
  const day = date.getUTCDate();
  return `${monthNames[monthIndex]}${year}${day}`;
}

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

  const txMonthYearDate = getMonthYearDayFromTimestamp(
    <f64>event.block.timestamp.toI64()
  );

  let dailyBorrow = DailyBorrowTopPerformers.load(
    event.params.asset.toHexString() + txMonthYearDate
  );

  if (!dailyBorrow) {
    dailyBorrow = new DailyBorrowTopPerformers(
      event.params.asset.toHexString() + txMonthYearDate
    );
    dailyBorrow.borrowed = event.params.amountInDollars;
    dailyBorrow.asset = event.params.asset;
  } else {
    dailyBorrow.borrowed = dailyBorrow.borrowed.plus(
      event.params.amountInDollars
    );
  }

  let userAsset = UserAsset.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  if (!userAsset) {
    userAsset = new UserAsset(
      event.params.sender.toHexString().concat(event.params.asset.toHexString())
    );
    userAsset.user = event.params.sender.toHexString();
    userAsset.asset = event.params.asset;
    userAsset.borrowed = event.params.amount;
    userAsset.supplied = BigInt.fromI32(0);
  } else {
    userAsset.borrowed = userAsset.borrowed.plus(event.params.amount);
  }

  let loans = UserLoan.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  if (!loans) {
    loans = new UserLoan(
      event.params.sender.toHexString() + event.params.asset.toHexString()
    );
    loans.asset = event.params.asset;
    loans.borrowed = event.params.currentUserTokenBorrowedAmount;
    loans.repaid = BigInt.fromI32(0);
    loans.user = event.params.sender.toHexString();
  } else {
    loans.borrowed = loans.borrowed.plus(
      event.params.currentUserTokenBorrowedAmount
    );
  }

  let assetTvlOverview = TvlOverview.load(event.params.asset.toHexString());

  if (!assetTvlOverview) {
    assetTvlOverview = new TvlOverview(event.params.asset.toHexString());
    assetTvlOverview.totalBorrowed =
      event.params.currentUserTokenBorrowedAmount;
    assetTvlOverview.totalBorrowedinUSD = event.params.amountInDollars;
    assetTvlOverview.totalSupplied = BigInt.fromI32(0);
    assetTvlOverview.totalSuppliedinUSD = BigInt.fromI32(0);
  } else {
    assetTvlOverview.totalBorrowed = assetTvlOverview.totalBorrowed.plus(
      event.params.currentUserTokenBorrowedAmount
    );
    assetTvlOverview.totalBorrowedinUSD = assetTvlOverview.totalBorrowedinUSD.plus(
      event.params.amountInDollars
    );
  }

  let count = TransactionCount.load("txCount");
  if (!count) {
    count = new TransactionCount("txCount");
    count.updateCount = BigInt.fromI32(1);
  } else {
    count.updateCount = count.updateCount.plus(BigInt.fromI32(1));
  }

  count.save();

  let transaction = new Transaction(count.updateCount.toString());

  transaction.event = "Borrow";
  transaction.block = event.block.number;
  transaction.timeStamp = event.block.timestamp;
  transaction.token = event.params.asset;
  transaction.amount = event.params.amountInDollars;
  transaction.userId = event.params.sender;
  transaction.contract = event.params._event.address;

  transaction.save();

  loans.save();
  userAsset.save();
  assetTvlOverview.save();
  dailyBorrow.save();
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

  let userAsset = UserAsset.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  if (userAsset) {
    userAsset.borrowed = userAsset.borrowed.minus(
      event.params.totalTokenAmountToCollectFromUser
    );

    userAsset.save();
  }

  let loans = UserLoan.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  if (!loans) {
    loans = new UserLoan(
      event.params.sender.toHexString() + event.params.asset.toHexString()
    );

    loans.asset = event.params.asset;
    loans.user = event.params.sender.toHexString();
    loans.borrowed = BigInt.fromI32(0);
    loans.repaid = event.params.totalTokenAmountToCollectFromUser;
  } else {
    loans.repaid = loans.repaid.plus(
      event.params.totalTokenAmountToCollectFromUser
    );
  }

  let assetTvlOverview = TvlOverview.load(event.params.asset.toHexString());

  if (assetTvlOverview) {
    assetTvlOverview.totalBorrowed = assetTvlOverview.totalBorrowed.minus(
      event.params.totalTokenAmountToCollectFromUser
    );
    assetTvlOverview.totalBorrowedinUSD = assetTvlOverview.totalBorrowedinUSD.minus(
      event.params.amountToRepayInUSD
    );

    assetTvlOverview.save();
  }

  let count = TransactionCount.load("txCount");
  if (!count) {
    count = new TransactionCount("txCount");
    count.updateCount = BigInt.fromI32(1);
  } else {
    count.updateCount = count.updateCount.plus(BigInt.fromI32(1));
  }

  count.save();

  let transaction = new Transaction(count.updateCount.toString());

  transaction.event = "Repay";
  transaction.block = event.block.number;
  transaction.timeStamp = event.block.timestamp;
  transaction.token = event.params.asset;
  transaction.amount = event.params.amountToRepayInUSD;
  transaction.userId = event.params.sender;
  transaction.contract = event.params._event.address;

  transaction.save();

  loans.save();
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

  const txMonthYear = getMonthYearFromTimestamp(
    <f64>event.block.timestamp.toI64()
  );
  const txMonthYearDate = getMonthYearDayFromTimestamp(
    <f64>event.block.timestamp.toI64()
  );

  let tvlOverview = TvlOverview.load(event.params.asset.toHexString());

  if (!tvlOverview) {
    tvlOverview = new TvlOverview(event.params.asset.toHexString());

    tvlOverview.totalSupplied = event.params.amount;
    tvlOverview.totalBorrowed = BigInt.fromI32(0);
    tvlOverview.totalSuppliedinUSD = event.params.amountInUSD;
    tvlOverview.totalBorrowedinUSD = BigInt.fromI32(0);
  } else {
    tvlOverview.totalSupplied = tvlOverview.totalSupplied.plus(
      event.params.amount
    );
    tvlOverview.totalSuppliedinUSD = tvlOverview.totalSuppliedinUSD.plus(
      event.params.amountInUSD
    );
  }

  let user = User.load(event.params.sender.toHexString());

  if (!user) {
    user = new User(event.params.sender.toHexString());
    user.id = event.params.sender.toHexString();
    user.save();
  }

  let userAsset = UserAsset.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  if (!userAsset) {
    userAsset = new UserAsset(
      event.params.sender.toHexString() + event.params.asset.toHexString()
    );
    userAsset.user = event.params.sender.toHexString();
    userAsset.asset = event.params.asset;
    userAsset.supplied = event.params.currentUserTokenLentAmount;
    userAsset.borrowed = BigInt.fromI32(0);
  } else {
    userAsset.supplied = userAsset.supplied.plus(
      event.params.currentUserTokenLentAmount
    );
  }

  let monthlyPortfolio = UserMonthlyPortfolio.load(
    event.params.sender.toHexString() + txMonthYear
  );

  if (!monthlyPortfolio) {
    monthlyPortfolio = new UserMonthlyPortfolio(
      event.params.sender.toHexString() + txMonthYear
    );
    monthlyPortfolio.supplied = event.params.amountInUSD;
    monthlyPortfolio.user = event.params.sender.toHexString();
  } else {
    monthlyPortfolio.supplied = monthlyPortfolio.supplied.plus(
      event.params.amountInUSD
    );
  }

  let dailySupply = DailySupplyTopPerformers.load(
    event.params.asset.toHexString() + txMonthYearDate
  );

  if (!dailySupply) {
    dailySupply = new DailySupplyTopPerformers(
      event.params.asset.toHexString() + txMonthYearDate
    );

    dailySupply.supplied = event.params.amountInUSD;
    dailySupply.asset = event.params.asset;
  } else {
    dailySupply.supplied = dailySupply.supplied.plus(event.params.amountInUSD);
  }

  let count = TransactionCount.load("txCount");
  if (!count) {
    count = new TransactionCount("txCount");
    count.updateCount = BigInt.fromI32(1);
  } else {
    count.updateCount = count.updateCount.plus(BigInt.fromI32(1));
  }

  count.save();

  let transaction = new Transaction(count.updateCount.toString());

  transaction.event = "Supply";
  transaction.block = event.block.number;
  transaction.timeStamp = event.block.timestamp;
  transaction.token = event.params.asset;
  transaction.amount = event.params.amountInUSD;
  transaction.userId = event.params.sender;
  transaction.contract = event.params._event.address;

  transaction.save();

  entity.save();
  tvlOverview.save();
  userAsset.save();
  monthlyPortfolio.save();
  dailySupply.save();
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

  const txMonthYear = getMonthYearFromTimestamp(
    <f64>event.block.timestamp.toI64()
  );

  let monthlyPortfolio = UserMonthlyPortfolio.load(
    event.params.sender.toHexString() + txMonthYear
  );

  let userAsset = UserAsset.load(
    event.params.sender.toHexString() + event.params.asset.toHexString()
  );

  let tvlOverview = TvlOverview.load(event.params.asset.toHexString());

  if (tvlOverview) {
    tvlOverview.totalSupplied = tvlOverview.totalSupplied.minus(
      event.params.amount
    );

    tvlOverview.totalSuppliedinUSD = tvlOverview.totalSuppliedinUSD.minus(
      event.params.amountInUSD
    );

    tvlOverview.save();
  }

  if (userAsset) {
    userAsset.supplied = userAsset.supplied.minus(event.params.amount);
    userAsset.save();
  }

  if (monthlyPortfolio) {
    monthlyPortfolio.supplied = monthlyPortfolio.supplied.minus(
      event.params.amountInUSD
    );
    monthlyPortfolio.save();
  }

  let count = TransactionCount.load("txCount");
  if (!count) {
    count = new TransactionCount("txCount");
    count.updateCount = BigInt.fromI32(1);
  } else {
    count.updateCount = count.updateCount.plus(BigInt.fromI32(1));
  }

  count.save();

  let transaction = new Transaction(count.updateCount.toString());

  transaction.event = "Withdraw";
  transaction.block = event.block.number;
  transaction.timeStamp = event.block.timestamp;
  transaction.token = event.params.asset;
  transaction.amount = event.params.amountInUSD;
  transaction.userId = event.params.sender;
  transaction.contract = event.params._event.address;

  transaction.save();
  entity.save();
}
