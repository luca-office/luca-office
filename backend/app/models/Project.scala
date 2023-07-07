package models

import enums.UsageField

case class ProjectCreation(
    name: String,
    description: String,
    usageField: UsageField,
    audience: String,
    welcomeText: String
)

case class ProjectUpdate(
    name: String,
    description: String,
    usageField: UsageField,
    audience: String,
    welcomeText: String
)
