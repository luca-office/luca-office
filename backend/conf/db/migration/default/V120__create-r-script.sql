CREATE TABLE r_script (
    id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    modified_at TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,

    PRIMARY KEY (id)
);
