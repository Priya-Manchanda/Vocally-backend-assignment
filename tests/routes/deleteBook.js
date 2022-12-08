const expect = require("chai").expect;
const request = require("request");
const { TESTING_URL } = require("../../constants/test");
describe("Delete book API", () => {
  describe("No bookId provided validation error", () => {
    const book_id = " ";

    it("Status", (done) => {
      request.delete(`${TESTING_URL}/${book_id}/`, {}, (_, response) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
    it("Content", (done) => {
      request.delete(
        `${TESTING_URL}/${book_id}/`,
        {},
        (_, response) => {
          const body = JSON.parse(response.body);
          expect(body.errors[0]).to.equal("You have to provide a book_id");
          done();
        }
      );
    });
  });

  describe("Invalid book_id provided validation error", () => {
    const book_id = "5da946c270ff9000941623b0";

    it("Status", (done) => {
      request.delete(
        `${TESTING_URL}/${book_id}/delete`,
        {},
        (_, response) => {
          expect(response.statusCode).to.equal(400);
          done();
        }
      );
    });

    it("Content", (done) => {
      request.delete(
        `${TESTING_URL}/$book_id}/`,
        {},
        (_, response) => {
          const body = JSON.parse(response.body);
          expect(body.errors[0]).to.equal("Please provide a valid book_id");
          done();
        }
      );
    });
  });

  describe("Invalid book_id provided validation error", () => {
    const book_id = "5dae2f4d860c0dff2363e317";

    it("Status & Content", (done) => {
      request.delete(
        `${TESTING_URL}/${book_id}/`,
        {},
        (_, response) => {
          const body = JSON.parse(response.body);
          expect(response.statusCode).to.equal(200);
          expect(body.message).to.equal("Book deleted successfully");
          done();
        }
      );
    });
  });
});
