package com.dev_lim.portfolio.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCorsConfig {
    @Value("${app.cors.allowed-origins}") String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(allowedOrigins.split("\\s*,\\s*")) // 공백 허용
                        .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                        .allowCredentials(false);
                // .allowedHeaders("*")   // (필요 시) 커스텀 헤더 쓸 때
                // .exposedHeaders("...") // (필요 시)
            }
        };
    }
}

