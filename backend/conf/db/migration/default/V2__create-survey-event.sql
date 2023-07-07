CREATE TYPE SURVEY_EVENT_TYPE AS ENUM ('OpenFile', 'CloseFile');

CREATE TABLE survey_event (
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    event_type SURVEY_EVENT_TYPE NOT NULL,
    data JSONB NOT NULL,

    user_account_id UUID NOT NULL,
    survey_id UUID NOT NULL,

    PRIMARY KEY (user_account_id, survey_id),

    FOREIGN KEY (user_account_id) REFERENCES user_account (id),
    FOREIGN KEY (survey_id) REFERENCES survey (id)
);
