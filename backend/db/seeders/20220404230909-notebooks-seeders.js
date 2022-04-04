'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {



      return queryInterface.bulkInsert('Notebooks', [
        {
        userId: 1,
        title: 'First Notebook'
        },
         {
        userId: 1,
        title: 'Second Notebook'
        },
    ], {});

  },

  down: (queryInterface, Sequelize) => {


      return queryInterface.bulkDelete('Notebooks', null, {});

  }
};
