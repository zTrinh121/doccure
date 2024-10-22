package com.doccure.BE.exception;

public class PasswordChangeNotAllowedException extends Exception{
    public PasswordChangeNotAllowedException(String message){
        super(message);
    }

    public PasswordChangeNotAllowedException(String message, Throwable throwable){
        super(message, throwable);
    }
}
