CREATE TABLE scenario_user_account (
    scenario_id UUID NOT NULL,
    user_account_id UUID NOT NULL,

    PRIMARY KEY (scenario_id, user_account_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id)
);
