import { useInvoicesQuery } from '../../../hooks/useInvoicesQuery';

const InvoicesList = () => {
  const { data, error, isFetching } = useInvoicesQuery({
    offset: 0,
    limit: 10,
  });
  console.log(data);
  return (
    <div>
      {data?.data.data.map((invoice) => (
        <div key={JSON.stringify(invoice)}>
          {JSON.stringify(invoice)} ------------------------------------------
        </div>
      ))}
    </div>
  );
};

export default InvoicesList;
