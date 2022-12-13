const fs = require("fs");
const compressImages = require('compress-images');


async function compress(images) {
    if (images.size > 0) {
        if (images.mimetype == "image/png" || images.mimetype == "image/jpeg" || images.mimetype == "image/jpg") {
            fs.readFile(images.path, function (error, data) {
                if (error) throw error

                const filePath = "Public/temp-uploads/" + images.filename;
                const compressedFilePath = images.destination + '/';
                const compression = 60;

                fs.writeFile(filePath, data, async function (error) {
                    if (error) throw error

                    compressImages(filePath, compressedFilePath, { compress_force: false, statistic: true, autoupdate: true }, false,
                        { jpg: { engine: "mozjpeg", command: ["-quality", compression] } },
                        { png: { engine: "pngquant", command: ["--quality=" + compression + "-" + compression, "-o"] } },
                        { svg: { engine: "svgo", command: "--multipass" } },
                        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                        async function (error, completed, statistic) {
                            console.log("-------------")
                            console.log(error)
                            console.log(completed)
                            console.log(statistic)
                            console.log("-------------")

                            fs.unlink(filePath, function (error) {
                                if (error) throw error
                            })
                        })
                    return completed
                })

                fs.unlink(images.path, function (error) {
                    if (error) throw error
                })
            })
            return images.path;
        } else {
            return ("Please select an image")
        }
    } else {
        return ("Please select an image")
    }
}

async function compressUp(images) {
    if (images.mimetype == "image/png" || images.mimetype == "image/jpeg" || images.mimetype == "image/jpg") {
        fs.readFile(images.path, function (error, data) {
            if (error) throw error

            const filePath = "Public/temp-uploads/" + images.filename;
            const compressedFilePath = images.destination;
            const compression = 60;

            fs.writeFile(filePath, data, async function (error) {
                if (error) throw error

                compressImages(filePath, compressedFilePath, { compress_force: false, statistic: true, autoupdate: true }, false,
                    { jpg: { engine: "mozjpeg", command: ["-quality", compression] } },
                    { png: { engine: "pngquant", command: ["--quality=" + compression + "-" + compression, "-o"] } },
                    { svg: { engine: "svgo", command: "--multipass" } },
                    { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
                    async function (error, completed, statistic) {
                        console.log("-------------")
                        console.log(error)
                        console.log(completed)
                        console.log(statistic)
                        console.log("-------------")

                        fs.unlink(filePath, function (error) {
                            if (error) throw error
                        })
                    })
                return ("File has been compressed and saved.")
            })

            fs.unlink(images.path, function (error) {
                if (error) throw error
            })
        })
        return images.path;
    } else {
        return ("Please select an image")
    }
}

module.exports = {
    compress,
    compressUp
}