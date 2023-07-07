package controllers

import play.api.mvc._
import views.ErpImportDocumentationViewModel

import javax.inject.Inject

class DocumentationController @Inject() (controllerComponents: ControllerComponents)
    extends AbstractController(controllerComponents) {

  def erpImportDocumentation: Action[AnyContent] = Action {
    Ok(views.html.erpImportDocumentation(ErpImportDocumentationViewModel.tables))
  }
}
