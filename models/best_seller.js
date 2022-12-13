module.exports = (sequelize, DataTypes) => {
	const best_seller = sequelize.define("best_seller", {
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
	});

	return best_seller;
};