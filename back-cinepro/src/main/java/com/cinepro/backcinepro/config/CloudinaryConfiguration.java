package com.cinepro.backcinepro.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfiguration {

    @Value("${CLOUDINARY_NAME}")
    private String cloudinaryName;

    @Value("${CLOUDINARY_KEY}")
    private String cloudinaryKey;

    @Value("${CLOUDINARY_SECRET}")
    private String cloudinarySecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudinaryName,
                "api_key", cloudinaryKey,
                "api_secret", cloudinarySecret));
    }
}