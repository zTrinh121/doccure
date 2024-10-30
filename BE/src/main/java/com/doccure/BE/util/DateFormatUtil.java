package com.doccure.BE.util;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@UtilityClass
public class DateFormatUtil {
    public static LocalDate parseStringToDate(String localDateString){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        try {
            return LocalDate.parse(localDateString, formatter);
        } catch (DateTimeParseException e) {
            return null;
        }

    }

}
