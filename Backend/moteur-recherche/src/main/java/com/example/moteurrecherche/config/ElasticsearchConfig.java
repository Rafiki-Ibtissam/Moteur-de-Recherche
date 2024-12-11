package com.example.moteurrecherche.config;

import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RestClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import co.elastic.clients.elasticsearch.ElasticsearchClient;

@Configuration
@EnableElasticsearchRepositories(basePackages = "com.example.moteurrecherche.repository")
public class ElasticsearchConfig {

    @Bean
    public ElasticsearchClient elasticsearchClient() {

        // Build the RestClient
        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200, "http") // Si vous utilisez HTTP au lieu de HTTPS
        ).build();


        // Build the RestClientTransport
        RestClientTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper()
        );

        // Return the ElasticsearchClient
        return new ElasticsearchClient(transport);
    }
}
