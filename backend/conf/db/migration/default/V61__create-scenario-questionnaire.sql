CREATE TABLE scenario_questionnaire (
    scenario_id UUID NOT NULL,
    questionnaire_id UUID NOT NULL,
    activation_delay_in_seconds INT NOT NULL,

    PRIMARY KEY (scenario_id, questionnaire_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (questionnaire_id) REFERENCES questionnaire (id)
);
