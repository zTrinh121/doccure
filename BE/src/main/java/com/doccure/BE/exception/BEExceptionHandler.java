package com.doccure.BE.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BEExceptionHandler {
    @ExceptionHandler(value = {DataNotFoundException.class})
    public ResponseEntity<Object> handleDataNotFoundException(
            DataNotFoundException dataNotFoundException) {
        DataException dataException = new DataException(
                dataNotFoundException.getMessage(),
                dataNotFoundException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(dataException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {EmailAlreadyExistsException.class})
    public ResponseEntity<Object> handleEmailAlreadyExistsException(
            EmailAlreadyExistsException emailAlreadyExistsException) {
        DataException dataException = new DataException(
                emailAlreadyExistsException.getMessage(),
                emailAlreadyExistsException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(dataException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {PasswordChangeNotAllowedException.class})
    public ResponseEntity<Object> handlePasswordChangeNotAllowedException(
        PasswordChangeNotAllowedException passwordChangeNotAllowedException) {
        DataException dataException = new DataException(
                passwordChangeNotAllowedException.getMessage(),
                passwordChangeNotAllowedException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(dataException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {UnauthorizedException.class})
    public ResponseEntity<Object> handleUnauthorizedException(
        UnauthorizedException unauthorizedException) {
        DataException dataException = new DataException(
                unauthorizedException.getMessage(),
                unauthorizedException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(dataException, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = {UsernameAlreadyExistsException.class})
    public ResponseEntity<Object> handleUsernameAlreadyExistsException(
        UsernameAlreadyExistsException usernameAlreadyExistsException) {
        DataException dataException = new DataException(
                usernameAlreadyExistsException.getMessage(),
                usernameAlreadyExistsException.getCause(),
                HttpStatus.NOT_FOUND
        );
        return new ResponseEntity<>(dataException, HttpStatus.NOT_FOUND);
    }

}
