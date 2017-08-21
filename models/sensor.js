module.exports = function(sequelize, DataTypes) {
    var Sensor = sequelize.define("Sensor", {
        pumpOn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lightOn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        autoOn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        targetSoil:{
            type:DataTypes.DECIMAL(10,3),
        }
    });

    Sensor.associate = function(models) {
        // Associating Sensor with Data
        Sensor.hasMany(models.Data, {
            onDelete: "cascade"
        });
    };

    return Sensor;
};
  