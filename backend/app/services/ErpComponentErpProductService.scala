package services

import database.DatabaseContext
import database.generated.public.{ErpComponent, ErpComponentErpProduct, ErpProduct}
import models.{ErpComponentErpProductCreation, ErpComponentErpProductUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class ErpComponentErpProductService @Inject() (databaseContext: DatabaseContext)(implicit
    val executionContext: ExecutionContext)
    extends DefaultAllErpComponentErpProduct
    with DefaultErpComponentsForErpProduct
    with DefaultErpProductsForErpComponent
    with DefaultCreateErpComponentErpProduct
    with DefaultUpdateErpComponentErpProduct
    with DefaultDeleteErpComponentErpProduct {
  val context = databaseContext

  import context._

  def all(sampleCompanyId: UUID): Future[Seq[ErpComponentErpProduct]] =
    performIO(allErpComponentErpProductsAction(sampleCompanyId))

  def erpProductsForErpComponent(componentId: Int, sampleCompanyId: UUID): Future[Seq[ErpProduct]] =
    performIO(erpProductsForErpComponentAction(componentId, sampleCompanyId))

  def erpComponentsForErpProduct(productId: Int, sampleCompanyId: UUID): Future[Seq[ErpComponent]] =
    performIO(erpComponentsForErpProductAction(productId, sampleCompanyId))

  def create(creation: ErpComponentErpProductCreation): Future[ErpComponentErpProduct] =
    performIO(createErpComponentErpProductAction(creation))
      .recover(defaultErrorHandler)

  def update(id: Int, sampleCompanyId: UUID, update: ErpComponentErpProductUpdate): Future[ErpComponentErpProduct] =
    performIO(updateErpComponentErpProductAction(id, sampleCompanyId, update))
      .recover(defaultErrorHandler)

  def delete(id: Int, sampleCompanyId: UUID): Future[ErpComponentErpProduct] =
    performIO(deleteErpComponentErpProductAction(id, sampleCompanyId))
}
