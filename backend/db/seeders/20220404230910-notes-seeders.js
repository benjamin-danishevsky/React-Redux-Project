'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Notes', [
      {
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
      {
        userId: 1,
        notebookId: 1,
        title: 'Reminder',
        content: 'pick up dry cleaning'
      },
      {
        userId: 1,
        notebookId: 2,
        title: 'Reminder',
        content: 'fold the laundry'
      },
      {
        userId: 1,
        notebookId: 1,
        title: 'Grocery Store List',
        content: 'Milk, Eggs, Bread'
      },
      {
        userId: 1,
        notebookId: 2,
        title: 'Wishlist',
        content: 'Playstation 5, Elden Ring'
      },

    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Notes', null, {});

  }
};
