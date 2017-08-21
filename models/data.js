module.exports = function(sequelize, DataTypes) {
	var Data = sequelize.define("Data", {
		temp: {
			type: DataTypes.DECIMAL(10,3),
		},
		humid: {
			type: DataTypes.DECIMAL(10,3),
		},
		soil: {
			type: DataTypes.DECIMAL(10,3),
		},
		light: {
			type: DataTypes.DECIMAL(10,3),
		},
		water: {
			type:DataTypes.DECIMAL(10,3),
		},
		pumpOn: {
			type: DataTypes.BOOLEAN,
		},
		lightOn: {
			type: DataTypes.BOOLEAN,
		},
		autoOn: {
			type: DataTypes.BOOLEAN,
		},
		targetSoil:{
			type:DataTypes.DECIMAL(10,3),
		}
	});

    Data.associate = function(models) {
		// Data must belong to a sensor id
		Data.belongsTo(models.Sensor, {
			foreignKey: {
				allowNull: false
			}
		});
    };
    return Data;
};
  