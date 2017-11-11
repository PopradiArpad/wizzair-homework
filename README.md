## Development
1. start development server
```
npm start
```
2. start scss to css conversion
```
npm run watch-css
```

## Organisation of styling
Each component get an own `scss` file started with underscore.
The underscore is important to not to create a `css` file from
each scss fragment but only from the one which includes every others.
That is the `src/index.scss`.
