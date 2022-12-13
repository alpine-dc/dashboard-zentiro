const jwt = require('jsonwebtoken');

module.exports = 
{
	sign(user) 
	{
    	return jwt.sign(user, process.env.JWT_SECRET)
  	},

	verify(stringtoken) 
	{
		if(stringtoken)
		{
			// const token = stringtoken.slice(7);

			return jwt.verify(stringtoken, process.env.JWT_SECRET)
		}
  	}
}