CREATE TABLE rating (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    finalized_at TIMESTAMP WITH TIME ZONE,

    survey_id UUID NOT NULL,
    user_account_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (survey_id) REFERENCES survey (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id),

    UNIQUE (survey_id, user_account_id)
);

ALTER TABLE scenario_rating
    DROP COLUMN user_account_id,
    ADD COLUMN rating_id UUID NOT NULL REFERENCES rating (id);

ALTER TABLE freetext_question_rating
    DROP COLUMN user_account_id,
    ADD COLUMN rating_id UUID NOT NULL REFERENCES rating (id);
