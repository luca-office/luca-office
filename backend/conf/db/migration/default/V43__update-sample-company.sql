ALTER TABLE sample_company
    ALTER COLUMN email_signature DROP NOT NULL,
    ALTER COLUMN logo_file_id DROP NOT NULL,
    ALTER COLUMN profile_file_id DROP NOT NULL;
