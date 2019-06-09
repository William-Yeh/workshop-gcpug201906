#
# http static server one-liners
#

FROM busybox:1.30

WORKDIR /app
COPY . .

EXPOSE 80
CMD ["busybox", "httpd", "-f", "-p", "80"]
