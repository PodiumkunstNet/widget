# Podiumkunst.net widget

## Development
- $ npm i
- $ npm run dev:widget
- $ npm run dev:configurator

### Adjust queries
- Add/edit query in `packages/widget/src/queries`
- The `{{iri}}` is a placeholder for the IRI and replaced by the software with the real IRI
- The `.sparql` files are imported by the `widgetHelpers` in the `packages/widget/src/helpers/index.ts` file
- The data is fetched by `queryWidgetByIri` in the `packages/widget/src/hooks/useWidgetByIri.ts` file

### Replace endpoint
- Change the SPARQL_ENDPOINT value in `packages/widget/.env`
