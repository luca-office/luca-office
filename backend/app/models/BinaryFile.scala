package models

import enums.MimeType

case class BinaryFileCreation(
    filename: String,
    fileSize: Long,
    mimeType: MimeType
)
