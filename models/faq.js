module.exports = (sequelize, DataTypes) => {
	const faq = sequelize.define("faq", {
		question: {
			type: DataTypes.TEXT,
		},
		answer: {
			type: DataTypes.TEXT,
		},
		status: {
			type: DataTypes.STRING,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		}
	});

	return faq;
};
