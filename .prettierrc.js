module.exports = {
    tabWidth: 2,
    useTabs: false,
    trailingComma: "es5",
    printWidth: 360,
    bracketSameLine: true,
    overrides: [
        {
            files: ["*.ts","*.mts"],
            options: {
                parser: "typescript",
            },
        },
    ],
};
     
    
