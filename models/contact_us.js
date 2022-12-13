module.exports = (sequelize, DataTypes) => {
	const contact_us = sequelize.define("contact_us", {
        name: {
			type: DataTypes.STRING,
		},
		phone: {
			type: DataTypes.STRING,
		},
        email: {
			type: DataTypes.STRING,
		},
        subject: {
			type: DataTypes.STRING,
		},
        message: {
			type: DataTypes.TEXT,
		},
        status: {
			type: DataTypes.BOOLEAN,
        },
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	return contact_us;
};