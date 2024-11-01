package com.doccure.BE.mapper;

import com.doccure.BE.model.Invoice;
import com.doccure.BE.model.InvoiceDetail;
import com.doccure.BE.model.InvoiceExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

public interface InvoiceMapper {
    long countByExample(InvoiceExample example);

    int deleteByExample(InvoiceExample example);

    int deleteByPrimaryKey(Long invoiceId);

    int insert(Invoice row);

    int insertSelective(Invoice row);

    List<Invoice> selectByExample(InvoiceExample example);

    Invoice selectByPrimaryKey(Long invoiceId);

    int updateByExampleSelective(@Param("row") Invoice row, @Param("example") InvoiceExample example);

    int updateByExample(@Param("row") Invoice row, @Param("example") InvoiceExample example);

    int updateByPrimaryKeySelective(Invoice row);

    int updateByPrimaryKey(Invoice row);

    List<InvoiceDetail> getInvoiceDetails(Long userId, RowBounds row);
    InvoiceDetail getInvoiceDetailById(@Param("userId") Long userId, @Param("invoiceId") Long invoiceId);
    List<InvoiceDetail> getInvoiceDetailByKeyword (@Param("params") Map<String, Object> params, RowBounds row);
}