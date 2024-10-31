package com.doccure.BE.util;

import com.doccure.BE.exception.DataNotFoundException;
import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@UtilityClass
public class DateFormatUtil {
    public static LocalDate parseStringToDate(String localDateString) throws Exception {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try {
            return LocalDate.parse(localDateString, formatter);
        } catch (DateTimeParseException e) {
            throw  new DataNotFoundException("Invalid date format. Please use yyyy-MM-dd.");
        }

    }

}
