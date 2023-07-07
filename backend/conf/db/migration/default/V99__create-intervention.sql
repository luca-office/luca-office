CREATE TYPE INTERVENTION_TYPE AS ENUM ('FileOpening', 'FileContent');

CREATE TABLE intervention (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    intervention_type INTERVENTION_TYPE NOT NULL,
    time_offset_in_seconds INT NOT NULL CHECK (time_offset_in_seconds > 0),

    scenario_id UUID NOT NULL,
    email_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (scenario_id) REFERENCES scenario (id),
    FOREIGN KEY (email_id) REFERENCES email (id)
);
