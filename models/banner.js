module.exports = (sequelize, DataTypes) => {
	const banner = sequelize.define("banner", {
        title: {
			type: DataTypes.STRING,
		},
		path: {
			type: DataTypes.STRING,
		},
        status: {
			type: DataTypes.STRING,
        },
        permalink: {
			type: DataTypes.STRING,
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

	return banner;
};