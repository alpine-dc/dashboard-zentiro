module.exports = (sequelize, DataTypes) => {
	const about_us = sequelize.define("about_us", {
        title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
        subTitle: {
			type: DataTypes.STRING,
		},
		subDesc: {
			type: DataTypes.STRING,
		},
        subTitle1: {
			type: DataTypes.STRING,
		},
		subDesc1: {
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

	return about_us;
};