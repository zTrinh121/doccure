package com.doccure.BE.exception;

public class DataIntegrityViolationException extends Exception {
    public DataIntegrityViolationException(String message){
        super(message);
    }

    public DataIntegrityViolationException(String message, Throwable throwable){
        super(message, throwable);
    }
}
