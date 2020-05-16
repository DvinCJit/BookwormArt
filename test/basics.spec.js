import app from '~/api/app.js'

describe('app', () => {
  test('Should return a valid express server instance', () => {
    expect(app).toBeInstanceOf(Function)
  })
})
