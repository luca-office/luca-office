CREATE TABLE freetext_question_coding_criterion (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    description VARCHAR NOT NULL,
    score INT NOT NULL CHECK (score >= 0 AND score <= 99),

    question_id UUID NOT NULL,

    PRIMARY KEY (id),

    FOREIGN KEY (question_id) REFERENCES questionnaire_question (id)
);
