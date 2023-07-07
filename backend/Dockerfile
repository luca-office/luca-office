FROM openjdk:14

ENV PACKAGE_NAME luca-backend-dist

ADD /target/universal/${PACKAGE_NAME}.tgz /opt
RUN chmod +x /opt/${PACKAGE_NAME}/bin/luca
ENV PATH /opt/${PACKAGE_NAME}/bin:$PATH
WORKDIR /opt/${PACKAGE_NAME}/bin/
ENTRYPOINT ["luca"]
CMD ["-Dlogger.resource=logback.production.xml"]
EXPOSE 9000
