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
                                                 @RequestParam("limit") int limit ) {
        try {
            return ResponseHandler.responseBuilder("List invoices in detail",
                    HttpStatus.OK,
                    invoiceService.getAllInvoices(offset, limit, request));
        } catch (Exception e) {
            return ResponseHandler.responseBuilder("There some error happens with getting all invoices " ,
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getInvoiceByID(HttpServletRequest request,
                                                 @PathVariable("id") Long invoiceId){
        try {
            return ResponseHandler.responseBuilder("Invoice in detail with ID = " + invoiceId,
                    HttpStatus.OK,
                    invoiceService.getInvoiceById(invoiceId, request));
        } catch (Exception e) {
            return ResponseHandler.responseBuilder("There some error happens with getting invoice " ,
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Object> getInvoiceByID(HttpServletRequest request,
                                                 @RequestParam("offset") int offset,
                                                 @RequestParam("limit") int limit,
                                                 @RequestParam("keyword") String keyword) {
        try {
            return ResponseHandler.responseBuilder("List invoices in detail with keyword = " + keyword,
                    HttpStatus.OK,
                    invoiceService.searchInvoices(keyword, offset, limit, request));
        } catch (Exception e) {
            return ResponseHandler.responseBuilder("There some error happens with keyword = " + keyword,
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
    }

    @GetMapping(value = "/pdf/{id}", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<Object> invoicePdf(@PathVariable("id") Long invoiceId,
                                                          HttpServletRequest request){


        try {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF)
                    .body(new InputStreamResource(invoiceService.downloadPdfInvoice(invoiceId, request)));
        } catch (Exception e) {
            return ResponseHandler.responseBuilder("There some error happens with downloading invoice",
                    HttpStatus.BAD_REQUEST,
                    e.getMessage());
        }
    }
}
