package com.doccure.BE.exception;

public class UsernameAlreadyExistsException extends Exception{
    public UsernameAlreadyExistsException(String message){
        super(message);
    }

    public UsernameAlreadyExistsException(String message, Throwable throwable){
        super(message, throwable);
    }
}
