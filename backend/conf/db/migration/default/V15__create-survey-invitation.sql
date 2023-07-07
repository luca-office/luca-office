CREATE TABLE survey_invitation (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    token VARCHAR NOT NULL,
    email VARCHAR,

    survey_id UUID,
    user_account_id UUID,

    PRIMARY KEY (id),

    FOREIGN KEY (survey_id) REFERENCES survey (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id),

    UNIQUE (token)
);
