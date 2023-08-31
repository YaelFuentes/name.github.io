const { db } = require('./databaseService.js');

async function createTable() {
  try {
    // Tabla clientes
    const clientTable = await db.schema.hasTable('clients');
    if (!clientTable) {
      await db.schema.createTable('client', (table) => {
        table.increments('id').primary().notNullable();
        table.integer('membershipNum');
        table.string('name', 20);
        table.string('lastname', 20);
        table.string('phone', 45);
        table.string('email', 100);
        table.string('address', 200);
        table.integer('dni');
      });
      console.log(clientTable);
    } else {
      console.log(`La tabla que esta intentando crear ya se encuentra en ${process.env.DB_HOST}`);
    }

    // Tabla productos
    const productsTable = await db.schema.hasTable('products');
    if (!productsTable) {
      await db.schema.createTable('products', (table) => {
        table.increments('id').primary().notNullable();
        table.string('name', 200);
        table.string('description', 1000);
        table.integer('price');
        table.integer('priceMembership');
        table.string('supplier', 45);
      });
    } else {
      console.log('Tabla creada');
    }
  } catch (e) {
    console.log(e);
  }
}

// Call the createTable function
createTable();
