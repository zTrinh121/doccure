package com.doccure.BE.service;


import com.doccure.BE.response.InvoiceDetailResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface InvoiceService {
    List<InvoiceDetailResponse> getAllInvoices(int offset, int limit, HttpServletRequest request) throws Exception;

    InvoiceDetailResponse getInvoiceById(Long invoiceId, HttpServletRequest request) throws Exception;

    List<InvoiceDetailResponse> searchInvoices(String keyword, int offset, int row, HttpServletRequest request) throws Exception;

}
