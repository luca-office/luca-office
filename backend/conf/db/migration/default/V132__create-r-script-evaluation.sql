CREATE TYPE R_SCRIPT_EVALUATION_STATUS AS ENUM ('Success', 'NoResult', 'Timeout');

CREATE TABLE r_script_evaluation (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status R_SCRIPT_EVALUATION_STATUS NOT NULL,
    score INT NOT NULL,
    confidence NUMERIC NOT NULL,
    invitation_id UUID NOT NULL,
    criterion_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (invitation_id) REFERENCES survey_invitation (id),
    FOREIGN KEY (criterion_id) REFERENCES scenario_coding_automated_criterion (id)
);
