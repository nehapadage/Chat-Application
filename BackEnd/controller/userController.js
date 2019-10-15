const userServices = require('../services/userServices');

class UserController{
    // Create and Save a new User
createUser = (req, res) => {
    
    let data=userServices.createUserServices(req.body);
    
    res.send(data);      
    }
}
    

// // Retrieve and return all Users from the database.
// findAll = (req, res) => {
//     User.find()
//     .then(users => {
//         res.send(users);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving users."
//         });
//     });
// };

// // Find a single User with a UserId
// findOne = (req, res) => {
//     User.findById(req.params.userId)
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });            
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving user with id " + req.params.userId
//         });
//     });
// };

// // Update a User identified by the UserId in the request
// update = (req, res) => {
//     // Validate Request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "User content can not be empty"
//         });
//     }

//     // Find User and update it with the request body
//     User.findByIdAndUpdate(req.params.userId, {
//         title: req.body.title || "Untitled User",
//         content: req.body.content
//     }, {new: true})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating user with id " + req.params.userId
//         });
//     });
// };

// // Delete a User with the specified UserId in the request
// delete = (req, res) => {
//     User.findByIdAndRemove(req.params.nameId)
//     .then(note => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });
//         }
//         res.send({message: "User deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.userId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete user with id " + req.params.userId
//         });
//     });
// };


 module.exports=new UserController();