const { client } = require('../../config/config.database');
const SocketService = require('../../services/service.socket');
let socket = new SocketService();

function msgTankInventory(roautoid, msg) {

  msg.getTankinventoryList().forEach((tankInventoryMsg) => {

    let tankInventory = {
      dayautoid: tankInventoryMsg.getDayautoid(),
      shiftautoid: tankInventoryMsg.getShiftautoid(),
      tankautoid: tankInventoryMsg.getAutoid(),
      inventorytype: tankInventoryMsg.getInventorytype(),
      productlevel: tankInventoryMsg.getProductlevel(),
      productvolume: tankInventoryMsg.getProductvolume(),
      watervolume: tankInventoryMsg.getWatervolume(),
      waterlevel: tankInventoryMsg.getWaterlevel(),
      ullage: tankInventoryMsg.getUllage(),
      temperature: tankInventoryMsg.getTemperature(),
      density: tankInventoryMsg.getDensity(),
      tcdensity: tankInventoryMsg.getTcdensity(),
      inventorytime: tankInventoryMsg.getInventorytime(),
      state: tankInventoryMsg.getState()
    };

    console.log(tankInventory);

    //INSERT INTO TANK INVENTORY
    let query = {
      text: `INSERT INTO tankinventory (
                                roautoid,
                                tankautoid,
                                shiftautoid,
                                inventorytime,
                                inventorytype,
                                productlevel,
                                productvolume,
                                waterlevel,
                                watervolume,
                                temperature,
                                ullage,
                                density,
                                tcdensity,
                                state
                              ) 
              VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      values: [
        roautoid,
        tankInventory.tankautoid,
        tankInventory.shiftautoid,
        tankInventory.inventorytime,
        tankInventory.inventorytype,
        tankInventory.productlevel,
        tankInventory.productvolume,
        tankInventory.waterlevel,
        tankInventory.watervolume,
        tankInventory.temperature,
        tankInventory.ullage,
        tankInventory.density,
        tankInventory.tcdensity,
        tankInventory.state
      ]
    }

    if (tankInventory.inventorytype != 0) {
      client.query(query)
        .then(() => {
          console.log("Tank Inventory Inserted Successfully in Tank Inventory");
        })
        .catch((error) => {
          console.error("Error occurred while insterting Tank Inventory:", error);
        });
    }

    // TANK STATUS 
    if (tankInventory.inventorytype == 0) {
      console.log("Tank Status Emitted");
      socket.emitMessage("tankInventory", tankInventory)
    }

    // TANK INVENTORY OF DAY OPEN
    if (tankInventory.inventorytype == 2) {
      let query = {
        text: `INSERT INTO dayendinventory (
                            roautoid,
                            tankautoid,
                            dayautoid,
                            starttime,
                            startproductlevel,
                            startproductvolume,
                            startwaterlevel,
                            starttemperature,
                            startdensity,
                            starttcdensity
                          ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)`,
        values: [
          roautoid,
          tankInventory.tankautoid,
          tankInventory.dayautoid,
          tankInventory.inventorytime,
          tankInventory.productlevel,
          tankInventory.productvolume,
          tankInventory.waterlevel,
          tankInventory.temperature,
          tankInventory.density,
          tankInventory.tcdensity
        ]
      }

      client.query(query)
        .then(() => {
          console.log("Tank Inventory For Day open Insterd Successfully");
        })
        .catch((error) => {
          console.error("Error occurred while insterting Day Open Inventory:", error);
        });
    }

    // TANK INVENTORY OF DAY CLOSE
    if (tankInventory.inventorytype == 3) {
      let query = {
        text: `UPDATE dayendinventory 
                                 SET
                                     endtime = $1,
                                     endproductlevel = $2,
                                     endproductvolume = $3,
                                     endwaterlevel = $4,
                                     endtemperature = $5,
                                     enddensity = $6,
                                     endtcdensity = $7
                                 WHERE 
                                      dayautoid = $8 AND tankautoid = $9 AND roautoid = $10`,
        values: [
          tankInventory.inventorytime,
          tankInventory.productlevel,
          tankInventory.productvolume,
          tankInventory.waterlevel,
          tankInventory.temperature,
          tankInventory.density,
          tankInventory.tcdensity,
          tankInventory.dayautoid,
          tankInventory.tankautoid,
          roautoid
        ]
      };

      client.query(query)
        .then(() => {
          console.log("Tank Inventory For Day Close Updated Successfully");
        })
        .catch((error) => {
          console.error("Error occurred while updating Day Close Inventory:", error);
        });
    }

    // TANK INVENTORY OF SHIFT OPEN
    if (tankInventory.inventorytype == 4) {
      let query = {
        text: `INSERT INTO shiftendinventory (
                            roautoid,
                            tankautoid,
                            shiftautoid,
                            starttime,
                            startproductlevel,
                            startproductvolume,
                            startwaterlevel,
                            starttemperature,
                            startdensity,
                            starttcdensity
                          ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        values: [
          roautoid,
          tankInventory.tankautoid,
          tankInventory.shiftautoid,
          tankInventory.inventorytime,
          tankInventory.productlevel,
          tankInventory.productvolume,
          tankInventory.waterlevel,
          tankInventory.temperature,
          tankInventory.density,
          tankInventory.tcdensity
        ]
      }

      client.query(query)
        .then(() => {
          console.log("Tank Inventory For Shift open Insterd Successfully");
        })
        .catch((error) => {
          console.error("Error occurred while insterting Shift Open Inventory:", error);
        });
    }

    // TANK INVENTORY OF SHIFT CLOSE
    if (tankInventory.inventorytype == 5) {
      let query = {
        text: `UPDATE 
                      shiftendinventory 
              SET
                                     endtime = $1,
                                     endproductlevel = $2,
                                     endproductvolume = $3,
                                     endwaterlevel = $4,
                                     endtemperature = $5,
                                     enddensity = $6,
                                     endtcdensity = $7
                                 WHERE 
                                      shiftautoid = $8 AND tankautoid = $9 AND roautoid = $10`,
        values: [
          tankInventory.inventorytime,
          tankInventory.productlevel,
          tankInventory.productvolume,
          tankInventory.waterlevel,
          tankInventory.temperature,
          tankInventory.density,
          tankInventory.tcdensity,
          tankInventory.shiftautoid,
          tankInventory.tankautoid,
          roautoid
        ]
      };

      client.query(query)
        .then(() => {
          console.log("Tank Inventory For Shift Close Updated Successfully");
        })
        .catch((error) => {
          console.error("Error occurred while updating Shift Close Inventory:", error);
        });
    }
  })
}

module.exports = { msgTankInventory }