import { promises as fsPromises } from 'fs'

import {
  createAsset,
  doesAssetExist,
  getFullAssetPath,
  getImageList
} from '../../utilities/fileUtils'

describe('File Utilities Suite', () => {
  describe('Does Asset Exist', () => {
    it('should return true if a named asset exists', () => {
      return expectAsync(doesAssetExist('placeholder.jpeg')).toBeResolvedTo(
        true
      )
    })

    it('should return false if a named asset does not exist', () => {
      return expectAsync(
        doesAssetExist('nonexistent.file.jpeg')
      ).toBeResolvedTo(false)
    })
  })

  describe('Get Image List', () => {
    it('should return a list of current assets with the .jpeg extension removed', () => {
      return expectAsync(getImageList()).toBeResolvedTo([
        'encenadaport',
        'fjord',
        'icelandwaterfall',
        'palmtunnel',
        'placeholder',
        'santamonica'
      ])
    })
  })

  describe('Get Full Asset Path', () => {
    it('should return full path for a given relative path', () => {
      expect(getFullAssetPath('thing')).toContain('/src/assets/thing')
    })

    it('should handle sub-directories', () => {
      expect(getFullAssetPath('one/two/three')).toContain(
        '/src/assets/one/two/three'
      )
    })
  })

  describe('Create Asset', () => {
    const width = 100
    const height = 200
    const fileName = 'placeholder.jpeg'
    const filePath = `thumbnails/${width}/${height}/${fileName}`
    const fullFilePath = `./src/assets/${filePath}`

    afterEach(async () => {
      try {
        await fsPromises.rm(`./src/assets/${filePath}`)
      } catch (error) {
        console.log('this is okay')
      }
    })

    it('should create a given asset if it does not exist', async () => {
      await expectAsync(fsPromises.stat(fullFilePath)).toBeRejectedWithError(
        /ENOENT: no such file or directory/
      )

      await createAsset(filePath)

      await expectAsync(fsPromises.stat(fullFilePath)).toBeResolved()
    })

    it('should not create a given asset if it already exists', async () => {
      await expectAsync(fsPromises.stat(fullFilePath)).toBeRejectedWithError(
        /ENOENT: no such file or directory/
      )

      await createAsset(filePath)

      const stat1 = await fsPromises.stat(fullFilePath)

      await createAsset(filePath)

      const stat2 = await fsPromises.stat(fullFilePath)

      expect(stat1.birthtimeMs).toEqual(stat2.birthtimeMs)
    })
  })
})
