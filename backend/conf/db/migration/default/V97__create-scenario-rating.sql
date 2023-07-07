CREATE TABLE scenario_rating (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    scenario_id UUID NOT NULL,
    user_account_id UUID NOT NULL,
    survey_invitation_id UUID NOT NULL,
    no_criterion_fulfilled BOOLEAN NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (scenario_id) REFERENCES user_account (id),
    FOREIGN KEY (user_account_id) REFERENCES user_account (id),
    FOREIGN KEY (survey_invitation_id) REFERENCES survey_invitation (id),

    UNIQUE (scenario_id, user_account_id, survey_invitation_id)
);

CREATE TABLE scenario_rating_criterion_selection (
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    rating_id UUID NOT NULL,
    criterion_id UUID NOT NULL,

    PRIMARY KEY (rating_id, criterion_id),

    FOREIGN KEY (rating_id) REFERENCES scenario_rating (id),
    FOREIGN KEY (criterion_id) REFERENCES coding_criterion (id)
);
