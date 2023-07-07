ALTER TABLE scenario
    ADD COLUMN author_id UUID,
    ADD COLUMN should_display_time BOOLEAN,
    ADD COLUMN finalized_at TIMESTAMP WITH TIME ZONE,
    ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;

UPDATE scenario
SET author_id = (SELECT id FROM user_account LIMIT 1),
    should_display_time = TRUE,
    finalized_at = NOW(),
    published_at = NOW();

ALTER TABLE scenario
    ALTER COLUMN author_id SET NOT NULL,
    ALTER COLUMN should_display_time SET NOT NULL;
