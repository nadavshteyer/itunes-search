const {mongoose} = require('../mongoose')
const {SearchModal} = require('./Search.js')

const userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
});
const UserModal = mongoose.model('User', userSchema);
class User {
    constructor({username,firstName,lastName, password}) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }
    addToDb() {
        return new Promise((resolve,reject)=>{
            new UserModal(this).save().then(doc => resolve(doc))
            .catch(err =>reject(err))
        })
    }
    login(username = this.username,password=this.password) {
        return new Promise((resolve,reject)=>{
            UserModal.findOne({username,password}).then(doc => {
                if(doc) resolve(true)
                else {
                resolve(false)
                }
            })
        })
    }
    topTenSearchs(username = this.username) {
        return new Promise((resolve,reject)=> {
            SearchModal.find({username}).limit(10).sort({count: -1}).then(docs => {
                resolve(docs)
            })
            .catch(err=>reject(err))
        })
    }

}

module.exports = {User}