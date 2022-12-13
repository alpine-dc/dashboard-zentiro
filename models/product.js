module.exports = (sequelize, DataTypes) => {
	const product = sequelize.define("product", {
        title: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.TEXT,
		},
        category_id: {
			type: DataTypes.INTEGER,
        },
        permalink: {
			type: DataTypes.STRING,
        },
        image: {
			type: DataTypes.STRING,
        },
        status: {
			type: DataTypes.BOOLEAN,
        },
        price: {
			type: DataTypes.STRING,
        },
		views: {
			type: DataTypes.INTEGER,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updated_by: {
			type: DataTypes.STRING,
		},
	});

	return product;
};