const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    db.flushdb()
  })

  describe('Create', () => {

    beforeEach(() => {
    db.flushdb()
    })

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err1, result1) => {
        expect(err1).to.be.equal(null)
        expect(result1).to.be.equal('OK')
        userController.create(user, (err2, result2) => {
          expect(err2).to.not.be.equal(null)
          expect(result2).to.be.equal(null)
          done()
      })
      })
    })
  })

  describe('Get', ()=> {   
    
    beforeEach(() => {
    db.flushdb()
    })

    it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err1, result1) => {
        expect(err1).to.be.equal(null)
        expect(result1).to.be.equal('OK')
        userController.get(user.username, (err2, result2) => {
          expect(err2).to.be.equal(null)
          expect(result2).to.not.be.equal(null)
          done()
        })
      })
    })
  
    it('cannot get a user when it does not exist', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err1, result1) => {
        expect(err1).to.be.equal(null)
        expect(result1).to.be.equal('OK')
        const userget = {
          username: 'alphafold'
        }
        userController.get(userget.username, (err2, result2) => {
          expect(err2).to.be.equal(null)
          expect(result2).to.be.equal(null)
          done()
        })
      })
    })
  })
})
