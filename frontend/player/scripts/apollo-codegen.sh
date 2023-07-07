BIN="../node_modules/.bin"
SRC="./src"
TARGET_DIRECTORY="${SRC}/graphql/generated"
SCHEMA_FILE_PATH="${TARGET_DIRECTORY}/schema.json";

rm ${TARGET_DIRECTORY}/*

${BIN}/apollo service:download ${SCHEMA_FILE_PATH} --endpoint http://localhost:9000/office/graphql

${BIN}/apollo client:codegen \
    --localSchemaFile=${SCHEMA_FILE_PATH} \
    --target=typescript \
    --includes=${SRC}/**/*.graphql \
    --outputFlat \
    ${TARGET_DIRECTORY}

rm ${SCHEMA_FILE_PATH}
