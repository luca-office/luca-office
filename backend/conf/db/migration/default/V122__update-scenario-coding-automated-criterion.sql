ALTER TABLE scenario_coding_automated_criterion
    ADD COLUMN r_script_id UUID REFERENCES r_script (id);
