ALTER TABLE reference_book_content
    ADD COLUMN pdf_binary_file_id UUID REFERENCES binary_file (id),
    DROP CONSTRAINT reference_book_content_check,
    ADD CHECK ((content_type = 'TextContent' AND text IS NOT NULL AND image_binary_file_id IS NULL AND
                video_binary_file_id IS NULL AND pdf_binary_file_id IS NULL) OR
               (content_type = 'ImageContent' AND text IS NULL AND image_binary_file_id IS NOT NULL AND
                video_binary_file_id IS NULL AND pdf_binary_file_id IS NULL) OR
               (content_type = 'VideoContent' AND text IS NULL AND image_binary_file_id IS NULL AND
                video_binary_file_id IS NOT NULL AND pdf_binary_file_id IS NULL) OR
               (content_type = 'PdfContent' AND text IS NULL AND image_binary_file_id IS NULL AND
                video_binary_file_id IS NULL AND pdf_binary_file_id IS NOT NULL));
