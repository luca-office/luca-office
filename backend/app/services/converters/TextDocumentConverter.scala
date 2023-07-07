package services.converters

import database.generated.public.TextDocument
import models.TextDocumentCreation
import utils.DateUtils

import java.util.UUID

object TextDocumentConverter {

  def toTextDocument(creation: TextDocumentCreation): TextDocument =
    TextDocument(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      content = creation.content
    )

  def toTextDocumentCreation(textDocument: TextDocument): TextDocumentCreation =
    TextDocumentCreation(content = textDocument.content)
}
