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

  const { data } = useInvoicesQuery({
    offset: (pagination.page - 1) * pagination.pageSize,
    limit: pagination.pageSize,
  });
  const responseData = data?.data?.data || [];

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
              <p>Invoice ID No: {selectedInvoice?.invoice_id}</p>
              <p>
                Issued:{' '}
                {new Date(selectedInvoice?.created_at).toLocaleString('en-AU')}
              </p>
            </div>
          </div>
          <p>Invoice Details</p>
          <table className="w-full border-collapse border border-slate-500">
            <thead>
              <tr>
                <th className="border border-slate-600 px-4 py-2">
                  Description
                </th>
                <th className="border border-slate-600 px-4 py-2">Quantity</th>
                <th className="border border-slate-600 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-600 px-4 py-2">
                  {selectedInvoice?.invoice_name}
                </td>
                <td className="border border-slate-600 px-4 py-2">1</td>
                <td className="border border-slate-600 px-4 py-2">
                  {selectedInvoice?.slot.price}
                </td>
              </tr>
            </tbody>
          </table>
          <p>Total amount: {selectedInvoice?.slot.price}</p>
        </Card>
      </Modal>
      <div className="overflow-visible ">
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
