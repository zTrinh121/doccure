package com.doccure.BE.service;


import com.doccure.BE.response.InvoiceDetailResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.ByteArrayInputStream;
import java.util.List;

public interface InvoiceService {
    List<InvoiceDetailResponse> getAllInvoices(int offset, int limit, HttpServletRequest request, HttpServletResponse response) throws Exception;

    InvoiceDetailResponse getInvoiceById(Long invoiceId, HttpServletRequest request) throws Exception;

    List<InvoiceDetailResponse> searchInvoices(String keyword, int offset, int row, HttpServletRequest request,  HttpServletResponse response) throws Exception;

    ByteArrayInputStream downloadPdfInvoice(Long invoiceId, HttpServletRequest request) throws Exception;

}
