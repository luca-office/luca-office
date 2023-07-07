package models

case class RScriptCreation(
    title: String,
    description: String,
    version: String,
    gitCommitHash: String
)

case class RScriptUpdate(
    title: String,
    description: String,
    version: String,
    gitCommitHash: String
)
