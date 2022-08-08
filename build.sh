deno run --allow-read --allow-write --allow-env web.js
mkdir -p docs
cp -r src/* docs
drop-inline-css -r src -o docs
minify -r docs -o .
