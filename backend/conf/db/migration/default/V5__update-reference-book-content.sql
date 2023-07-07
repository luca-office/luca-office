ALTER TABLE reference_book_content
    RENAME COLUMN image_id TO image_binary_file_id;

ALTER TABLE reference_book_content
    RENAME COLUMN video_id TO video_binary_file_id;

ALTER TABLE reference_book_content
    ADD FOREIGN KEY (image_binary_file_id) REFERENCES binary_file (id),
    ADD FOREIGN KEY (video_binary_file_id) REFERENCES binary_file (id);
