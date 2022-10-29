import express from 'express'

const placeholderFileName = 'placeholder.jpeg'

function isParamInt(param: unknown): boolean {
  return typeof param === 'string' && !isNaN(parseInt(param))
}

function isParamString(param: unknown): boolean {
  return typeof param === 'string'
}

export function isValidQuery(req: express.Request): boolean {
  return (
    isParamString(req.query.name) ||
    isParamInt(req.query.width) ||
    isParamInt(req.query.height)
  )
}

export function getImagePathFromRequest(req: express.Request): string {
  const query = req.query
  let filePath = ''

  if (isParamInt(query.width) && isParamInt(query.height)) {
    filePath = `thumbnails/${query.width}/${query.height}/`
  } else if (isParamInt(query.width)) {
    filePath = `thumbnails/${query.width}/${query.width}/`
  } else if (isParamInt(query.height)) {
    filePath = `thumbnails/${query.height}/${query.height}/`
  }

  if (isParamString(query.name)) {
    filePath += `${query.name}.jpeg`
  } else {
    filePath += placeholderFileName
  }

  return filePath
}
