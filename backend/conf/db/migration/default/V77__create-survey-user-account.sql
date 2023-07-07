CREATE TABLE survey_user_account (
    survey_id UUID NOT NULL,
    user_account_id UUID NOT NULL,

    PRIMARY KEY (survey_id, user_account_id),

    FOREIGN KEY (survey_id) REFERENCES survey (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id)
);
