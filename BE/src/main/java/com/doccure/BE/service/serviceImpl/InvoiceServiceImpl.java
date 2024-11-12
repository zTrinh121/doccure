package com.doccure.BE.service.serviceImpl;

import com.doccure.BE.exception.DataNotFoundException;
import com.doccure.BE.mapper.InvoiceMapper;
import com.doccure.BE.mapper.TokenMapper;
import com.doccure.BE.mapper.UsersMapper;
import com.doccure.BE.model.InvoiceDetail;
import com.doccure.BE.model.Token;
import com.doccure.BE.model.Users;
import com.doccure.BE.response.InvoiceDetailResponse;
import com.doccure.BE.service.InvoiceService;
import com.doccure.BE.util.PdfUtil;
import com.doccure.BE.util.TokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {
    private final InvoiceMapper invoiceMapper;
    private final TokenMapper tokenMapper;
    private final UsersMapper usersMapper;
    @Override
    public List<InvoiceDetailResponse> getAllInvoices(int offset, int limit, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);

        List<InvoiceDetail> invoiceDetails = invoiceMapper.getInvoiceDetails(accessTokenUser.getUserId(),
                                                                                new RowBounds(offset, limit));

        if(invoiceDetails.isEmpty()) throw new DataNotFoundException("Not found any invoices");
        response.setHeader("X-Total-Count", String.valueOf(invoiceMapper.getInvoiceDetails(accessTokenUser.getUserId()).size()));
        return invoiceDetails.stream()
                .map(InvoiceDetailResponse::fromInvoiceDetail)
                .toList();
    }

    @Override
    public InvoiceDetailResponse getInvoiceById(Long invoiceId, HttpServletRequest request) throws Exception {
        return InvoiceDetailResponse.fromInvoiceDetail(getInvoiceDetailById(invoiceId, request));
    }

    @Override
    public List<InvoiceDetailResponse> searchInvoices(String keyword, 
                                                    int offset,
                                                      int row, 
                                                      HttpServletRequest request,
                                                      HttpServletResponse response) throws Exception{
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("userId", accessTokenUser.getUserId());
        params.put("keyword", keyword);
        List<InvoiceDetail> invoiceDetails = invoiceMapper.getInvoiceDetailByKeyword(params, new RowBounds(offset, row));
        if(invoiceDetails.isEmpty()) throw new DataNotFoundException("Not found any invoices with keyword = " + keyword);
        response.setHeader("X-Total-Count", String.valueOf(invoiceMapper.getInvoiceDetailByKeyword(params).size()));
        return invoiceDetails.stream()
                .map(InvoiceDetailResponse::fromInvoiceDetail)
                .toList();
    }

    @Override
    public ByteArrayInputStream downloadPdfInvoice(Long invoiceId, HttpServletRequest request) throws Exception {
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        Users user = usersMapper.findUserById(accessTokenUser.getUserId());
        InvoiceDetail invoiceDetail = invoiceMapper.getInvoiceDetailById(accessTokenUser.getUserId(), invoiceId);
        if(invoiceDetail == null) throw new DataNotFoundException("Not found invoice with ID = " + invoiceId);

        ByteArrayInputStream bis = PdfUtil.invoicePDFReport(invoiceDetail, user);
        return bis;
    }

    public InvoiceDetail getInvoiceDetailById(Long invoiceId, HttpServletRequest request) throws Exception{
        String token = TokenUtil.checkToken(request);
        Token accessTokenUser = tokenMapper.findByAccessToken(token);
        InvoiceDetail invoiceDetail = invoiceMapper.getInvoiceDetailById(accessTokenUser.getUserId(), invoiceId);
        if(invoiceDetail == null) throw new DataNotFoundException("Not found invoice with ID = " + invoiceId);
        return invoiceDetail;
    }


}
