package com.example.moteurrecherche.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;



@Data @AllArgsConstructor @NoArgsConstructor @Builder
@Document(indexName = "pdfdocuments")
public class PDFDocument {



    private String id;

    private String content;


    private String path;


    private String title;

}
