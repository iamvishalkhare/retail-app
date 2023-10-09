export const transactionParser = (transactions) => {
  if (!transactions || !transactions?.length) return [];
  const monthMap = {
    jan: false,
    feb: false,
    mar: false,
    apr: false,
    may: false,
    jun: false,
    jul: false,
    aug: false,
    sep: false,
    oct: false,
    nov: false,
    dec: false,
  };
  const rewards = {};
  for (const transaction of transactions) {
    const { customer, month, amount } = transaction;
    const pointsOver100 = Math.max(amount - 100, 0) * 2;
    let pointsOver50 = 0;
    if (amount >= 100) {
      pointsOver50 = 50;
    } else pointsOver50 = Math.max(amount - 50, 0);
    const totalPoints = pointsOver100 + pointsOver50;
    if (!rewards[customer]) {
      rewards[customer] = {};
    }
    if (!rewards[customer][month]) {
      rewards[customer][month] = 0;
    }
    rewards[customer][month] += totalPoints;
    if (!rewards[customer]["total"]) {
      rewards[customer]["total"] = 0;
    }
    rewards[customer]["total"] += totalPoints;
    if (!monthMap[month]) monthMap[month] = true;
  }
  const transactionDetails = Object.keys(rewards).map((customer) => ({
    ...rewards[customer],
    name: customer,
  }));
  return {
    transactionDetails,
    months: Object.keys(monthMap).filter((month) => monthMap[month]),
  };
};
