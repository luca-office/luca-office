package enums

import io.circe.{Decoder, Encoder}
import utils.CirceUtils

sealed trait ErpTableType

object ErpTableType {

  case object Component extends ErpTableType
  case object ComponentProduct extends ErpTableType
  case object Customer extends ErpTableType
  case object Employee extends ErpTableType
  case object Invoice extends ErpTableType
  case object Order extends ErpTableType
  case object OrderItem extends ErpTableType
  case object Product extends ErpTableType
  case object Supplier extends ErpTableType

  def parse(value: String): ErpTableType =
    value match {
      case "Component" => Component
      case "ComponentProduct" => ComponentProduct
      case "Customer" => Customer
      case "Employee" => Employee
      case "Invoice" => Invoice
      case "Order" => Order
      case "OrderItem" => OrderItem
      case "Product" => Product
      case "Supplier" => Supplier
    }

  def print(value: ErpTableType): String = value.toString

  implicit val decoder: Decoder[ErpTableType] =
    CirceUtils.mkDecoderWith[ErpTableType](parse)

  implicit val encoder: Encoder[ErpTableType] =
    CirceUtils.mkEncoderWith[ErpTableType](print)
}
