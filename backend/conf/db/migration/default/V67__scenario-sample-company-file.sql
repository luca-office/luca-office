CREATE TABLE scenario_sample_company_file (
    scenario_id UUID NOT NULL,
    file_id UUID NOT NULL,
    relevance RELEVANCE NOT NULL,

    PRIMARY KEY (scenario_id, file_id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (file_id) REFERENCES file (id)
);
