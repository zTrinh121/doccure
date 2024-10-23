package com.doccure.BE.exception;

public class OTPExpiredException extends Exception{
    public OTPExpiredException(String message){
        super(message);
    }

    public OTPExpiredException(String message, Throwable throwable){
        super(message, throwable);
    }
}
