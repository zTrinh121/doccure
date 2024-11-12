import { Space, Table, Tag, Button, Pagination } from 'antd';
const { Column, ColumnGroup } = Table;

import { useInvoicesQuery } from '../../../hooks/useInvoicesQuery';
import { PrinterOutlined } from '@ant-design/icons';
import { getDownloadInvoice } from '../../../lib/invoice';
import { useState } from 'react';
import { useEffect } from 'react';
import { downloadBlob } from './../../../utils/utils';

const InvoicesTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 100,
  });

  const { data, error, isFetching } = useInvoicesQuery({
    offset: (pagination.page - 1) * pagination.pageSize,
    limit: pagination.pageSize,
  });
  const responseData = data.data.data;

  useEffect(() => {
    if (data?.data.total) {
      //!no watching for empty data
      setPagination((prevPagination) => ({
        ...prevPagination,
        total: data?.data.total,
      }));
    }
  }, [data?.data.total]);

  const onClickPrinter = async (invoiceId) => {
    const response = await getDownloadInvoice(invoiceId);
    return downloadBlob(response, invoiceId);
  };

  const onChangeTable = (pagination) => {
    setPagination((p) => ({
      ...p,
      page: pagination.current,
      pageSize: pagination.pageSize,
    }));
  };

  return (
    <div>
      <div>
        <Table
          onChange={onChangeTable}
          dataSource={responseData}
          pagination={{
            total: pagination.total,
            current: pagination.page,
            pageSize: pagination.pageSize,
          }}
        >
          <Column
            title="Id"
            dataIndex="invoice_id"
            key="id"
            render={(invoice_id) => (
              <>
                <a>{invoice_id}</a>
              </>
            )}
          />
          <Column
            title="Dr."
            dataIndex="doctor"
            key="dr"
            render={(doctor) => <>{doctor.full_name}</>}
          />
          <Column
            title="Appointment Date"
            dataIndex="slot"
            key="slot"
            render={(slot) => <>{slot.date_slot}</>}
          />
          <Column
            title="Price"
            dataIndex="slot"
            key="price"
            render={(slot) => <>{slot.price}</>}
          />
          <Column
            title="Actions"
            dataIndex="invoice_id"
            key="actions"
            render={(invoiceId) => (
              <>
                <Button
                  onClick={() => {
                    onClickPrinter(invoiceId);
                  }}
                  shape="circle"
                  icon={<PrinterOutlined />}
                />
              </>
            )}
          />
        </Table>
      </div>
      {data?.data.data.map((invoice) => (
        <div key={JSON.stringify(invoice)}>
          {JSON.stringify(invoice)} ------------------------------------------
        </div>
      ))}
    </div>
  );
};

export default InvoicesTable;
