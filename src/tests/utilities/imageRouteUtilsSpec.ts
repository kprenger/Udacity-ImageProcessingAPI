import express from 'express'
import {
  getImagePathFromRequest,
  isValidQuery
} from '../../utilities/imageRouteUtils'

describe('Image Utilities Suite', () => {
  describe('Is Valid Query', () => {
    it('should be a valid query if it contains a name', () => {
      expect(
        isValidQuery({
          query: { name: 'testName' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a width', () => {
      expect(
        isValidQuery({
          query: { width: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a height', () => {
      expect(
        isValidQuery({
          query: { height: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a name and width', () => {
      expect(
        isValidQuery({
          query: { name: 'abc', width: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a name and height', () => {
      expect(
        isValidQuery({
          query: { name: 'abc', height: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a width and height', () => {
      expect(
        isValidQuery({
          query: { width: '234', height: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query if it contains a name and width and height', () => {
      expect(
        isValidQuery({
          query: { name: 'abc', width: '234', height: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should not be a valid query if it contains a width that is not a number', () => {
      expect(
        isValidQuery({
          query: { width: 'abc' }
        } as unknown as express.Request)
      ).toBeFalse()
    })

    it('should not be a valid query if it contains a height that is not a number', () => {
      expect(
        isValidQuery({
          query: { height: 'abc' }
        } as unknown as express.Request)
      ).toBeFalse()
    })

    it('should not be a valid query if it contains a name that is not a string', () => {
      expect(
        isValidQuery({
          query: { name: 123 }
        } as unknown as express.Request)
      ).toBeFalse()
    })

    it('should be a valid query as long as width or height is a number', () => {
      expect(
        isValidQuery({
          query: { width: 'abc', height: '123' }
        } as unknown as express.Request)
      ).toBeTrue()
    })

    it('should be a valid query as long as one of the parameters exist regardless of the extra information', () => {
      expect(
        isValidQuery({
          query: {
            extra: true,
            name: 'abc',
            stuff: 123,
            not: 'needed',
            arrayItem: ['1', '2']
          }
        } as unknown as express.Request)
      ).toBeTrue()
    })
  })

  describe('Get Image Path From Request', () => {
    it('should return the image path with a given name, width, and height', () => {
      expect(
        getImagePathFromRequest({
          query: { name: 'abc', width: '120', height: '200' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/120/200/abc.jpeg')
    })

    it('should return the image path with a given name and width where width is assumed for height', () => {
      expect(
        getImagePathFromRequest({
          query: { name: 'abc', width: '120' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/120/120/abc.jpeg')
    })

    it('should return the image path with a given name and height where height is assumed for width', () => {
      expect(
        getImagePathFromRequest({
          query: { name: 'abc', height: '200' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/200/200/abc.jpeg')
    })

    it('should return the image path with a given name', () => {
      expect(
        getImagePathFromRequest({
          query: { name: 'abc' }
        } as unknown as express.Request)
      ).toEqual('abc.jpeg')
    })

    it('should return the image path with a given width and height', () => {
      expect(
        getImagePathFromRequest({
          query: { width: '120', height: '200' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/120/200/placeholder.jpeg')
    })

    it('should return the image path with a given width where width is assumed for height', () => {
      expect(
        getImagePathFromRequest({
          query: { width: '120' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/120/120/placeholder.jpeg')
    })

    it('should return the image path with a given height where height is assumed for width', () => {
      expect(
        getImagePathFromRequest({
          query: { height: '200' }
        } as unknown as express.Request)
      ).toEqual('thumbnails/200/200/placeholder.jpeg')
    })
  })
})
