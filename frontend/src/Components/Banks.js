import { useSelector } from 'react-redux';

const Banks = () => {

  const emiAmount = useSelector((state) => state.emi.emiAmount);
  const amountPayable = useSelector((state) => state.loanDetails.amountPayable);
  return (
    <div>
      <h2>Banks Component</h2>
      <p>{emiAmount}</p>
      <p>amountPayable: {amountPayable - emiAmount}</p>
    </div>
  );
};

export default Banks;
