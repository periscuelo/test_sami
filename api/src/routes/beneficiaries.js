const BeneficiaryController = require('controllers/beneficiary.controller');
const jwt = require('middlewares/jwt');
const idCheck = require('middlewares/id.check');

const beneficiaries = server => {
  server.get('/beneficiaries', jwt.verify, BeneficiaryController.list);
  server.get('/beneficiaries/:id', [jwt.verify, idCheck], BeneficiaryController.getById);
  server.post('/beneficiaries', jwt.verify, BeneficiaryController.create);
  server.put('/beneficiaries/:id', [jwt.verify, idCheck], BeneficiaryController.update);
  server.del('/beneficiaries/:id', [jwt.verify, idCheck], BeneficiaryController.delete);
};

module.exports = beneficiaries;
