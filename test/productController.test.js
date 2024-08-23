// productController.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js'; // Adjust path if necessary

chai.use(chaiHttp);
const { expect, should } = chai;
should();

const url = '/products';

describe('Testing ProductsController', () => {
    it('getAll returns OK status', (done) => {
        chai.request(app)
            .get(url)
            .end((err, res) => {
                if (err) {
                    done(err); // Pass the error to done()
                } else {
                    res.should.have.status(200);
                    done(); // Ensure done is called
                }
            });
    });
});
