const router = require('express').Router();
const userAuth = require('../controllers/controller.UserAuth');
const { auth } = require('../middleware/middleware.auth');
const roConf = require('../controllers/controller.RetailOutlet');
const productConf = require('../controllers/controller.Product');
const consoleConf = require('../controllers/controller.Console');
const probeConf = require('../controllers/controller.Probe');
const tankConf = require('../controllers/controller.Tank');
const duConf = require('../controllers/controller.Dispenser');
const slaveConf = require('../controllers/controller.Slave');
const pumpConf = require('../controllers/controller.Pump');
const nozzleConf = require('../controllers/controller.Nozzle');
const salesOperation = require('../controllers/controller.ProductSales');
const priceOperations = require('../controllers/controller.ProductPrice');
const dataAckOperations = require('../controllers/controller.Ack');

// USER SIGNIN
router.post('/signin', userAuth.signin);
router.post('/signup', userAuth.signup);

// RETAIL OUTLET
router.post('/addRetailOutlet', auth, roConf.addRetailOutlet);
router.get('/getRetailOutlet', auth, roConf.getRetailOutlet);
router.get('/getRetailOutletList', auth, roConf.getRetailOutletList);
router.post('/updateRetailOutlet', auth, roConf.updateRetailOutlet);

// PRODUCT
router.post('/addProduct', auth, productConf.addProduct);
router.get('/getProductList', auth, productConf.getProductList);
router.get('/getMasterProductList', auth, productConf.getMasterProductList);

// ATG CONSOLE
router.post('/addConsole', auth, consoleConf.addConsole);
router.get('/getConsoleList', auth, consoleConf.getConsoleList);
router.get('/getMasterConsoleList', auth, consoleConf.getMasterConsole);

// ATG PROBE
router.post('/addProbe', auth, probeConf.addProbe);
router.get('/getProbeList', auth, probeConf.getProbeList);
router.get('/getMasterProbeList', auth, probeConf.getMasterProbeList)

// RF SLAVE
router.post('/addRFSlave', auth, slaveConf.addRFSlave );
router.get('/getRFSlaveList', auth, slaveConf.getRFSlaveList);

// TANK
router.post('/addTank', auth, tankConf.addTank);
router.get('/getTankList', auth, tankConf.getTankList);
router.get('/getTankListByRocode', auth, tankConf.getTankListByRocode);

// DISPENSER
router.post('/addDispenser', auth, duConf.addDispenser);
router.get('/getDispenserList', auth, duConf.getDispenserList);
router.get('/getMasterDUMakeList', auth, duConf.getMasterDUMakeList);

//PUMP
router.post('/addPump', auth, pumpConf.addPump);
router.get('/getPumpList', auth, pumpConf.getPumpList);
router.get('/getPumpListByRocode',auth,pumpConf.getPumpListByRocode)

// NOZZLE
router.post('/addNozzle', auth, nozzleConf.addNozzle);
router.get('/getNozzleList', auth, nozzleConf.getNozzleList);
router.get('/getNozzleListByRocode', auth, nozzleConf.getNozzleListByRocode);
router.get('/getNozzleData',auth,nozzleConf.getNozzleData);
router.get('/getNozzleListByPumpid', auth, nozzleConf.getNozzleListByPumpid);

// SALES DATA
router.get("/getDaySaleTotalByRoid", auth, salesOperation.getDaySaleTotalByRoid); 
router.get("/getProductSaleByRoid", auth, salesOperation.getProductSaleByRoid);
router.get('/getNozzleSaleByRoid', auth, salesOperation.getNozzleSaleByRoid);
router.get('/getProductSalesByPeriod', auth, salesOperation.getProductSalesByPeriod);
router.get('/getPumpTrxnByPeriod', auth, salesOperation.getPumpTrxnByPeriod);

// GET PRICE DATE
router.post('/addPriceChange', auth, priceOperations.addPriceChange);
router.get('/getPriceChangeList', auth, priceOperations.getPriceChangeList);
router.post('/updatePriceChangeList', auth, priceOperations.updatePriceChangeList);
router.get('/getPriceChangeListByRocode', priceOperations.getPriceChangeListByRocode);

// DATA ACK
router.post('/dataAck',dataAckOperations.dataAck)
module.exports = router;