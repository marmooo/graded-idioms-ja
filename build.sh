deno run --allow-read --allow-write web.js
mkdir -p docs
cp -r src/* docs
minify -r src -o docs
