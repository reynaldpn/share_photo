export function SetImages(images) {
    let newImages = []

    for(let image of images) {
        newImages.push({
            source: {
                uri: image
            }
        })
    }

    return newImages
}