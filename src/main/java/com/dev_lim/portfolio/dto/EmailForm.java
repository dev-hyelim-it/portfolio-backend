package com.dev_lim.portfolio.dto;

import lombok.Data;

@Data
public class EmailForm {
    private String from;
    private String subject;
    private String message;
}
