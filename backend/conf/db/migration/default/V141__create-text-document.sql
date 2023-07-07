CREATE TABLE text_document (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    content VARCHAR NOT NULL,

    PRIMARY KEY (id)
);

ALTER TABLE file
    ADD COLUMN text_document_id UUID REFERENCES text_document (id);

ALTER TYPE MIME_TYPE ADD VALUE 'TextHtml';
