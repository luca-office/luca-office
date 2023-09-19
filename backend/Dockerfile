# --- Build Stage ---
FROM hseeberger/scala-sbt:11.0.9.1_1.4.7_2.13.4 as build
WORKDIR /app

# Cache dependencies first for efficient layering
COPY build.sbt /app/
COPY project/ /app/project/
RUN sbt update

# Now copy rest of the project and build
COPY . /app
RUN sbt universal:packageZipTarball

# --- Final Stage ---
FROM openjdk:14
ENV PACKAGE_NAME luca-backend-dist

# Copy the .tgz file from the build stage
COPY --from=build /app/target/universal/${PACKAGE_NAME}.tgz /opt

# Continue as before
RUN chmod +x /opt/${PACKAGE_NAME}/bin/luca
ENV PATH /opt/${PACKAGE_NAME}/bin:$PATH
WORKDIR /opt/${PACKAGE_NAME}/bin/
ENTRYPOINT ["luca"]
CMD ["-Dlogger.resource=logback.production.xml"]
EXPOSE 9000
