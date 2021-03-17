#! /bin/sh

if [ "$REACT_APP_API_BASE_URL" = "" ]; then
	echo "Missing required parameter 'evanescence api url -> REACT_APP_API_BASE_URL'"
	exit 3
fi

npm run build --production || exit 2

echo "Starting nginx..."

nginx -g "daemon off;"