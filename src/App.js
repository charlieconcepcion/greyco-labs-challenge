import React, { useEffect, useState } from 'react';

const LoanTable = () => {
  const [loans, setLoans] = useState([]);
  const [htmlData, setHtmlData] = useState([]);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await fetch('https://lending-api.azurewebsites.net/loans/6?user_id=1');
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchLoanSummary = async () => {
      try {
        const response = await fetch('https://lending-api.azurewebsites.net/loans/6/month/1?user_id=1');
        const data = await response.json();
        setHtmlData(data);
      } catch (error) {
        console.error('Error fetching HTML data:', error);
      }
    };

    fetchLoanData();
    fetchLoanSummary();
  }, []);

  const addCommas = (number) => {
    if (number === null || number === undefined) {
      return '';
    }

    const trimmedNumber = Number(number).toFixed(2);
    return trimmedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div>
      <header>
        <a href="https://www.greystone.com/" className="logo">
          <img alt="Greystone" src="https://www.greystone.com/wp-content/themes/greystone/assets/images/logo_grey.svg" />
        </a>
      </header>

      <div className="container">

        <div className="amortization_header">
          <h1>Amortization Calculator</h1>
          <p>Calculate your home mortgage debt and display your payment breakdown of interest paid, principal paid and loan balance over the life of the loan.</p>
        </div>

        <div className="amort_group">

          <div className="amortization_calc_form">

            <ul>
              <li>
                <label>
                  <span>Loan amount</span>
                  <span className="loan_amount_input"><input type="number" placeholder="200,000" inputmode="decimal" /></span>
                </label>
              </li>
              <li>
                <label>
                  <span>Loan term</span>
                  <select name="loan_term" id="loan_term">
                    <option value="volvo">30 year fixed</option>
                    <option value="volvo">15 year fixed</option>
                    <option value="volvo">5-year ARM</option>
                  </select>
                </label>
              </li>
              <li>
                <label>
                  <span>Interest rate</span>
                  <span className="interest_rate_input"><input type="text" value="5.848" /></span>
                </label>
              </li>
            </ul>

            <button className="calc_payment_btn">Calculate</button>


          </div>

          <div className="amortization_summary">
            <div className="summ_head">
              <h2>Estimated monthly payment</h2>
              <span>$XXX</span>
            </div>

            <div className="summ_field">
              <span>Aggregate Principal Paid</span>
              <span>{addCommas(htmlData.aggregate_principal_paid)}</span>
            </div>

            <div className="summ_field">
              <span>Aggregate Interest Paid</span>
              <span>{addCommas(htmlData.aggregate_interest_paid)}</span>
            </div>

            <div className="summ_field">
              <span>Current Principal</span>
              <span>{addCommas(htmlData.current_principal)}</span>
            </div>
          </div>

        </div>



        <div className="amortization_table">

          <div className="amortization_breakdown_header">
            <h2>Amortization schedule breakdown</h2>
            <p>This table lists how much principal and interest are paid in each scheduled mortgage payment.</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Close Balance</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.month}</td>
                  <td>{addCommas(loan.interest_payment)}</td>
                  <td>{addCommas(loan.principal_payment)}</td>
                  <td>{addCommas(loan.close_balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

export default LoanTable;
