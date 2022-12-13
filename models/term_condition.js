module.exports = (sequelize, DataTypes) => {
	const term_condition = sequelize.define("term_condition", {
        title: {
			type: DataTypes.STRING,
		},
		description: {
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

	return term_condition;
};