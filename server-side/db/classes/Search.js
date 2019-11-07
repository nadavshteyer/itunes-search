const {mongoose} = require('../mongoose')

const searchSchema = new mongoose.Schema({
    username: String,
    search: String,
    count: Number
});
const SearchModal = mongoose.model('Search', searchSchema);
class Search {
constructor(username,search) {
    this.username = username;
    this.search = search;
    this.count = 1;
}
addToDb() {
    return new Promise((resolve,reject)=>{
        new SearchModal(this).save().then((doc)=>{
        resolve(doc);
    }).catch(err =>reject(err))
    })
}
incrementCount() {
    return new Promise((resolve,reject)=>{
        SearchModal.findOneAndUpdate({username: this.username, search: this.search}, {$inc : {count : 1}},{new: true})
        .then(doc =>{
            if (doc == null) new SearchModal(this).save().then((newDoc)=>resolve(newDoc))
            else resolve(doc)
        })
        .catch(err=>reject(err))
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

module.exports = {Search, SearchModal}
