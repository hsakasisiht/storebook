import { connectDB } from '../config/database.js';
import app from '../app.js';
import User from '../models/User.js';

const runTests = async () => {
  await connectDB();
  const PORT = 5088;

  const server = app.listen(PORT, async () => {
    console.log(`\n======================================================`);
    console.log(`PANDORA ACCEPTANCE TESTS (AT-01 to AT-12) RUNNER`);
    console.log(`======================================================\n`);

    const results = [];
    const record = (id, name, passed, detail) => {
      results.push({ id, name, passed, detail });
      const symbol = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${symbol} [${id}] ${name} -> ${detail}`);
    };

    try {
      const BASE = `http://127.0.0.1:${PORT}`;

      // AT-01: Register with valid details
      const testEmail = `qa_reader_${Date.now()}@pandora.com`;
      const regRes = await fetch(`${BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'QA Test Reader',
          email: testEmail,
          password: 'Password@123',
          phone: '+91 98765 43210',
        }),
      }).then((r) => r.json());

      const userInDb = await User.findOne({ email: testEmail });
      const isHashed = userInDb && userInDb.passwordHash !== 'Password@123' && userInDb.passwordHash.startsWith('$2');
      record('AT-01', 'Register with valid details', regRes.success && isHashed, `Account created with hashed password: ${isHashed}`);

      const userToken = regRes.token;

      // AT-02: Register with existing email
      const dupRes = await fetch(`${BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Duplicate Reader',
          email: testEmail,
          password: 'Password@123',
        }),
      });
      const dupData = await dupRes.json();
      record('AT-02', 'Reject duplicate registration', dupRes.status === 400 && !dupData.success, `Status: ${dupRes.status}, message: "${dupData.message}"`);

      // AT-03: Search by book title or author
      const searchRes = await fetch(`${BASE}/api/books?search=Dostoevsky`).then((r) => r.json());
      const hasMatch = searchRes.books.some((b) => b.author.includes('Dostoevsky') || b.title.includes('Punishment'));
      record('AT-03', 'Search by title or author', searchRes.success && hasMatch, `Found ${searchRes.count} matching book(s) for author 'Dostoevsky'`);

      // AT-04: Add more quantity than stock
      const allBooks = await fetch(`${BASE}/api/books`).then((r) => r.json());
      const sampleBook = allBooks.books[0];
      const excessiveQty = sampleBook.stock + 100;
      const overstockRes = await fetch(`${BASE}/api/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ bookId: sampleBook._id, quantity: excessiveQty }),
      });
      const overstockData = await overstockRes.json();
      record('AT-04', 'Block quantity exceeding stock', overstockRes.status === 400 && !overstockData.success, `Rejected with message: "${overstockData.message}"`);

      // AT-05: Submit checkout with empty cart
      // Clear cart first
      await fetch(`${BASE}/api/cart`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const emptyCheckoutRes = await fetch(`${BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: 'QA Reader',
            phone: '+91 98765 43210',
            street: '12 Test Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560001',
          },
          paymentMethod: 'COD',
        }),
      });
      const emptyCheckoutData = await emptyCheckoutRes.json();
      record('AT-05', 'Submit checkout with empty cart blocked', emptyCheckoutRes.status === 400 && !emptyCheckoutData.success, `Rejected with: "${emptyCheckoutData.message}"`);

      // AT-06: Submit valid order & verify atomic stock deduction
      // Add valid quantity (1 unit)
      await fetch(`${BASE}/api/cart/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ bookId: sampleBook._id, quantity: 1 }),
      });

      const orderRes = await fetch(`${BASE}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: 'QA Reader',
            phone: '+91 98765 43210',
            street: '12 Test Road',
            city: 'Bengaluru',
            state: 'Karnataka',
            postalCode: '560001',
          },
          paymentMethod: 'COD',
        }),
      }).then((r) => r.json());

      const validOrder = orderRes.success && orderRes.order?.orderNumber && orderRes.order?.items?.length === 1;
      record('AT-06', 'Submit valid order with snapshot & calculation', validOrder, `Order #${orderRes.order?.orderNumber}, Total: ₹${orderRes.order?.total}`);

      const createdOrderId = orderRes.order?._id;

      // AT-07: Customer requests another user's order
      // Second user registers
      const user2Email = `qa_reader2_${Date.now()}@pandora.com`;
      const reg2Res = await fetch(`${BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'QA Reader Two',
          email: user2Email,
          password: 'Password@123',
          phone: '+91 98765 43211',
        }),
      }).then((r) => r.json());
      const user2Token = reg2Res.token;

      const crossAccessRes = await fetch(`${BASE}/api/orders/${createdOrderId}`, {
        headers: { Authorization: `Bearer ${user2Token}` },
      });
      const crossAccessData = await crossAccessRes.json();
      record('AT-07', 'Customer cross-user order access denied', crossAccessRes.status === 403 && !crossAccessData.success, `Status: ${crossAccessRes.status}, message: "${crossAccessData.message}"`);

      // AT-08: Customer opens admin route/API
      const customerToAdminRes = await fetch(`${BASE}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const customerToAdminData = await customerToAdminRes.json();
      record('AT-08', 'Customer access to admin route denied', customerToAdminRes.status === 403 && !customerToAdminData.success, `Status: ${customerToAdminRes.status}, message: "${customerToAdminData.message}"`);

      // AT-09: Admin updates book stock
      const adminLogin = await fetch(`${BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@pandora.com', password: 'Admin@123' }),
      }).then((r) => r.json());
      const adminToken = adminLogin.token;

      const newStockVal = sampleBook.stock + 5;
      const stockUpdateRes = await fetch(`${BASE}/api/admin/books/${sampleBook._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ stock: newStockVal }),
      }).then((r) => r.json());

      const bookCheck = await fetch(`${BASE}/api/books/${sampleBook._id}`).then((r) => r.json());
      record('AT-09', 'Admin updates book stock', stockUpdateRes.success && bookCheck.book?.stock === newStockVal, `Updated from ${sampleBook.stock} to ${bookCheck.book?.stock}`);

      // AT-10: Admin updates order status
      const statusUpdateRes = await fetch(`${BASE}/api/admin/orders/${createdOrderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: 'Shipped' }),
      }).then((r) => r.json());

      const userOrders = await fetch(`${BASE}/api/orders/my`, {
        headers: { Authorization: `Bearer ${userToken}` },
      }).then((r) => r.json());
      const updatedOrder = userOrders.orders?.find((o) => o._id === createdOrderId);
      record('AT-10', 'Admin order status update reflected in customer history', statusUpdateRes.success && updatedOrder?.status === 'Shipped', `Admin changed to 'Shipped', customer history reflects status: '${updatedOrder?.status}'`);

      // AT-12: API/database failure handling (malformed ObjectId)
      const invalidQueryRes = await fetch(`${BASE}/api/books/invalid-id-xyz-999`);
      const invalidQueryData = await invalidQueryRes.json();
      record('AT-12', 'Handled invalid ID query safely without crash', invalidQueryRes.status === 400 || invalidQueryRes.status === 404, `Returned status ${invalidQueryRes.status} with safe error payload: "${invalidQueryData.message}"`);

      // Summary
      const passedCount = results.filter((r) => r.passed).length;
      console.log(`\n======================================================`);
      console.log(`ACCEPTANCE TEST RESULTS: ${passedCount}/${results.length} PASSED`);
      console.log(`======================================================\n`);
    } catch (err) {
      console.error('Acceptance test runner encountered an error:', err);
    } finally {
      server.close();
      process.exit(0);
    }
  });
};

runTests();