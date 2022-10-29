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

image.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    if (!isValidQuery(req)) {
      const imageList = await getImageList()
      const responseBody = {
        message:
          'You need to provide a `name`, `width`, or `height` in the query. Options for `name` are below. `width` and `height` are numeric. For example, /api/image?name=fjord&width=800&height=600',
        availableImages: imageList
      }

      res.send(responseBody)
    } else {
      const imagePath = getImagePathFromRequest(req)

      try {
        if (await doesAssetExist(imagePath)) {
          res.sendFile(getFullAssetPath(imagePath))
        } else {
          await createAsset(imagePath)
          res.sendFile(getFullAssetPath(imagePath))
        }
      } catch (error) {
        res.status(500).send({
          message:
            'There was an error processing your request. Please try again later.'
        })
      }
    }
  }
)

export default image
