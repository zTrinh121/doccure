package com.doccure.BE.controller;

import com.doccure.BE.response.ResponseHandler;
import com.doccure.BE.service.InvoiceService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("${apiPrefix}/invoice")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;

    @GetMapping("/all")
    public ResponseEntity<Object> getAllInvoices(HttpServletRequest request,
                                                 @RequestParam("offset") int offset,
                                                 @RequestParam("limit") int limit ) throws Exception {
        return ResponseHandler.responseBuilder("List invoices in detail",
                HttpStatus.OK,
                invoiceService.getAllInvoices(offset, limit, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getInvoiceByID(HttpServletRequest request,
                                                 @PathVariable("id") Long invoiceId) throws Exception {
        return ResponseHandler.responseBuilder("Invoice in detail with ID = " + invoiceId,
                HttpStatus.OK,
                invoiceService.getInvoiceById(invoiceId, request));
    }

    @GetMapping("/search")
    public ResponseEntity<Object> getInvoiceByID(HttpServletRequest request,
                                                 @RequestParam("offset") int offset,
                                                 @RequestParam("limit") int limit,
                                                 @RequestParam("keyword") String keyword) throws Exception {
        return ResponseHandler.responseBuilder("List invoices in detail with keyword = " + keyword,
                HttpStatus.OK,
                invoiceService.searchInvoices(keyword, offset, limit, request));
    }

    @GetMapping(value = "/pdf/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> invoicePdf(@PathVariable("id") Long invoiceId,
                                                          HttpServletRequest request) throws Exception {


        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(invoiceService.downloadPdfInvoice(invoiceId, request)));
    }
}
