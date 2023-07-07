ALTER TABLE coding_item
    DROP COLUMN no_criterion_fulfilled;

ALTER TABLE scenario_rating_criterion_selection
    DROP COLUMN scenario_rating_id;

DROP TABLE scenario_rating;

CREATE TABLE scenario_coding_item_rating (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    no_criterion_fulfilled BOOLEAN NOT NULL,

    survey_invitation_id UUID NOT NULL,
    rating_id UUID NOT NULL,
    coding_item_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (survey_invitation_id) REFERENCES survey_invitation (id) ON DELETE CASCADE,
    FOREIGN KEY (rating_id) REFERENCES rating (id) ON DELETE CASCADE,
    FOREIGN KEY (coding_item_id) REFERENCES coding_item (id) ON DELETE CASCADE
);

TRUNCATE TABLE scenario_rating_criterion_selection;

ALTER TABLE scenario_rating_criterion_selection
    ADD COLUMN scenario_coding_item_rating_id UUID NOT NULL,
    ADD FOREIGN KEY (scenario_coding_item_rating_id) REFERENCES scenario_coding_item_rating (id) ON DELETE CASCADE,
    ADD UNIQUE (scenario_coding_item_rating_id, manual_criterion_id, automated_criterion_id);
