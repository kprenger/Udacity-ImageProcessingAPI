import express from 'express'
import {
  createAsset,
  doesAssetExist,
  getFullAssetPath,
  getImageList
} from '../../utilities/fileUtils'
import {
  getImagePathFromRequest,
  isValidQuery
} from '../../utilities/imageRouteUtils'

const image = express.Router()

// Three paths
// 1: /image (done)
// 2: /image?name= (done)
// 3: /image?name=&width=&height= (if height or width alone - assumes square)

image.get('/', async (req, res) => {
  if (!isValidQuery(req)) {
    const imageList = await getImageList()
    const responseBody = {
      message: 'You need to provide a `name` in the query',
      availableImages: imageList
    }

    res.send(responseBody)
  } else {
    const imagePath = getImagePathFromRequest(req)

    if (await doesAssetExist(imagePath)) {
      res.sendFile(getFullAssetPath(imagePath))
    } else {
      await createAsset(imagePath)
      res.sendFile(getFullAssetPath(imagePath))
    }
  }
})

export default image
