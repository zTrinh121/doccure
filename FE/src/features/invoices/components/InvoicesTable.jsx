import { Space, Table, Tag, Button } from 'antd';
const { Column, ColumnGroup } = Table;

import { useInvoicesQuery } from '../../../hooks/useInvoicesQuery';
import { PrinterOutlined } from '@ant-design/icons';
import { getDownloadInvoice } from '../../../lib/invoice';

const InvoicesTable = () => {
  const { data, error, isFetching } = useInvoicesQuery({
    offset: 0,
    limit: 10,
  });
  console.log(data);
  const responseData = data.data.data;

  const onClickPrinter=async(invoiceId)=>{
return getDownloadInvoice(invoiceId)
  }

  return (
    <div>
      <div>
        <Table dataSource={responseData}>
          <Column title="Id" dataIndex="invoice_id" key="id" render={(invoice_id) => (
              <>
                <a>{invoice_id}</a>
              </>
            )}/>
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
                  onClick={()=>{onClickPrinter(invoiceId)}}
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
