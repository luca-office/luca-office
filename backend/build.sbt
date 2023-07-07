name := "luca"
organization := "CHANGE-ME"
maintainer := "CHANGE-ME"

version := "0.0.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.2"

scalacOptions ++= Seq(
  "-language:higherKinds",
  "-deprecation",
  "-feature",
  "-unchecked",
  "-Xlint"
)

val circeVersionNumber = "0.14.1"
val quillVersionNumber = "3.7.2"
val akkaVersionNumber = "10.1.14"
val alpakkaVersionNumber = "3.0.3"

libraryDependencies ++= Seq(
  caffeine,
  guice,
  ws,
  "org.postgresql"                % "postgresql"               % "42.3.3",
  "org.flywaydb"                 %% "flyway-play"              % "7.2.0",
  "io.getquill"                  %% "quill-jdbc"               % quillVersionNumber,
  "io.getquill"                  %% "quill-jasync-postgres"    % quillVersionNumber,
  "io.getquill"                  %% "quill-codegen-jdbc"       % quillVersionNumber,
  "org.sangria-graphql"          %% "sangria"                  % "2.1.4",
  "org.sangria-graphql"          %% "sangria-circe"            % "1.3.2",
  "io.circe"                     %% "circe-core"               % circeVersionNumber,
  "io.circe"                     %% "circe-generic"            % circeVersionNumber,
  "io.circe"                     %% "circe-generic-extras"     % circeVersionNumber,
  "io.circe"                     %% "circe-parser"             % circeVersionNumber,
  "com.dripower"                 %% "play-circe"               % "2814.2",
  "com.typesafe.akka"            %% "akka-http"                % akkaVersionNumber,
  "com.typesafe.akka"            %% "akka-http-xml"            % akkaVersionNumber,
  "com.lightbend.akka"           %% "akka-stream-alpakka-file" % alpakkaVersionNumber,
  "com.lightbend.akka"           %% "akka-stream-alpakka-s3"   % alpakkaVersionNumber,
  "org.mindrot"                   % "jbcrypt"                  % "0.4",
  "com.amazonaws"                 % "aws-java-sdk"             % "1.11.817",
  "org.apache.poi"                % "poi-ooxml"                % "4.1.2",
  "com.typesafe.play"            %% "play-mailer"              % "8.0.1",
  "com.typesafe.play"            %% "play-mailer-guice"        % "8.0.1",
  "biz.paluch.logging"            % "logstash-gelf"            % "1.14.1",
  "net.logstash.logback"          % "logstash-logback-encoder" % "7.1.1",
  // This dependency is necessary for a transitive override and is tied to the corresponding override of the
  // version of 'jackson-databind'.
  "com.fasterxml.jackson.module" %% "jackson-module-scala"     % "2.13.2",
  "org.scalatestplus.play"       %% "scalatestplus-play"       % "5.0.0" % Test
)

dependencyOverrides ++= Seq(
  // This override needs to be combined with the corresponding 'jackson-module-scala' version.
  "com.fasterxml.jackson.core" % "jackson-databind" %  "2.13.2.2"
)


Compile / doc / sources := Seq.empty
Compile / packageDoc / publishArtifact := false

Universal / packageName := "luca-backend-dist"

Test / javaOptions := Seq("-Dconfig.resource=application.testing.conf", "-Dlogger.resource=logback.testing.xml")

// Remove twirl template imports to avoid unused import warnings (https://github.com/playframework/twirl/issues/105)
TwirlKeys.templateImports := Seq()
