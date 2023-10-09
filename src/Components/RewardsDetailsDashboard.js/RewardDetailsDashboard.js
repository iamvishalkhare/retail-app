import React, { useEffect, useState } from "react";
import "./RewardsDetailsDashBoard.css";
import { getTransactionsDetails } from "../../action";
import { monthObj } from "../../constants";

const RewardsDetailsDashBoard = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getTransactionsDetails().then((res) => {
      const { months: monthsData, transactionDetails } = res || {};
      setTransactionData(transactionDetails);
      setMonths(monthsData);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          {!transactionData && !transactionData?.length && (
            <p>No TransactionData</p>
          )}
          {transactionData && transactionData?.length && (
            <div>
              <table>
                <tr>
                  <th>Name</th>
                  {months.map((month) => (
                    <th key={month}>{monthObj[month]}</th>
                  ))}
                  <th>Total Points</th>
                </tr>
                {transactionData.map((transaction) => {
                  return (
                    <tr key={transaction.name}>
                      <td>{transaction.name}</td>
                      {(months || []).map((month) => {
                        return <td>{transaction[month] || 0}</td>;
                      })}
                      <td>{transaction.total}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RewardsDetailsDashBoard;
