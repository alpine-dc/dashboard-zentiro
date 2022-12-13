module.exports = (sequelize, DataTypes) => {
	const product_image = sequelize.define("product_image", {
        product_id: {
			type: DataTypes.INTEGER,
		},
        category_id: {
			type: DataTypes.INTEGER,
		},
		path: {
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

	return product_image;
};