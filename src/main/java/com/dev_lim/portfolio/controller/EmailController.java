package com.dev_lim.portfolio.controller;

import com.dev_lim.portfolio.dto.EmailForm;
import com.dev_lim.portfolio.service.EmailService;
import com.dev_lim.portfolio.service.IpRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class EmailController {

    private final EmailService emailService;
    private final IpRateLimiter ipRateLimiter;

    public EmailController(EmailService emailService, IpRateLimiter ipRateLimiter) {
        this.emailService = emailService;
        this.ipRateLimiter = ipRateLimiter;
    }

    @PostMapping
    public ResponseEntity<?> send(@RequestBody EmailForm form, HttpServletRequest request) {
        String ip = getClientIp(request);

        if (ipRateLimiter.isLimitExceeded(ip)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body("하루 3번까지만 전송할 수 있습니다.");
        }

        emailService.send("wkdgoa3021@hanmail.net", form.getSubject(), buildBody(form));
        ipRateLimiter.log(ip);
        return ResponseEntity.ok("전송 성공");
    }

    private String buildBody(EmailForm form) {
        return "보낸 사람: " + form.getFrom() + "\n\n내용:\n" + form.getMessage();
    }

    private String getClientIp(HttpServletRequest request) {
        String header = request.getHeader("X-Forwarded-For");
        return (header != null) ? header.split(",")[0] : request.getRemoteAddr();
    }
}
