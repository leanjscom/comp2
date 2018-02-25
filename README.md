# React Context Component

This is a React component that lets you add things in the context. Put simply, the [context feature](https://facebook.github.io/react/docs/context.html) basically lets you to pass some data through all nodes in the components tree.

This component replaces the need to create many different "Providers", where each Provider does the same job.

For instance, instead of doing this:
```react
<Provider store={store}>
	<GridProvider grid={grid}>
		<WidthProvider width={width}>
	        // some components
        </WidthProvider>
    </GridProvider>
</Provider>
```

You can do this
```react
import Context from 'react-compose-component'

<Context grid={grid} store={store} width={width}>
    // some components
</Context>
```


## Instalation

If you are using yarn:
`yarn add react-compose-component`

If you are using npm:
`npm i react-compose-component
