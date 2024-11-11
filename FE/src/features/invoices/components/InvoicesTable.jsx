import { Space, Table, Tag, Button, Pagination } from 'antd';
const { Column, ColumnGroup } = Table;

import { useInvoicesQuery } from '../../../hooks/useInvoicesQuery';
import { PrinterOutlined } from '@ant-design/icons';
import { getDownloadInvoice } from '../../../lib/invoice';
import { useState } from 'react';
import { useEffect } from 'react';

const InvoicesTable = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 100,
  });

  const { data, error, isFetching } = useInvoicesQuery({
    offset: pagination.page - 1,
    limit: pagination.pageSize,
  });
  console.log(data);
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
    return getDownloadInvoice(invoiceId);
  };

  const onChangeTable = (pagination) => {
    console.log(pagination);
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
          {/* 
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => {
                  let color = tag.length > 5 ? 'geekblue' : 'green';
                  if (tag === 'loser') {
                    color = 'volcano';
                  }
                  return (
                    <Tag color={color} key={tag}>
                      {tag.toUpperCase()}
                    </Tag>
                  );
                })}
              </>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <a>Invite {record.lastName}</a>
                <a>Delete</a>
              </Space>
            )}
          /> */}
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
