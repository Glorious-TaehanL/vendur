Need to insntall csv-writer

```
yarn add csv-writer
```

## Plugin setup

1. Add the server and admin UI extensions in your `vendure-config.ts`

```js
// Server plugin
plugins: [
  OrderExportPlugin.init({
    // Optionally add your own strategies here
    exportStrategies: [],
  }),
];
```

```js
// Admin UI extension
AdminUiPlugin.init({
  port: 3002,
  route: 'admin',
  app: compileUiExtensions({
    outputPath: path.join(__dirname, '__admin-ui'),
    extensions: [OrderExportPlugin.ui],
  }),
});
```