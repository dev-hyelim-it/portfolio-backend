package com.dev_lim.portfolio.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class IpRateLimiter {

    private final Map<String, List<LocalDateTime>> ipHistory = new ConcurrentHashMap<>();

    public boolean isLimitExceeded(String ip) {
        LocalDate today = LocalDate.now();
        List<LocalDateTime> list = ipHistory.getOrDefault(ip, new ArrayList<>());

        // 오늘 날짜 기준 필터링
        long todayCount = list.stream()
                .filter(dt -> dt.toLocalDate().equals(today))
                .count();

        return todayCount >= 3;
    }

    public void log(String ip) {
        ipHistory.putIfAbsent(ip, new ArrayList<>());
        ipHistory.get(ip).add(LocalDateTime.now());
    }
}
