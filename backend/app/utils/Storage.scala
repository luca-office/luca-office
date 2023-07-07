package utils

import akka.NotUsed
import akka.actor.ActorSystem
import akka.stream.alpakka.s3.scaladsl.S3
import akka.stream.alpakka.s3.{S3Attributes, S3Ext}
import akka.stream.scaladsl.Source
import akka.util.ByteString
import com.amazonaws.auth.{AWSStaticCredentialsProvider, BasicAWSCredentials}
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.model.DeleteObjectsRequest.KeyVersion
import com.amazonaws.services.s3.model._
import com.amazonaws.services.s3.{AmazonS3, AmazonS3ClientBuilder}
import play.api.Logging
import software.amazon.awssdk.auth.credentials.{AwsCredentials, AwsCredentialsProvider}
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.regions.providers.AwsRegionProvider

import java.io.{File, InputStream}
import java.util.UUID
import javax.inject.{Inject, Singleton}
import scala.concurrent.{ExecutionContext, Future}
import scala.jdk.CollectionConverters._
import scala.util.{Success, Try}

@Singleton
class Storage @Inject() (applicationConfiguration: ApplicationConfiguration)(implicit
    executionContext: ExecutionContext,
    actorSystem: ActorSystem)
    extends Logging {
  private val s3 = applicationConfiguration.s3
  private val region = Regions.fromName(s3.regionName)
  private val bucketName = s3.bucketName
  private val credentials = new BasicAWSCredentials(s3.accessKey, s3.secretKey)

  private val client: AmazonS3 = AmazonS3ClientBuilder
    .standard()
    .withCredentials(new AWSStaticCredentialsProvider(credentials))
    .withRegion(region)
    .build()

  def allIds: Future[Seq[UUID]] =
    Future(
      client
        .listObjects(bucketName)
        .getObjectSummaries
        .asScala
        .map(key => Try(UUID.fromString(key.getKey)))
        .collect { case Success(id) => id }
        .toSeq
    )

  def create(id: UUID, contentType: String, file: File): Future[Try[PutObjectResult]] =
    Future {
      val accessControlList = CannedAccessControlList.PublicRead
      val metadata = new ObjectMetadata()
      metadata.setContentType(contentType)
      val request = new PutObjectRequest(bucketName, id.toString, file)
        .withCannedAcl(accessControlList)
        .withMetadata(metadata)

      Try(client.putObject(request))
    }

  def createDownloadUrl(id: UUID): String =
    client.getUrl(bucketName, id.toString).toString

  def getObject(id: UUID): Try[StorageObject] =
    Try(client.getObject(bucketName, id.toString))
      .map(s3Object => StorageObject(s3Object.getObjectMetadata.getContentLength, s3Object.getObjectContent))

  def download(id: UUID): Source[Option[(Source[ByteString, NotUsed], _)], NotUsed] = {
    val credentialsProvider = new AwsCredentialsProvider {
      def resolveCredentials: AwsCredentials = new AwsCredentials {
        def accessKeyId: String = applicationConfiguration.s3.accessKey
        def secretAccessKey: String = applicationConfiguration.s3.secretKey
      }
    }
    val regionProvider = new AwsRegionProvider {
      def getRegion: Region = Region.of(applicationConfiguration.s3.regionName)
    }
    val settings = S3Ext(actorSystem).settings
      .withS3RegionProvider(regionProvider)
      .withCredentialsProvider(credentialsProvider)
    val attributes = S3Attributes.settings(settings)

    S3.download(applicationConfiguration.s3.bucketName, id.toString).withAttributes(attributes)
  }

  def delete(id: UUID): Future[String] =
    Future(client.deleteObject(bucketName, id.toString).toString)

  def delete(ids: Seq[UUID]): Future[Int] =
    if (ids.isEmpty) {
      Future.successful(0)
    }
    else {
      val deleteObjectsRequest = new DeleteObjectsRequest(bucketName)
        .withKeys(ids.map(id => new KeyVersion(id.toString)).asJava)
      Future(client.deleteObjects(deleteObjectsRequest).getDeletedObjects.size())
    }

  case class StorageObject(contentLength: Long, inputStream: InputStream)
}
