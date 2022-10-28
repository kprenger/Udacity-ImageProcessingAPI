import { promises as fsPromises } from 'fs'
import path from 'path'
import sharp from 'sharp'

const assetsDir = './src/assets'

export async function doesAssetExist(fileName: string): Promise<boolean> {
  try {
    const fileArray = await fsPromises.readdir(assetsDir)
    return fileArray.includes(fileName)
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function getImageList(): Promise<Array<string>> {
  try {
    return (await fsPromises.readdir(assetsDir)).map(
      (imageName) => imageName.split('.')[0]
    )
  } catch (error) {
    console.log(error)
    return []
  }
}

export function getFullAssetPath(fileName: string): string {
  return path.resolve(`src/assets/${fileName}`)
}

export async function createAsset(filePath: string): Promise<void> {
  // filePath = thumbnails/width/height/name.jpeg
  const pathArray = filePath.split('/')
  const fileName = pathArray.at(-1)
  const width = parseInt(pathArray[1])
  const height = parseInt(pathArray[2])

  try {
    await fsPromises.mkdir(path.dirname(`${assetsDir}/${filePath}`), {
      recursive: true
    })
    await sharp(`${assetsDir}/${fileName}`)
      .resize(width, height)
      .toFile(`${assetsDir}/${filePath}`)
  } catch (error) {
    console.log(error)
  }
}
