import axios from "axios";
import { transactionParser } from "./parser";
const transactions = [
  { customer: "John", month: "January", amount: 150 },
  { customer: "John", month: "February", amount: 80 },
  { customer: "John", month: "March", amount: 120 },
  { customer: "Sarah", month: "January", amount: 75 },
  { customer: "Sarah", month: "February", amount: 200 },
  { customer: "Sarah", month: "March", amount: 90 },
];

export const getTransactionsDetails = () => {
  return axios
    .get(
      "https://gist.githubusercontent.com/iamvishalkhare/700098329821ee0724edc170c76549f9/raw/603d3a717317cee22d6cad4ba1a5b74353bceacf/transactions.json"
    )
    .then((res) => {
      return transactionParser(res?.data?.transactions);
    });
};
