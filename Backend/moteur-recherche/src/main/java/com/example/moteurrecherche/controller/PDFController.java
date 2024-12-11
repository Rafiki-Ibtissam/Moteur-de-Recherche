


package com.example.moteurrecherche.controller;

import com.example.moteurrecherche.entities.PDFDocument;
import com.example.moteurrecherche.services.PDFService;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf")
@CrossOrigin(origins = "*") // Autoriser les requêtes depuis ReactJS
public class PDFController {

    @Autowired
    private PDFService pdfService;

    // Indexer un PDF dans Elasticsearch
    @PostMapping("/index")
    public ResponseEntity<?> indexPDF(@RequestParam("file") MultipartFile file,
                                      @RequestParam("title") String title) {
        try {
            // Validation des paramètres
            if (file.isEmpty() || title.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Fichier ou titre manquant !"));
            }

            // Définir le répertoire dans "static/pdfs" à partir du répertoire de travail du projet
            String projectDir = System.getProperty("user.dir");
            String directoryPath = projectDir + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "static" + File.separator + "pdfs";

            File directory = new File(directoryPath);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            String sanitizedFileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-_]", "_");
            String filePath = directoryPath + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            file.transferTo(new File(filePath));

            // Extraction du contenu et indexation
            String content = pdfService.extractTextFromPDF(filePath);
            pdfService.savePDF(title, filePath, content);

            return ResponseEntity.ok(Map.of("message", "PDF indexé avec succès dans Elasticsearch !"));
        } catch (IOException | TikaException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Erreur lors de l'indexation : " + e.getMessage()));
        }
    }

    // Rechercher un PDF par mot-clé

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam("keyword") String keyword) {
        // Effectuer la recherche par phrase
        List<PDFDocument> results = pdfService.searchByKeyword(keyword);
        if (results.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Aucun document trouvé pour la phrase : " + keyword));
        }

        // Construire l'URL complète pour chaque document
        String baseURL = "http://localhost:8025";  // URL de base de votre application
        results.forEach(pdf -> {
            String fileName = new File(pdf.getPath()).getName();  // Récupère le nom du fichier uniquement
            pdf.setPath(baseURL   + "/" + fileName);
        });

        return ResponseEntity.ok(results);
    }















}
