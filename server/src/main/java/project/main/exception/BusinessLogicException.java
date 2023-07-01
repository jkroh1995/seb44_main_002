package project.main.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException{

    @Getter
    private final ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
        // 화이팅
    }
}