package com.example.moteurrecherche.repository;

import com.example.moteurrecherche.entities.PDFDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElasticsearchPDFDocumentRepository extends ElasticsearchRepository<PDFDocument,String> {
    // Recherche par contenu, peu importe la casse
    List<PDFDocument> findByContentContainingIgnoreCase(String keyword);

    // Vous pouvez également ajouter une recherche exacte de la phrase
    List<PDFDocument> findByContentMatches(String keyword);


}
