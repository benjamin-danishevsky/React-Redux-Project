'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notes', [{
        userId: 1,
        notebookId: 1,
        title: 'first note',
        content: 'this is the first note'
      },
      {
        userId: 1,
        notebookId: 2,
        title: 'first note for second book',
        content: 'this is the first note in the second book'
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notes', null, {});

  }
};
