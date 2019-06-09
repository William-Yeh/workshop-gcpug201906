#!/bin/sh
#
# patch the service endpoint, and then serve the static content
#

echo "==> Patching..."
echo $TODOAPI_HOST
echo $TODOAPI_PORT
echo $TODOAPI_PATH

sed -i  "s/{{TODOAPI_HOST}}/$(echo $TODOAPI_HOST)/g"  site.js
sed -i  "s/{{TODOAPI_PORT}}/$(echo $TODOAPI_PORT)/g"  site.js
sed -i  "s#{{TODOAPI_PATH}}#$(echo $TODOAPI_PATH)#g"  site.js

echo "==> Serving..."
exec httpd -f -p 80