package com.example.moteurrecherche.services;

import com.example.moteurrecherche.entities.PDFDocument;

import com.example.moteurrecherche.repository.ElasticsearchPDFDocumentRepository;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class PDFService {

    @Autowired
    private ElasticsearchPDFDocumentRepository elasticsearchRepository;

    // Méthode pour extraire le texte d'un fichier PDF avec Apache Tika
    public String extractTextFromPDF(String filePath) throws IOException, TikaException {
        Tika tika = new Tika();
        return tika.parseToString(new File(filePath));  // Extraction du texte à partir du fichier PDF
    }

    // Sauvegarder un PDF dans Elasticsearch
    public PDFDocument savePDF(String title, String path, String content) {
        PDFDocument pdfDocument = new PDFDocument();
        pdfDocument.setTitle(title);
        pdfDocument.setPath(path);
        pdfDocument.setContent(content);
        return elasticsearchRepository.save(pdfDocument);
    }

    // Recherche d'un PDF par mot-clé
    public List<PDFDocument> searchByKeyword(String keyword) {
        return elasticsearchRepository.findByContentContainingIgnoreCase(keyword);
    }


}
