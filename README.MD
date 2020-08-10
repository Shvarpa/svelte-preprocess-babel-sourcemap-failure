When using svelte preprocess with typescript & babel,  
if sourceMap option is enabled inside tsconfig.json.  
webpack throws:  
 ERROR in ./src/index.svelte Module build failed (from ./node_modules/svelte-loader/index.js): Error: .inputSourceMap must be a boolean, object, or undefined

else, if soruceMap is disable everything works as intended.

the error seems to come from

    const script = async ({ content, attributes, filename, }) => {
        const transformResult = await scriptTransformer({
            content,
            attributes,
            filename,
        });
        let { code, map, dependencies, diagnostics } = transformResult;
        if (transformers.babel) {
            const transformed = await exports.runTransformer('babel', getTransformerOptions('babel'), {
                content: code,
                map
                filename,
                attributes,
            });
            code = transformed.code;
            map = transformed.map;
            dependencies = utils_1.concat(dependencies, transformed.dependencies);
            diagnostics = utils_1.concat(diagnostics, transformed.diagnostics);
        }
        return { code, map, dependencies, diagnostics };
    };

transformResult.map seems to be a json string, and babel wants an object.  

the following fixes the problem but i dont know if source map works as intended.

    const script = async ({ content, attributes, filename, }) => {
        const transformResult = await scriptTransformer({
            content,
            attributes,
            filename,
        });
        let { code, map, dependencies, diagnostics } = transformResult;
        if (transformers.babel) {
            const transformed = await exports.runTransformer('babel', getTransformerOptions('babel'), {
                content: code,
                map: typeof map == "string" ? JSON.parse(map) : map,
                filename,
                attributes,
            });
            code = transformed.code;
            map = transformed.map;
            dependencies = utils_1.concat(dependencies, transformed.dependencies);
            diagnostics = utils_1.concat(diagnostics, transformed.diagnostics);
        }
        return { code, map, dependencies, diagnostics };
    };
