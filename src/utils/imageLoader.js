const importAll = (context) => {
    const images = {};
    context.keys().forEach((key) => {
        const fileName = key.replace('./', '');
        images[fileName] = context(key);
    });
    return images;
};

// require.context(directorio, recursivo, regex de extensiones)
const allMedia = importAll(
    require.context('../Imagenes', false, /\.(png|jpe?g|svg|mp4|webm)$/)
);

export const img = (fileName) => allMedia[fileName];