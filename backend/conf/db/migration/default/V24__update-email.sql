ALTER TABLE email
    RENAME received_delay TO reception_delay_in_seconds;

ALTER TABLE email
    RENAME initially_read TO is_initially_read;
