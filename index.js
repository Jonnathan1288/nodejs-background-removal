import { removeBackground } from "@imgly/background-removal-node";
import fs from "fs";
import path from "path";

const inputPath = "./img/fa.jpg";
const outputPath = "./output/output.png";

if (!fs.existsSync(inputPath)) {
    console.error("input file not found" + inputPath);
    process.exit(1);
}

path.resolve(inputPath); // C://Users/.../img/fa.jpg

const absolutePath = path.resolve(inputPath);
const imageUrl = `file://${absolutePath}`; // file://C:/Users/.../img/fa.jpg

const blobToBuffer = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();

    return Buffer.from(arrayBuffer);
};

const main = async () => {
    try {
        const blob = await removeBackground(imageUrl);
        const buffer = await blobToBuffer(blob);
        fs.writeFileSync(outputPath, buffer);
    } catch (error) {
        console.error(error);
    }
};

main();
// removeBackground(imageUrl)
//     .then(async (blob) => {
//         const buffer = await blobToBuffer(blob);
//         fs.writeFileSync(outputPath, buffer);
//         console.log("Background removed successfully");
//     })
//     .catch((error) => {
//         console.error(error);
//     });
