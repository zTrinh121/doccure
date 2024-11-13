import { Table, Button, Modal, Card, Divider } from 'antd';
const { Column } = Table;
import { PrinterOutlined } from '@ant-design/icons';
import doccure from '../../../assets/doccure.png';

import { useInvoicesQuery } from '../../../hooks/useInvoicesQuery';
import { getDownloadInvoice } from '../../../lib/invoice';
import { useState } from 'react';
import { useEffect } from 'react';
import { downloadBlob } from './../../../utils/utils';

const InvoicesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
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

  const onClickId = (record) => {
    setSelectedInvoice(record);
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <Modal
          onCancel={onCancel}
          maskClosable
          title="View Invoice"
          open={isModalOpen}
          // onOk={handleOk}
          // onCancel={handleCancel}
        >
          <Divider></Divider>
          <Card>
            <div className="flex flex-col sm:flex-row justify-between w-1/2 sm:w-auto">
              <img src={doccure} />
              <div className="flex flex-col items-start sm:items-end">
                <p>Invoice ID No: {selectedInvoice.invoice_id}</p>
                <p>Issued: {selectedInvoice.created_at}</p>
              </div>
            </div>
            <p>{JSON.stringify(selectedInvoice)}</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Card>
        </Modal>

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
            render={(invoice_id, record) => (
              <>
                <a onClick={() => onClickId(record)}>{invoice_id}</a>
              </>
            )}
          />
          <Column title="Status" dataIndex="status" key="status" />
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
    </div>
  );
};

export default InvoicesTable;
