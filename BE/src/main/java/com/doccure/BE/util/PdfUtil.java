package com.doccure.BE.util;

import com.doccure.BE.model.*;
import com.lowagie.text.*;
import lombok.experimental.UtilityClass;

import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.stream.Stream;

@UtilityClass
public class PdfUtil {
    public static ByteArrayInputStream invoicePDFReport(InvoiceDetail invoice, Users user) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Font fontHeader = FontFactory.getFont("Arial Unicode MS", 22, Font.BOLD);
            Font fontSubHeader = FontFactory.getFont("Arial Unicode MS", 12, Font.NORMAL);
            Font fontTableHeader = FontFactory.getFont("Arial Unicode MS", 10, Font.BOLD);
            Font fontTableContent = FontFactory.getFont("Arial Unicode MS", 10, Font.NORMAL);

            PdfWriter.getInstance(document, out);
            document.open();

            Paragraph title = new Paragraph("Hóa đơn", fontHeader);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable infoTable = new PdfPTable(3);
            infoTable.setWidthPercentage(100);
            infoTable.setWidths(new int[]{2, 2, 2});

            PdfPCell fromCell = new PdfPCell(new Phrase(getBillingFromInfo(user), fontSubHeader));
            fromCell.setBorder(Rectangle.NO_BORDER);
            infoTable.addCell(fromCell);

            PdfPCell toCell = new PdfPCell(new Phrase(getBillingToInfo(invoice.getDoctor(), invoice.getSpecialization()), fontSubHeader));
            toCell.setBorder(Rectangle.NO_BORDER);
            infoTable.addCell(toCell);

            PdfPCell slotCell = new PdfPCell(new Phrase(getBillingSlot(invoice.getSlot()), fontSubHeader));
            slotCell.setBorder(Rectangle.NO_BORDER);
            infoTable.addCell(slotCell);

            document.add(infoTable);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{1, 5, 1, 2});

            // Add PDF Table Header ->
            Stream.of("ID", "Dịch vụ/sản phẩm", "Số lượng", "Giá").forEach(headerTitle -> {
                PdfPCell header = new PdfPCell();
                header.setBackgroundColor(new Color(13, 110, 253));
                header.setHorizontalAlignment(Element.ALIGN_CENTER);
                header.setPhrase(new Phrase(headerTitle, fontTableHeader));
                table.addCell(header);
            });
            for(InvoiceItem invoiceItem : invoice.getInvoiceItems()){
                PdfPCell idCell = new PdfPCell(new Phrase(invoiceItem.getInvoiceId().toString(), fontTableContent));
                idCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell);

                PdfPCell itemNameCell = new PdfPCell(new Phrase(invoiceItem.getItemName(), fontTableContent));
                itemNameCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(itemNameCell);

                PdfPCell quantityCell = new PdfPCell(new Phrase(invoiceItem.getQuantity().toString(), fontTableContent));
                quantityCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(quantityCell);

                PdfPCell priceCell = new PdfPCell(new Phrase(invoiceItem.getPrice().toString(), fontTableContent));
                priceCell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(priceCell);
            }
            document.add(table);
            document.add(Chunk.NEWLINE);

            PdfPTable summaryTable = new PdfPTable(2);
            summaryTable.addCell(getSummaryCell("Tổng:", fontTableHeader));
            summaryTable.addCell(getSummaryCell(invoice.getAppointment().getPrice().toString(), fontTableHeader));

            document.add(summaryTable);

            document.close();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

    private static PdfPCell getSummaryCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        cell.setBorder(Rectangle.NO_BORDER);
        return cell;
    }

    private String getBillingFromInfo(Users user){
        return "Người gửi: " + user.getFirstName() + " " + user.getLastName() +
                "\nEmail: "+ user.getEmail() + "\nĐịa chỉ: " + user.getCity();
    }

    private String getBillingToInfo(Doctor doctor, Specialization specialization){
        return "Người nhận: \n" + doctor.getFirstName() + " " + doctor.getLastName() +
                "\nBệnh viện: "  + doctor.getHospital() +
                "\nChuyên khoa: " + specialization.getSpecializationName();
    }

    private String getBillingSlot(SlotAppointment slot){
        return "Ngày: " + slot.getDateSlot() +
                "\nThời gian: " + slot.getStartTime() + " đến " + slot.getEndTime();
    }
}
