ALTER TABLE intervention
    RENAME COLUMN email_id TO intervention_email_id;

ALTER TABLE intervention
    DROP COLUMN intervention_condition,
    ADD COLUMN email_id UUID REFERENCES email (id),
    ADD COLUMN answer_id UUID REFERENCES questionnaire_answer (id),
    ADD COLUMN is_negated BOOLEAN,
    ADD COLUMN value VARCHAR;

DROP TYPE INTERVENTION_CONDITION;

ALTER TYPE INTERVENTION_TYPE RENAME VALUE 'FileContent' TO 'EmailOpening';
