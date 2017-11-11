## Development
1. start scss to css conversion
```
npm run watch-css
```
2. start development server
```
npm start
```

## Build css from scss/sass
Add the following lines to __"scripts"__ in __package.json__:
```
"build-css": "node-sass-chokidar --indented-syntax src/ -o src/",
"watch-css": "npm run build-css && node-sass-chokidar --indented-syntax src/ -o src/ --watch --recursive",
```
The option __--indented-syntax__ causes to include freely __sass__ and __scss__ syntax files.


## Organisation of styling
Each component get an own `scss` file started with underscore.
The underscore is important, to not to create a `css` file from
each scss fragment but only from the one which includes every others.
That is the `src/index.scss`.
