ALTER TYPE INTERVENTION_TYPE ADD VALUE 'TextDocumentContent';

ALTER TABLE intervention
    ADD COLUMN text_document_id UUID,
    ADD FOREIGN KEY (text_document_id) REFERENCES text_document (id);
