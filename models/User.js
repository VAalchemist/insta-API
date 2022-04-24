// example data
{
    "username": "lernantino",
    "email": "lernantino@gmail.com"
  }
  PUT to update a user by its _id

  DELETE to remove user by its _id
  
  BONUS: Remove a user's associated thoughts when deleted.
  
  /api/users/:userId/friends/:friendId
  
  POST to add a new friend to a user's friend list
  
  DELETE to remove a friend from a user's friend list
  
//////////////////////////////////////////////////////////////  


username

String
Unique
Required
Trimmed
email

String
Required
Unique
Must match a valid email address (look into Mongoose's matching validation)
thoughts

Array of _id values referencing the Thought model
friends

Array of _id values referencing the User model (self-reference)
Schema Settings

Create a virtual called friendCount that retrieves the length of the user's friends array field on query.









