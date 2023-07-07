CREATE TABLE project_user_account (
    project_id UUID NOT NULL,
    user_account_id UUID NOT NULL,

    PRIMARY KEY (project_id, user_account_id),

    FOREIGN KEY (project_id) REFERENCES project (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id)
);
