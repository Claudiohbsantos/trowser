  functionNode.jsDoc?.[0]?.tags
    ?.filter((tag) => tag.kind === kindLookup['JSDocParameterTag'])
    ?.forEach((tag) => extendParametersWithJsDoc(func.parameters, tag));
