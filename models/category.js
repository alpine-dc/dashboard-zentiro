module.exports = (sequelize, DataTypes) => {
	const category = sequelize.define("category", {
        name: {
			type: DataTypes.STRING,
		},
        image: {
			type: DataTypes.STRING,
		},
		permalink: {
			type: DataTypes.STRING,
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

	return category;
};