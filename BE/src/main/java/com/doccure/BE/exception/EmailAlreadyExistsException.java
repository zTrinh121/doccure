package com.doccure.BE.exception;

public class EmailAlreadyExistsException extends Exception{
    public EmailAlreadyExistsException(String message){
        super(message);
    }

    public EmailAlreadyExistsException(String message, Throwable throwable){
        super(message, throwable);
    }
}
